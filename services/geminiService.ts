
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, JobInfo } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const parseGeminiJson = (text: string) => {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : text);
  } catch (e) {
    console.error("JSON Parse Error:", e, text);
    throw new Error("Invalid AI response format");
  }
};

export const analyzeCareer = async (
  userInput: string, 
  fileData?: { data: string; mimeType: string }
): Promise<AnalysisResult> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    ACT AS: SkillScan AI Career Mentor. 
    QUERY: "${userInput}"
    
    TASK: Analyze career/educational scope in English (2025-2030).
    SALARIES: Compare India vs 2 highest-paying global countries.
    ROADMAP: 6-month actionable plan.
    
    RESPONSE FORMAT: STRICT JSON ONLY. No preamble.
    {
      "summary": "Concise profile analysis.",
      "scopeAnalysis": "Detailed 5-10 year demand/scope for this specific path.",
      "careerPaths": [{ "title", "description", "relevance", "requiredSkills": [], "jobRoles": [] }],
      "salaryInsights": [{ "role", "indiaSalary", "foreignSalaries": [{ "country", "salary" }], "highestPayingCountry" }],
      "roadmap": [{ "month", "focus", "tasks": [], "resources": [{ "name", "url" }] }],
      "motivation": "Inspiring quote."
    }
  `;

  const contents = fileData 
    ? { parts: [{ text: prompt }, { inlineData: { data: fileData.data, mimeType: fileData.mimeType } }] }
    : { parts: [{ text: prompt }] };

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      thinkingConfig: { thinkingBudget: 0 },
      responseMimeType: "application/json"
    }
  });

  return parseGeminiJson(response.text || '{}') as AnalysisResult;
};

export const fetchLatestJobsInIndia = async (): Promise<{ jobs: JobInfo[], groundingMetadata: any }> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    SEARCH: Latest active job openings in India for 2025 (Private and Govt/Sarkari).
    FOCUS: Tech, Finance, Healthcare, and Marketing.
    
    STRICT JSON OUTPUT:
    {
      "jobs": [
        {
          "title": "Job Title",
          "organization": "Company/Dept Name",
          "type": "Public" or "Private",
          "location": "City, State",
          "deadline": "Date",
          "description": "Brief summary",
          "sourceUrl": "Direct application link"
        }
      ]
    }
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      thinkingConfig: { thinkingBudget: 0 },
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json"
    }
  });

  const data = parseGeminiJson(response.text || '{"jobs": []}');
  
  return {
    jobs: (data.jobs || []).map((j: any) => ({
      ...j,
      type: j.type === 'Public' || j.type === 'Sarkari' ? 'Public' : 'Private'
    })) as JobInfo[],
    groundingMetadata: response.candidates?.[0]?.groundingMetadata
  };
};
