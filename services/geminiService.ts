
import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, JobInfo, Language } from "../types";

const parseGeminiJson = (text: string) => {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    const cleanedJson = jsonMatch ? jsonMatch[0] : text;
    return JSON.parse(cleanedJson);
  } catch (e) {
    console.error("AI response parse error:", text);
    return null;
  }
};

export const analyzeCareer = async (
  userInput: string, 
  language: Language,
  fileData?: { data: string; mimeType: string }
): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "") {
    throw new Error("API_KEY missing. Please configure it in your environment.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-3-pro-preview"; 
  
  const languageInstruction = language === 'hi' 
    ? "VERY IMPORTANT: All text content in the JSON must be in HINDI language (using Devanagari script), but keep technical terms like 'Software Engineer' in English where appropriate. Summary should be in expert Hindi."
    : "All content should be in professional English.";

  const prompt = `
    YOU ARE: SkillScan AI - India's #1 Career Super App & Study Mentor.
    USER CONTEXT: "${userInput}"
    LANGUAGE PREFERENCE: ${language === 'hi' ? 'Hindi' : 'English'}
    
    SPECIAL INSTRUCTION FOR STUDENTS: 
    If the user is a student (10th/12th/College) asking for exam prep, you MUST provide:
    1. A detailed hourly "dailyTimetable" (Daily Routine) starting from morning wake-up till sleep, focused on their subjects.
    2. "learningResources" with REAL working links to YouTube channels like Khan Academy, Physics Wallah, Unacademy, or NCERT/Board portals relevant to their specific query.
    
    GOAL: Help the user achieve their target (e.g., 90% in boards or landing a job).
    
    ${languageInstruction}
    
    REQUIRED DATA POINTS FOR SUPER REPORT (JSON ONLY):
    1. summary (Expert overview)
    2. scopeAnalysis (Market 2025-2030)
    3. resumeScore (overall, breakdown, critiques)
    4. missingSkills (List of specific gaps)
    5. atsOptimizations (specific tips)
    6. coverLetter (ready-to-use)
    7. interviewPrep (Questions + tips)
    8. careerPaths (Multiple roles)
    9. salaryInsights (India, Global)
    10. roadmap (6-12 month milestones)
    11. motivation (Powerful quote)
    12. dailyMissions (Learning tasks)
    13. futurePrediction (Next 5 years)
    14. emergencyGuidance (Support)
    15. badges (Gamification titles)
    16. careerGrowthScore (0-100)
    17. incomePotential (Estimated)
    18. ninetyDayProgram (Milestones)
    19. govtJobAssistant (Prep for relevant exams)
    20. microInternships (Mock projects)
    21. minIncomeSkills (Fast earning skills)
    22. collegeCourseFinder (Best institutions)
    23. studentGuidance (Academic advice)
    24. dailyTimetable (Hourly routine slots: time, activity, details)
    25. learningResources (List: title, description, url, sourceType)

    Ensure all data is 2025-current using Google Search tool.
  `;

  const contents = fileData 
    ? { parts: [{ text: prompt }, { inlineData: { data: fileData.data, mimeType: fileData.mimeType } }] }
    : { parts: [{ text: prompt }] };

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: `You are SkillScan AI. Return strictly JSON. Output language: ${language === 'hi' ? 'Hindi' : 'English'}. For students, focus heavily on study routine and resources.`,
        responseMimeType: "application/json",
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 32768 },
        tools: [{ googleSearch: {} }]
      }
    });

    const parsed = parseGeminiJson(response.text || '{}');
    if (!parsed || !parsed.summary) {
      throw new Error("AI engine did not return a complete career profile. Please try again.");
    }
    return parsed as AnalysisResult;
  } catch (error: any) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

export const fetchLatestJobsInIndia = async (language: Language): Promise<{ jobs: JobInfo[], groundingMetadata: any }> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-3-flash-preview";
  
  const prompt = `Find 12 active job openings in India for early 2025. 
  Output descriptions in ${language === 'hi' ? 'Hindi' : 'English'}.
  JSON Format: { "jobs": [{ "title", "organization", "type", "location", "description", "sourceUrl" }] }`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.1
      }
    });

    const data = parseGeminiJson(response.text || "") || { jobs: [] };
    return {
      jobs: data.jobs || [],
      groundingMetadata: response.candidates?.[0]?.groundingMetadata
    };
  } catch (error: any) {
    console.error("Job Search Error:", error);
    return { jobs: [], groundingMetadata: null };
  }
};
