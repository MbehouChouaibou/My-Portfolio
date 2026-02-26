export type NavItem = { id: string; label: string };

export type Experience = { 
  company: string; 
  period: string; 
  role: string; 
  points: string[];
  technologies: string[];
};

export type Project = { 
  title: string; 
  description: string; 
  technologies: string[]; 
  impact: string;
  category: string;
  liveUrl?: string;
  githubUrl?: string;
};

export type ContactFormData = { name: string; email: string; message: string };
export type FormStatus = "idle" | "sending" | "success" | "error";

export type TechnicalSkill = {
  name: string;
  category: string;
  level: number;
};