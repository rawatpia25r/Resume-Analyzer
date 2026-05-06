const { analyzeResume } = require("../utils/geminiHelper");

exports.analyze = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const base64 = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;
    const jobDescription = req.body.jobDescription || "";

    // File is in memory buffer — never stored anywhere
    const result = await analyzeResume(base64, mimeType, jobDescription);

    // Send analysis result back — resume data is discarded after this
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("ANALYSIS ERROR:", err);
    res.status(500).json({ error: err.message || "Analysis failed. Try again." });
  }
};
