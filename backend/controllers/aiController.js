const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Optimize Resume
// @route   POST /api/ai/optimize
// @access  Private
const optimizeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: 'Please provide resumeText and jobDescription' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
      You are an expert Resume Editor.
      A user wants to tailor their resume to a specific job description.
      
      Job Description:
      ${jobDescription}
      
      Current Resume Text:
      ${resumeText}
      
      Return a JSON object with this exact structure:
      {
        "optimizedResumeText": "The entire rewritten resume text, tailored to the job description.",
        "missingKeywords": ["keyword1", "keyword2"],
        "improvementSuggestions": ["suggestion 1", "suggestion 2"]
      }
      Do NOT wrap the output in markdown fences. Just raw JSON.
    `;

    const result = await model.generateContent(prompt);
    let out = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    
    res.json(JSON.parse(out));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Generate Cover Letter
// @route   POST /api/ai/cover-letter
// @access  Private
const generateCoverLetter = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: 'Please provide resumeText and jobDescription' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `
      Write a professional, compelling cover letter based on the following:
      
      Job Description:
      ${jobDescription}
      
      Resume text (to highlight matching experiences):
      ${resumeText}
      
      Only return the text of the cover letter. Include placeholders like [Your Name], [Company Name], etc.
    `;

    const result = await model.generateContent(prompt);
    res.json({ coverLetterText: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  optimizeResume,
  generateCoverLetter,
};
