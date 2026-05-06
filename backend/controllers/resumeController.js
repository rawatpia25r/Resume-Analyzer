const Resume = require('../models/Resume');
const cloudinary = require('../utils/cloudinary');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
      console.warn("WARNING: Cloudinary is not configured! Using a dummy URL for the uploaded resume.");
      secure_url = 'https://dummyimage.com/600x400/000/fff&text=Dummy+Resume+PDF+since+Cloudinary+is+not+setup';
    } else {
      const cloudinaryResponse = await uploadToCloudinary(req.file.buffer);
      secure_url = cloudinaryResponse.secure_url;
    }

    const jobDescription = req.body.jobDescription || 'General Software Engineering Role';
    const resumeText = req.file.buffer.toString('utf-8'); // Using a basic toString for demo, in prod we'd parse PDF using pdf-parse

    // 2. Call Gemini for Analysis
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
      Act as an expert ATS (Applicant Tracking System).
      Analyze the following resume against this job description.
      
      Job Description:
      ${jobDescription}
      
      Resume text (or partial text):
      ${resumeText.substring(0, 5000)} // Limiting size to avoid token limit
      
      Provide a JSON output with the following structure:
      {
        "atsScore": 85,
        "summary": "Brief summary",
        "missingKeywords": ["keyword1", "keyword2"],
        "formattingIssues": ["issue1"],
        "improvementSuggestions": ["suggestion1"]
      }
      Only return the raw JSON, no markdown formatting like \`\`\`json.
    `;

    const result = await model.generateContent(prompt);
    let aiResponseText = result.response.text();
    
    // Clean up response if it contains markdown
    aiResponseText = aiResponseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const analysisData = JSON.parse(aiResponseText);

    // 3. Save to DB
    const resumeDoc = await Resume.create({
      userId: req.user._id,
      originalResumeUrl: secure_url,
      atsScore: analysisData.atsScore,
      analysisData: analysisData,
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

module.exports = {
  uploadResume,
  getUserResumes,
  getResumeById,
};
