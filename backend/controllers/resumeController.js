const Resume = require('../models/Resume');
const cloudinary = require('../utils/cloudinary');
const { analyzeResume } = require('../utils/geminiHelper');
const { normalizeAnalysisData } = require('../utils/normalizeHelper');

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'resumes', resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
};

// @desc    Upload resume and analyze
// @route   POST /api/resume/upload
// @access  Private
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded. Please select a PDF or DOCX file.' });
    }

    if (!req.file.buffer || req.file.buffer.length === 0) {
      return res.status(400).json({ error: 'The uploaded file is empty. Please upload a valid resume.' });
    }

    console.log(`[Upload] Processing file: ${req.file.originalname} | Size: ${req.file.buffer.length} bytes | Type: ${req.file.mimetype} | User: ${req.user._id}`);

    let secure_url = '';
    // 1. Upload to Cloudinary (skip if not configured)
    try {
      if (process.env.CLOUDINARY_CLOUD_NAME === 'your_cloud_name' || !process.env.CLOUDINARY_CLOUD_NAME) {
        console.warn("[Upload] WARNING: Cloudinary is not configured! Using a placeholder URL.");
        secure_url = 'stored-in-memory';
      } else {
        const cloudinaryResponse = await uploadToCloudinary(req.file.buffer);
        secure_url = cloudinaryResponse.secure_url;
        console.log(`[Upload] Cloudinary upload successful: ${secure_url}`);
      }
    } catch (cloudErr) {
      console.warn("[Upload] Cloudinary upload failed, using fallback:", cloudErr.message);
      secure_url = 'stored-in-memory';
    }

    const jobDescription = req.body.jobDescription || 'General Software Engineering Role';

    // 2. Call Gemini for Analysis using the shared helper (same as /api/analyze)
    const base64 = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;
    const rawResult = await analyzeResume(base64, mimeType, jobDescription);

    // Normalize snake_case → camelCase
    const analysisData = normalizeAnalysisData(rawResult);

    // Extract resume text for optimize/cover-letter features (first 8000 chars)
    const resumeText = req.file.buffer.toString('utf-8').substring(0, 8000);

    // 3. Save to DB
    const resumeDoc = await Resume.create({
      userId: req.user._id,
      originalResumeUrl: secure_url,
      atsScore: analysisData.atsScore,
      analysisData: analysisData,
      resumeText: resumeText,
    });

    console.log(`[Upload] Analysis saved — ATS Score: ${analysisData.atsScore} | Resume ID: ${resumeDoc._id}`);

    res.status(201).json(resumeDoc);
  } catch (error) {
    console.error("====== UPLOAD/ANALYSIS ERROR ======");
    console.error("Error message:", error.message);
    console.error("Stack trace:", error.stack);
    if (req.file) {
      console.error("File info:", {
        name: req.file.originalname,
        size: req.file.buffer?.length,
        mimetype: req.file.mimetype,
      });
    }
    console.error("===================================");

    // Return user-friendly error messages
    let userMessage = "Resume upload and analysis failed. Please try again.";

    if (error.message.includes("Empty file buffer")) {
      userMessage = "The uploaded file appears to be empty or corrupted.";
    } else if (error.message.includes("JSON")) {
      userMessage = "The AI could not properly analyze this resume. Please try again or upload a clearer document.";
    } else if (error.message.includes("429") || error.message.includes("quota") || error.message.includes("rate")) {
      userMessage = "API rate limit reached. Please wait a moment and try again.";
    } else if (error.message.includes("timeout") || error.message.includes("ETIMEDOUT")) {
      userMessage = "The analysis timed out. Please try again.";
    } else if (error.message) {
      userMessage = error.message;
    }

    res.status(500).json({ error: userMessage });
  }
};

// @desc    Get user resumes
// @route   GET /api/resume/user
// @access  Private
const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    console.error("[Resumes] Failed to fetch user resumes:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single resume
// @route   GET /api/resume/:id
// @access  Private
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check user matching
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    res.json(resume);
  } catch (error) {
    console.error("[Resumes] Failed to fetch resume by ID:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a resume
// @route   DELETE /api/resume/:id
// @access  Private
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check user matching
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error("[Resumes] Failed to delete resume:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadResume,
  getUserResumes,
  getResumeById,
  deleteResume,
};
