const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { analyze } = require("../controllers/analyzeController");

router.post("/", upload.single("resume"), analyze);

module.exports = router;
