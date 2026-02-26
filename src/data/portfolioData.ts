import type { NavItem, Experience, Project, TechnicalSkill } from "../types";

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "AEON CLOUD",
    period: "October 2024 - Present",
    role: "Software Engineer",
    points: [
      "Developing scalable cloud-based solutions using microservices architecture",
      "Implementing CI/CD pipelines and containerized deployments",
      "Collaborating with cross-functional teams to deliver robust cloud applications",
    ],
    technologies: ["AWS", "Docker", "Spring Boot", "React", "PostgreSQL"]
  },
  {
    company: "DITALIS SA",
    period: "June 2023 - September 2024",
    role: "Full Stack Developer",
    points: [
      "Built enterprise-level web applications with modern frameworks",
      "Optimized database performance and implemented efficient queries",
      "Mentored junior developers and conducted code reviews",
    ],
    technologies: ["React", "ASP.NET Core", "SQL Server", "Azure", "Tailwind CSS"]
  },
  {
    company: "African Robot Project",
    period: "January 2023 - May 2023",
    role: "Software Developer",
    points: [
      "Developed responsive web interfaces for robotics control systems",
      "Integrated real-time communication using WebSocket protocols",
      "Improved system reliability and user experience",
    ],
    technologies: ["Next.js", "Express.js", "WebSocket", "MongoDB", "Python"]
  },
  {
    company: "CIME",
    period: "June 2022 - December 2022",
    role: "Software Engineering Intern",
    points: [
      "Contributed to inventory management system development",
      "Learned and applied agile development methodologies",
      "Participated in code reviews and team collaborations",
    ],
    technologies: ["Java", "Spring Boot", "MySQL", "React"]
  },
];

export const PROJECTS: Project[] = [
  {
    title: "University Management System (Frontend Project)",
    description: "Developed a modern, responsive frontend application for EPFPS Meiganga to manage students, courses, departments, and academic workflows with Next.js and REST APIs.",
    technologies: ["Next.js", "Tailwind CSS", "JavaScript", "TypeScript", "REST APIs"],
    impact: "Improved usability and administrative efficiency with scalable role-based academic dashboards.",
    category: "Education",
    githubUrl: "#",
    liveUrl: "https://www.univ-mbere.org/"
  },
  {
    title: "Smart Inventory Management",
    description: "A comprehensive inventory tracking solution with real-time updates, analytics dashboard, and automated reporting features.",
    technologies: ["React", "Spring Boot", "PostgreSQL", "Docker", "AWS"],
    impact: "Reduced inventory tracking time by 60%",
    category: "Full Stack",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "Speech Recognition Mobile App",
    description: "Mobile application with voice-controlled interface for hands-free operation, supporting multiple languages and dialects.",
    technologies: ["React Native", "Python", "TensorFlow", "AWS"],
    impact: "Improved accessibility for 1000+ users",
    category: "Mobile",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "African Robot Web Interface",
    description: "Interactive web platform for controlling and monitoring robotic systems with real-time data visualization.",
    technologies: ["Next.js", "Express.js", "WebSocket", "MongoDB"],
    impact: "Enhanced robot control efficiency by 45%",
    category: "Web",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "Trade Force Automation",
    description: "Sales force automation platform with route optimization, customer management, and performance analytics.",
    technologies: ["React", "ASP.NET Core", "SQL Server", "Azure"],
    impact: "Increased sales team productivity by 35%",
    category: "Enterprise",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "Épargne+ Banking App",
    description: "Secure online banking application with savings management, transaction history, and goal-tracking features.",
    technologies: ["React", "Spring Boot", "Oracle DB", "AWS"],
    impact: "Serving 5000+ active users daily",
    category: "Fintech",
    githubUrl: "#",
    liveUrl: "#"
  },
];

export const TECHNICAL_SKILLS: TechnicalSkill[] = [
  { name: "Python", category: "language", level: 90 },
  { name: "Java", category: "language", level: 85 },
  { name: "JavaScript", category: "language", level: 95 },
  { name: "TypeScript", category: "language", level: 80 },
  { name: "C#", category: "language", level: 75 },
  { name: "SQL", category: "database", level: 85 },
  { name: "React", category: "frontend", level: 95 },
  { name: "Next.js", category: "frontend", level: 80 },
  { name: "Tailwind CSS", category: "frontend", level: 90 },
  { name: "Spring Boot", category: "backend", level: 85 },
  { name: "Express.js", category: "backend", level: 80 },
  { name: "ASP.NET Core", category: "backend", level: 75 },
  { name: "PostgreSQL", category: "database", level: 85 },
  { name: "MongoDB", category: "database", level: 70 },
  { name: "Docker", category: "devops", level: 75 },
  { name: "AWS", category: "devops", level: 70 },
  { name: "Git", category: "tools", level: 95 },
  { name: "Figma", category: "tools", level: 65 },
];

export const SOFT_SKILLS = [
  "Problem-Solving", "Communication", "Time Management", "Adaptability", 
  "Team Collaboration", "Critical Thinking", "Agile Methodology"
];
