const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Resume = require("../models/Resume");
const { analyzeResume } = require("../utils/geminiHelper");
const { normalizeAnalysisData } = require("../utils/normalizeHelper");

exports.analyze = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const base64 = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;
    const jobDescription = req.body.jobDescription || "";

    // File is in memory buffer — never stored anywhere
    const rawResult = await analyzeResume(base64, mimeType, jobDescription);

    // Normalize snake_case → camelCase for consistent frontend usage
    const result = normalizeAnalysisData(rawResult);

    // Optionally save to MongoDB if the user is authenticated (silent — never fails the request)
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (user) {
          // Extract resume text from file buffer for future optimize/cover-letter features
          const resumeText = req.file.buffer.toString("utf-8").substring(0, 8000);

          await Resume.create({
            userId: user._id,
            originalResumeUrl: "analyzed-in-memory",
            atsScore: result.atsScore,
            analysisData: result,
            resumeText: resumeText,
          });
        }
      }
    } catch (_saveErr) {
      // Silently ignore save errors — guest usage should never be affected
      console.log("Optional save skipped:", _saveErr.message);
    }

    // Always return the analysis result
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("ANALYSIS ERROR:", err);
    res.status(500).json({ error: err.message || "Analysis failed. Try again." });
  }
};
