
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
    ? "VERY IMPORTANT: All text content in the JSON must be in HINDI language (Devanagari script), but keep specific subjects like 'Physics', 'Calculus' or 'Coding' in English. Output must be expert-level Hindi."
    : "All content should be in professional English.";

  const prompt = `
    YOU ARE: SkillScan AI Super Mentor (Android Version).
    USER CONTEXT: "${userInput}"
    CURRENT DATE: ${new Date().toLocaleDateString()}
    LANGUAGE: ${language === 'hi' ? 'Hindi' : 'English'}
    
    SPECIAL TASK FOR EXAM PREP:
    If the user mentions an exam (like 12th Boards, RBSE, CBSE, JEE), YOU MUST calculate the days remaining.
    1. "dailyTimetable": Create a strict 24-hour routine optimized for the remaining days. Include Revision blocks, Mock Tests, and specific Subject Grinds.
    2. "learningResources": Provide REAL YouTube links or Website URLs for the specific subjects mentioned. (Example: One Shot videos for RBSE Physics, Hindi Medium resources if applicable).
    3. "studentGuidance": Give a strategy to score 90%+ in the remaining time.

    ${languageInstruction}
    
    REQUIRED DATA POINTS (JSON ONLY):
    summary, scopeAnalysis, resumeScore, missingSkills, atsOptimizations, coverLetter, interviewPrep, careerPaths, salaryInsights, roadmap, motivation, dailyMissions, futurePrediction, emergencyGuidance, badges, careerGrowthScore, incomePotential, ninetyDayProgram, govtJobAssistant, microInternships, minIncomeSkills, collegeCourseFinder, studentGuidance, dailyTimetable, learningResources.

    Use Google Search to find current 2025 exam dates or high-quality educational links.
  `;

  const contents = fileData 
    ? { parts: [{ text: prompt }, { inlineData: { data: fileData.data, mimeType: fileData.mimeType } }] }
    : { parts: [{ text: prompt }] };

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: "You are an Android-based Super Career & Study Mentor. Provide structured JSON. For students, focus on success routines and learning links.",
        responseMimeType: "application/json",
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 24576 },
        tools: [{ googleSearch: {} }]
      }
    });

    const parsed = parseGeminiJson(response.text || '{}');
    if (!parsed || !parsed.summary) {
      throw new Error("AI engine did not return a complete profile. Try again.");
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
  const prompt = `Find 12 active job openings in India 2025. JSON Format: { "jobs": [{ "title", "organization", "type", "location", "description", "sourceUrl" }] }`;
  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: { tools: [{ googleSearch: {} }], temperature: 0.1 }
    });
    const data = parseGeminiJson(response.text || "") || { jobs: [] };
    return { jobs: data.jobs || [], groundingMetadata: response.candidates?.[0]?.groundingMetadata };
  } catch (error: any) {
    return { jobs: [], groundingMetadata: null };
  }
};
