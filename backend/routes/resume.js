const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../middleware/authMiddleware');
const { uploadResume, getUserResumes, getResumeById } = require('../controllers/resumeController');

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/user', protect, getUserResumes);
router.get('/:id', protect, getResumeById);

module.exports = router;
