const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { optimizeResume, generateCoverLetter } = require('../controllers/aiController');

router.post('/optimize', protect, optimizeResume);
router.post('/cover-letter', protect, generateCoverLetter);

module.exports = router;
