const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { generateResume, generateCoverLetter } = require('../controllers/generateController');

router.post('/resume', protect, generateResume);
router.post('/cover-letter', protect, generateCoverLetter);

module.exports = router;
