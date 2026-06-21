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
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let secure_url = '';
    // 1. Upload to Cloudinary (skip if not configured)
    if (process.env.CLOUDINARY_CLOUD_NAME === 'your_cloud_name') {
      console.warn("WARNING: Cloudinary is not configured! Using a placeholder URL.");
      secure_url = 'stored-in-memory';
    } else {
      const cloudinaryResponse = await uploadToCloudinary(req.file.buffer);
      secure_url = cloudinaryResponse.secure_url;
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

    res.status(201).json(resumeDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadResume,
  getUserResumes,
  getResumeById,
  deleteResume,
};
