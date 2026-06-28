/**
 * Normalize Gemini AI analysis response from snake_case to camelCase.
 * This ensures consistent field names across the entire app (MongoDB, API responses, frontend).
 *
 * @param {Object} result - Raw Gemini response with snake_case keys
 * @returns {Object} Normalized object with camelCase keys
 */
function normalizeAnalysisData(result) {
  return {
    atsScore: result.ats_score ?? result.atsScore ?? 0,
    summary: result.summary || '',
    sections: result.sections || {},
    matchedKeywords: result.matched_keywords ?? result.matchedKeywords ?? [],
    missingKeywords: result.missing_keywords ?? result.missingKeywords ?? [],
    improvementSuggestions: result.improvements ?? result.improvementSuggestions ?? [],
    strengths: result.strengths ?? [],
    jobMatchPercentage: result.job_match_percentage ?? result.jobMatchPercentage ?? null,
    experienceLevel: result.experience_level ?? result.experienceLevel ?? 'unknown',
    recommendedRoles: result.recommended_roles ?? result.recommendedRoles ?? [],
  };
}

module.exports = { normalizeAnalysisData };
