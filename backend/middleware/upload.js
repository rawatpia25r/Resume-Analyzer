const multer = require("multer");

// Store in memory only — never touches disk or DB
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    allowed.includes(file.mimetype) 
      ? cb(null, true) 
      : cb(new Error("Only PDF and DOCX allowed"));
  },
});

module.exports = upload;
