const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Resume = require("../models/Resume");
const { analyzeResume } = require("../utils/geminiHelper");
const { normalizeAnalysisData } = require("../utils/normalizeHelper");

exports.analyze = async (req, res) => {
  try {
    // Validate file upload
    if (!req.file) {
      console.error("[Analyze] No file in request");
      return res.status(400).json({ error: "No file uploaded. Please select a PDF or DOCX file." });
    }

    // Validate file has content
    if (!req.file.buffer || req.file.buffer.length === 0) {
      console.error("[Analyze] File buffer is empty");
      return res.status(400).json({ error: "The uploaded file is empty. Please upload a valid resume." });
    }

    // Validate MIME type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(req.file.mimetype)) {
      console.error("[Analyze] Unsupported MIME type:", req.file.mimetype);
      return res.status(400).json({
        error: `Unsupported file type: ${req.file.mimetype}. Only PDF and DOCX files are accepted.`,
      });
    }

    console.log(`[Analyze] Processing file: ${req.file.originalname} | Size: ${req.file.buffer.length} bytes | Type: ${req.file.mimetype}`);

    const base64 = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;
    const jobDescription = req.body.jobDescription || "";

    // File is in memory buffer — never stored anywhere
    const rawResult = await analyzeResume(base64, mimeType, jobDescription);

    // Normalize snake_case → camelCase for consistent frontend usage
    const result = normalizeAnalysisData(rawResult);

    console.log(`[Analyze] Success — ATS Score: ${result.atsScore} | File: ${req.file.originalname}`);

    // Optionally save to MongoDB if the user is authenticated (silent — never fails the request)
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (user) {
          // Store raw buffer text for future AI generation features
          // Note: PDF binary → utf-8 gives garbled text, but Gemini can still use it
          const resumeText = req.file.buffer.toString("utf-8").substring(0, 8000);

          await Resume.create({
            userId: user._id,
            originalResumeUrl: "analyzed-in-memory",
            atsScore: result.atsScore,
            analysisData: result,
            resumeText: resumeText,
          });
          console.log(`[Analyze] Saved analysis to DB for user: ${user._id}`);
        }
      }
    } catch (_saveErr) {
      // Silently ignore save errors — guest usage should never be affected
      console.warn("[Analyze] Optional save skipped:", _saveErr.message);
    }

    // Always return the analysis result
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("====== ANALYSIS ERROR ======");
    console.error("Error message:", err.message);
    console.error("Stack trace:", err.stack);
    if (req.file) {
      console.error("File info:", {
        name: req.file.originalname,
        size: req.file.buffer?.length,
        mimetype: req.file.mimetype,
      });
    }
    console.error("============================");

    // Return user-friendly error messages
    let userMessage = "Resume analysis failed. Please try again.";

    if (err.message.includes("Empty file buffer")) {
      userMessage = "The uploaded file appears to be empty or corrupted. Please upload a valid resume.";
    } else if (err.message.includes("Unsupported file type")) {
      userMessage = "Only PDF and DOCX files are supported. Please upload the correct file format.";
    } else if (err.message.includes("JSON")) {
      userMessage = "The AI could not properly analyze this resume. Please try again or upload a clearer document.";
    } else if (err.message.includes("429") || err.message.includes("quota") || err.message.includes("rate")) {
      userMessage = "API rate limit reached. Please wait a moment and try again.";
    } else if (err.message.includes("API_KEY") || err.message.includes("permission") || err.message.includes("403")) {
      userMessage = "AI service configuration error. Please contact the administrator.";
    } else if (err.message.includes("SAFETY")) {
      userMessage = "The AI flagged this content. Please ensure your resume contains appropriate content and try again.";
    } else if (err.message.includes("timeout") || err.message.includes("ETIMEDOUT")) {
      userMessage = "The analysis timed out. Please try again.";
    } else if (err.message) {
      userMessage = err.message;
    }

    res.status(500).json({ error: userMessage });
  }
};
