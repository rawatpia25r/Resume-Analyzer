const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Generate tailored resume
// @route   POST /api/generate/resume
// @access  Private
const generateResume = async (req, res) => {
  try {
    const { resumeText, jobDescription, companyName, roleName } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: 'Please provide resumeText and jobDescription' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `You are an expert resume writer. Based on the candidate's existing experience from their resume and the target job description, generate a completely restructured and tailored resume.

Target Company: ${companyName || 'Not specified'}
Target Role: ${roleName || 'Not specified'}

Job Description:
${jobDescription}

Candidate's Current Resume Text:
${resumeText.substring(0, 6000)}

Return ONLY a raw JSON object with NO markdown, NO backticks with this exact structure:
{
  "name": "Candidate Name",
  "email": "email@example.com",
  "phone": "+1234567890",
  "location": "City, Country",
  "linkedin": "linkedin.com/in/profile",
  "summary": "2-3 sentence professional summary tailored to the job",
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "duration": "Jan 2022 - Present",
      "bullets": ["Achievement 1 with metrics", "Achievement 2", "Achievement 3"]
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Science in Computer Science",
      "school": "University Name",
      "year": "2020"
    }
  ],
  "skills": {
    "technical": ["Skill1", "Skill2", "Skill3"],
    "soft": ["Leadership", "Communication"]
  },
  "certifications": ["Certification 1", "Certification 2"],
  "projects": [
    {
      "name": "Project Name",
      "description": "Short description",
      "tech": ["React", "Node.js"]
    }
  ]
}`;

    const result = await model.generateContent(prompt);
    let raw = result.response.text();
    raw = raw.replace(/```json/gi, '').replace(/```/g, '').trim();

    const resumeData = JSON.parse(raw);
    res.json(resumeData);
  } catch (error) {
    console.error('Generate resume error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate resume' });
  }
};

// @desc    Generate cover letter
// @route   POST /api/generate/cover-letter
// @access  Private
const generateCoverLetter = async (req, res) => {
  try {
    const { resumeText, jobDescription, companyName, roleName } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: 'Please provide resumeText and jobDescription' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const prompt = `You are a professional cover letter writer. Write a compelling, professional 3-paragraph cover letter for the following:

Company: ${companyName || '[Company Name]'}
Role: ${roleName || '[Position]'}

Job Description:
${jobDescription}

Candidate's Resume:
${resumeText.substring(0, 6000)}

Write a well-structured cover letter with:
- Opening paragraph: Express interest and mention the specific role
- Middle paragraph: Highlight relevant experience and achievements that match the job requirements
- Closing paragraph: Express enthusiasm and call to action

Return ONLY a raw JSON object with NO markdown, NO backticks:
{
  "coverLetter": "Full cover letter text here with proper paragraph breaks using \\n\\n"
}`;

    const result = await model.generateContent(prompt);
    let raw = result.response.text();
    raw = raw.replace(/```json/gi, '').replace(/```/g, '').trim();

    const parsed = JSON.parse(raw);
    res.json(parsed);
  } catch (error) {
    console.error('Generate cover letter error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate cover letter' });
  }
};

module.exports = {
  generateResume,
  generateCoverLetter,
};
