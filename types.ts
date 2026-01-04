
export type Language = 'en' | 'hi';

export interface CareerPath {
  title: string;
  description: string;
  relevance: string;
  requiredSkills: string[];
  jobRoles: string[];
}

export interface RoadmapStep {
  month: string;
  focus: string;
  tasks: string[];
  resources: { name: string; url: string }[];
}

export interface TimetableSlot {
  time: string;
  activity: string;
  details: string;
}

export interface LearningResource {
  title: string;
  description: string;
  url: string;
  sourceType: 'YouTube' | 'Web' | 'PDF';
}

export interface SalaryInsight {
  role: string;
  indiaSalary: string;
  foreignSalaries: {
    country: string;
    salary: string;
  }[];
  highestPayingCountry: string;
}

export interface ResumeScore {
  overall: number;
  breakdown: {
    keywords: number;
    formatting: number;
    impact: number;
  };
  critiques: string[];
}

export interface InterviewQuestion {
  question: string;
  category: 'Behavioral' | 'Technical' | 'Future';
  tip: string;
}

export interface GovtJobInfo {
  category: string;
  exams: string[];
  eligibility: string;
  prepRoadmap: string[];
  alertKeywords: string[];
}

export interface MicroInternship {
  title: string;
  company: string;
  duration: string;
  tasks: string[];
}

export interface AnalysisResult {
  summary: string;
  scopeAnalysis: string;
  resumeScore: ResumeScore;
  missingSkills: string[];
  atsOptimizations: string[];
  coverLetter: string;
  interviewPrep: InterviewQuestion[];
  careerPaths: CareerPath[];
  salaryInsights: SalaryInsight[];
  roadmap: RoadmapStep[];
  motivation: string;
  // Super App Extensions
  dailyMissions: string[];
  futurePrediction: string;
  emergencyGuidance: string;
  badges: string[];
  careerGrowthScore: number;
  incomePotential: string;
  ninetyDayProgram: { day: number; task: string }[];
  govtJobAssistant: GovtJobInfo;
  microInternships: MicroInternship[];
  minIncomeSkills: { skill: string; time: string; earning: string }[];
  collegeCourseFinder: { name: string; type: string; reason: string }[];
  studentGuidance: string; 
  // NEW: Study & Timetable Features
  dailyTimetable: TimetableSlot[];
  learningResources: LearningResource[];
}

export interface JobInfo {
  title: string;
  organization: string;
  type: 'Public' | 'Private';
  location: string;
  deadline: string;
  description: string;
  sourceUrl: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  JOBS = 'JOBS',
  ERROR = 'ERROR'
}
