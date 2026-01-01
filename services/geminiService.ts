
import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, JobInfo } from "../types";

// Safety wrapper to prevent initialization errors if key is missing during build
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing. Please set it in Netlify environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

const parseGeminiJson = (text: string) => {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    const cleanedJson = jsonMatch ? jsonMatch[0] : text;
    return JSON.parse(cleanedJson);
  } catch (e) {
    console.error("JSON Parse Error:", text);
    return null;
  }
};

export const analyzeCareer = async (
  userInput: string, 
  fileData?: { data: string; mimeType: string }
): Promise<AnalysisResult> => {
  const ai = getAIClient();
  if (!ai) throw new Error("API Key not configured correctly.");

  const model = "gemini-3-flash-preview";
  
  const prompt = `
    YOU ARE: SkillScan AI - An expert career mentor.
    USER QUERY: "${userInput}"
    
    TASK: Provide a deep analysis of the career or goal for the 2025-2030 market.
    LANGUAGE: The response (summary, scope, roadmap tasks, and motivation) MUST be in HINDI or HINGLISH.
    
    REQUIREMENTS:
    1. SUMMARY: A concise analysis in Hindi.
    2. SCOPE: Future demand (2025-2030) in Hindi.
    3. CAREER PATHS: Top roles with skills required.
    4. SALARY: Compare India vs 2 top countries.
    5. ROADMAP: 6-month step-by-step plan in HINDI.
    6. MOTIVATION: One powerful quote in Hindi.

    RESPONSE FORMAT: STRICT JSON ONLY.
  `;

  const contents = fileData 
    ? { parts: [{ text: prompt }, { inlineData: { data: fileData.data, mimeType: fileData.mimeType } }] }
    : { parts: [{ text: prompt }] };

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      systemInstruction: "You are SkillScan AI. You speak in professional Hindi/Hinglish. You provide 2025-2030 career roadmaps.",
      responseMimeType: "application/json"
    }
  });

  const parsed = parseGeminiJson(response.text || '{}');
  if (!parsed) throw new Error("Could not parse AI response");
  return parsed as AnalysisResult;
};

export const fetchLatestJobsInIndia = async (): Promise<{ jobs: JobInfo[], groundingMetadata: any }> => {
  const ai = getAIClient();
  if (!ai) return { jobs: [], groundingMetadata: null };

  const model = "gemini-3-flash-preview";
  const prompt = "Find 5-10 active job openings (Public/Private) in India for 2025 in JSON format.";

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
  } catch (error) {
    console.error("Job Fetch Error:", error);
    return { jobs: [], groundingMetadata: null };
  }
};
