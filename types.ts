
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

export interface SalaryInsight {
  role: string;
  indiaSalary: string;
  foreignSalaries: {
    country: string;
    salary: string;
  }[];
  highestPayingCountry: string;
}

export interface AnalysisResult {
  summary: string;
  scopeAnalysis: string;
  careerPaths: CareerPath[];
  salaryInsights: SalaryInsight[];
  roadmap: RoadmapStep[];
  motivation: string;
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
