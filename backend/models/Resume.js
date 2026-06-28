const mongoose = require('mongoose');

const resumeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    originalResumeUrl: {
      type: String,
      required: true,
    },
    atsScore: {
      type: Number,
      required: true,
    },
    analysisData: {
      type: Object,
      required: true,
    },
    resumeText: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Resume', resumeSchema);
