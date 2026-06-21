const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Analyze a resume using Gemini AI.
 * Includes robust error handling, JSON parsing recovery, and retry logic.
 */
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
    "achievements": { "score": <0-10>, "status": "good|warning|missing", "feedback": "<feedback>" },
    "projects": { "score": <0-10>, "status": "good|warning|missing", "feedback": "<feedback>" }
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

  const MAX_RETRIES = 2;
  let lastError = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`[Gemini] Analysis attempt ${attempt + 1}/${MAX_RETRIES + 1} | MIME: ${mimeType} | Buffer size: ${base64File.length} chars`);

      // Validate inputs before sending to API
      if (!base64File || base64File.length === 0) {
        throw new Error("Empty file buffer — the uploaded file has no content.");
      }

      if (!mimeType) {
        throw new Error("No MIME type detected for the uploaded file.");
      }

      // Only allow supported MIME types
      const supportedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!supportedTypes.includes(mimeType)) {
        throw new Error(`Unsupported file type: ${mimeType}. Only PDF and DOCX files are supported.`);
      }

      const result = await model.generateContent([
        { inlineData: { mimeType, data: base64File } },
        { text: prompt },
      ]);

      let raw = result.response.text();
      console.log(`[Gemini] Raw response length: ${raw.length} chars`);

      if (!raw || raw.trim().length === 0) {
        throw new Error("Gemini returned an empty response. The file may be corrupted or unreadable.");
      }

      // Clean up any markdown blocks if the model wrapped it
      raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

      // Try to extract JSON from the response if it contains extra text
      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (parseError) {
        console.error("[Gemini] JSON parse failed, attempting extraction...");
        console.error("[Gemini] Raw text (first 500 chars):", raw.substring(0, 500));

        // Try to find a JSON object in the response
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            parsed = JSON.parse(jsonMatch[0]);
            console.log("[Gemini] Successfully extracted JSON from response");
          } catch (innerParseError) {
            throw new Error(
              `Failed to parse AI response as JSON. The AI returned malformed data. ` +
              `Parse error: ${innerParseError.message}`
            );
          }
        } else {
          throw new Error(
            `AI response did not contain valid JSON. ` +
            `Response preview: "${raw.substring(0, 200)}..."`
          );
        }
      }

      // Validate essential fields exist
      if (parsed.ats_score === undefined && parsed.atsScore === undefined) {
        console.warn("[Gemini] Response missing ats_score, setting default");
        parsed.ats_score = 50;
      }

      if (!parsed.summary) {
        parsed.summary = "Analysis completed but summary was not generated.";
      }

      if (!parsed.sections || typeof parsed.sections !== "object") {
        parsed.sections = {};
      }

      console.log(`[Gemini] Analysis successful — ATS Score: ${parsed.ats_score || parsed.atsScore}`);
      return parsed;

    } catch (error) {
      lastError = error;
      console.error(`[Gemini] Attempt ${attempt + 1} failed:`, error.message);

      // Don't retry on validation errors (bad input won't improve on retry)
      if (
        error.message.includes("Empty file buffer") ||
        error.message.includes("Unsupported file type") ||
        error.message.includes("No MIME type")
      ) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      if (attempt < MAX_RETRIES) {
        const delay = (attempt + 1) * 1500;
        console.log(`[Gemini] Retrying in ${delay}ms...`);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }

  // All retries exhausted
  throw new Error(
    `Resume analysis failed after ${MAX_RETRIES + 1} attempts. ` +
    `Last error: ${lastError?.message || "Unknown error"}. ` +
    `Please try again or upload a different file.`
  );
}

module.exports = { analyzeResume };
