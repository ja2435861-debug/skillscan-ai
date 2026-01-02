
import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, JobInfo } from "../types";

/**
 * SkillScan AI Service
 * Optimized for Vercel/Netlify with gemini-3-flash for better quota handling.
 */

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
  fileData?: { data: string; mimeType: string }
): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "") {
    throw new Error("API_KEY nahi mili. Kripya Vercel/Netlify Dashboard mein Environment Variable set karein.");
  }

  const ai = new GoogleGenAI({ apiKey });
  // Using Flash model instead of Pro to avoid 'Quota Exceeded' errors on free tier
  const model = "gemini-3-flash-preview"; 
  
  const prompt = `
    YOU ARE: SkillScan AI - An expert career mentor.
    USER QUERY: "${userInput}"
    
    TASK: 2025-2030 job market ke liye career analysis karein.
    LANGUAGE: Summary, scope, roadmap aur motivation HINDI ya HINGLISH mein honi chahiye.
    
    JSON STRUCTURE REQUIREMENTS:
    {
      "summary": "...",
      "scopeAnalysis": "...",
      "careerPaths": [{"title": "...", "description": "...", "relevance": "...", "requiredSkills": [], "jobRoles": []}],
      "salaryInsights": [{"role": "...", "indiaSalary": "...", "foreignSalaries": [{"country": "...", "salary": "..."}], "highestPayingCountry": "..."}],
      "roadmap": [{"month": "Month 1-2", "focus": "...", "tasks": [], "resources": [{"name": "...", "url": "..."}]}],
      "motivation": "..."
    }
  `;

  const contents = fileData 
    ? { parts: [{ text: prompt }, { inlineData: { data: fileData.data, mimeType: fileData.mimeType } }] }
    : { parts: [{ text: prompt }] };

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: "You are SkillScan AI. Provide 100% accurate, professional Hindi/Hinglish career advice. Only output raw JSON.",
        responseMimeType: "application/json",
        temperature: 0.7
      }
    });

    const parsed = parseGeminiJson(response.text || '{}');
    if (!parsed || !parsed.summary) {
      throw new Error("AI engine ne response format galat bheja hai. Dubara try karein.");
    }
    return parsed as AnalysisResult;
  } catch (error: any) {
    console.error("Gemini Error:", error);
    if (error.message?.includes("429")) {
      throw new Error("API Quota khatam ho gaya hai. Kripya 1 minute baad koshish karein ya billing check karein.");
    }
    throw error;
  }
};

export const fetchLatestJobsInIndia = async (): Promise<{ jobs: JobInfo[], groundingMetadata: any }> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key missing");

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-3-flash-preview";
  
  const prompt = "Find 5-10 active tech or corporate job openings in India for 2025. Return as JSON: { \"jobs\": [...] } with keys title, organization, type, location, description, sourceUrl.";

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        tools: [{ googleSearch: {} }],
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
