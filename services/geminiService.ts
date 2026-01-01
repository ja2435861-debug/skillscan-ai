
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, JobInfo } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const parseGeminiJson = (text: string) => {
  try {
    // Attempt to find JSON block in case the model adds conversational filler
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    const cleanedJson = jsonMatch ? jsonMatch[0] : text;
    return JSON.parse(cleanedJson);
  } catch (e) {
    console.error("JSON Parse Error. Raw text:", text);
    // Return a structured fallback to prevent app crash
    return null;
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
    
    RESPONSE FORMAT: STRICT JSON ONLY.
    {
      "summary": "Concise profile analysis.",
      "scopeAnalysis": "Detailed 5-10 year demand/scope.",
      "careerPaths": [{ "title", "description", "relevance", "requiredSkills": [], "jobRoles": [] }],
      "salaryInsights": [{ "role", "indiaSalary", "foreignSalaries": [{ "country", "salary" }], "highestPayingCountry" }],
      "roadmap": [{ "month", "focus", "tasks": [], "resources": [{ "name", "url" }] }],
      "motivation": "Inspiring quote."
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
        thinkingConfig: { thinkingBudget: 0 },
        responseMimeType: "application/json"
      }
    });

    // Use response.text directly as per guidelines
    const parsed = parseGeminiJson(response.text || '{}');
    if (!parsed) throw new Error("Could not parse AI response");
    return parsed as AnalysisResult;
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
};

export const fetchLatestJobsInIndia = async (): Promise<{ jobs: JobInfo[], groundingMetadata: any }> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Find 5-10 active job openings in India for 2025. 
    Include a mix of "Public Sector/Sarkari" (e.g., SSC, Banking, PSU) and "Private Sector" (Tech, Finance).
    For each job provide: Title, Organization, Type (Public/Private), Location, Deadline, Summary, and a valid Source URL.
    
    STRICT JSON FORMAT:
    {
      "jobs": [
        {
          "title": "Role Name",
          "organization": "Company",
          "type": "Public" or "Private",
          "location": "City",
          "deadline": "YYYY-MM-DD",
          "description": "Short summary",
          "sourceUrl": "URL"
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        tools: [{ googleSearch: {} }],
      }
    });

    // Use response.text directly as per guidelines
    const resultText = response.text || "";
    const data = parseGeminiJson(resultText) || { jobs: [] };
    
    const sanitizedJobs = (data.jobs || []).map((j: any) => ({
      title: j.title || "Job Opening",
      organization: j.organization || "Various Organizations",
      type: (j.type === 'Public' || j.type === 'Sarkari' || j.type?.toLowerCase().includes('govt')) ? 'Public' : 'Private',
      location: j.location || "India",
      deadline: j.deadline || "See Website",
      description: j.description || "Active vacancy found via search.",
      sourceUrl: j.sourceUrl || "https://www.google.com/search?q=" + encodeURIComponent(j.title + " jobs India")
    })) as JobInfo[];
    
    return {
      jobs: sanitizedJobs,
      groundingMetadata: response.candidates?.[0]?.groundingMetadata
    };
  } catch (error) {
    console.error("Job Fetch Error:", error);
    return { jobs: [], groundingMetadata: null };
  }
};
