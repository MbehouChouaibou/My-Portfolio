import rawData from "@/content/portfolio.json";

/* ─── Types ────────────────────────────────────────────────────────────── */

export interface Stat   { value: string; label: string }
export interface Social { github: string; linkedin: string; email: string }

export interface Profile {
  name: string;
  initials: string;
  tagline: string;
  bio: string[];
  location: string;
  availabilityLabel: string;
  photoUrl: string;
  resumeUrl: string;
  typingRoles: string[];
  stats: Stat[];
  social: Social;
}

export interface Expertise { label: string; icon: string }

export interface About {
  title: string;
  paragraphs: string[];
  expertise: Expertise[];
}

export interface TechSkill {
  name: string;
  level: number;
  category: string;
}

export interface Skills {
  technical: TechSkill[];
  soft: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  current: boolean;
  location: string;
  logoUrl: string;
  points: string[];
  technologies: string[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  technologies: string[];
  impact: string;
  coverUrl: string;
  liveUrl: string;
  githubUrl: string;
  caseStudy: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  logoUrl: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  logoUrl: string;
  highlights: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
}

export interface Resume {
  heading: string;
  description: string;
  url: string;
  buttonLabel: string;
}

export interface Contact {
  heading: string;
  description: string;
  email: string;
}

export interface NavItem {
  key: string;
  href: string;
}

export interface Footer {
  copyright: string;
}

export interface PortfolioData {
  profile: Profile;
  about: About;
  skills: Skills;
  experiences: Experience[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
  testimonials: Testimonial[];
  blog: BlogPost[];
  resume: Resume;
  contact: Contact;
  nav: NavItem[];
  footer: Footer;
}

export function getPortfolioData(): PortfolioData {
  return rawData as PortfolioData;
}
