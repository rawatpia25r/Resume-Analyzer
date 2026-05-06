const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function analyzeResume(base64File, mimeType, jobDescription = "") {
  const jobContext = jobDescription
    ? `The candidate is applying for this role:\n\n"${jobDescription}"\n\nMatch the resume against this job description carefully.`
    : "No specific job description provided. Do a general ATS analysis.";

  const prompt = `
You are an expert ATS (Applicant Tracking System) resume evaluator and career coach.

${jobContext}

Analyze the uploaded resume and respond ONLY in the following strict JSON format (no markdown, no extra text):

{
  "ats_score": <number 0-100>,
  "summary": "<2-3 line overall summary>",
  "sections": {
    "contact_info": { "score": <0-10>, "status": "good|warning|missing", "feedback": "<feedback>" },
    "professional_summary": { "score": <0-10>, "status": "good|warning|missing", "feedback": "<feedback>" },
    "work_experience": { "score": <0-10>, "status": "good|warning|missing", "feedback": "<feedback>" },
    "education": { "score": <0-10>, "status": "good|warning|missing", "feedback": "<feedback>" },
    "skills": { "score": <0-10>, "status": "good|warning|missing", "feedback": "<feedback>" },
    "keywords": { "score": <0-10>, "status": "good|warning|missing", "feedback": "<feedback>" },
    "formatting": { "score": <0-10>, "status": "good|warning|missing", "feedback": "<feedback>" },
    "achievements": { "score": <0-10>, "status": "good|warning|missing", "feedback": "<feedback>" }
  },
  "matched_keywords": ["keyword1", "keyword2"],
  "missing_keywords": ["keyword1", "keyword2"],
  "strengths": ["strength1", "strength2", "strength3"],
  "improvements": ["improvement1", "improvement2", "improvement3"],
  "job_match_percentage": <number 0-100 or null if no JD provided>,
  "experience_level": "fresher|junior|mid|senior|executive",
  "recommended_roles": ["role1", "role2", "role3"]
}
`;

  const result = await model.generateContent([
    { inlineData: { mimeType, data: base64File } },
    { text: prompt },
  ]);

  let raw = result.response.text();
  // Clean up any markdown blocks if the model wrapped it
  raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();
  
  return JSON.parse(raw);
}

module.exports = { analyzeResume };
