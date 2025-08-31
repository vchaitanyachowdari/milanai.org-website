// Application Configuration
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Milan AI',
  url: import.meta.env.VITE_APP_URL || 'https://www.milanai.org',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  description: 'One AI Platform for All Your Developer Tools',
  email: 'contact@milanai.org',
};

// API Configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.milanai.org',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mnnpgvjp',
};

// Feature Flags
export const FEATURES = {
  analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  errorReporting: import.meta.env.VITE_ENABLE_ERROR_REPORTING === 'true',
  pwa: import.meta.env.VITE_ENABLE_PWA === 'true',
  debugMode: import.meta.env.VITE_DEBUG_MODE === 'true',
};

// Analytics
export const ANALYTICS = {
  gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID || 'G-WK3B5CBKNK',
};

// Social Links
export const SOCIAL_LINKS = {
  linkedin: '#',
  github: '#',
  twitter: '#',
};

// Navigation Links
export const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#problem', label: 'Problem' },
  { href: '#solution', label: 'Solution' },
  { href: '#team', label: 'Team' },
];

// Team Members
export const TEAM_MEMBERS = [
  {
    name: "Vachan M N",
    role: "Full-Stack Developer",
    bio: "Freelance full-stack web developer passionate about creating impactful apps.",
  },
  {
    name: "Sumit Kumar Jha",
    role: "Blockchain Developer",
    bio: "Passionate full-stack developer with over 3 years of experience in Blockchain development.",
  },
  {
    name: "Arun Ramesh Chavan",
    role: "Full-Stack Developer",
    bio: "Passionate about building scalable and user-centric applications.",
  },
  {
    name: "V Chaitanya Chowdari",
    role: "AI Specialist",
    bio: "Deep passion for artificial intelligence, machine learning, blockchain, and futuristic technologies.",
  },
  {
    name: "Darshan Kumar M",
    role: "Data Scientist",
    bio: "Data Science enthusiast who has worked on multiple data analytical projects.",
  },
  {
    name: "Rinith R",
    role: "Engineer & Builder",
    bio: "Passionate engineer and solo builder, crafting AI-driven and full-stack solutions that solve real-world problems.",
  },
];

// Features List
export const FEATURES_LIST = [
  {
    title: "Custom AI Workflows",
    description: "Create personalized AI workflows tailored to your development process.",
  },
  {
    title: "AI-Based Security",
    description: "Advanced security and compliance monitoring powered by AI.",
  },
  {
    title: "API Optimization",
    description: "AI-powered API optimization to improve performance and efficiency.",
  },
  {
    title: "Automated Reporting",
    description: "Generate comprehensive reports automatically with AI assistance.",
  },
  {
    title: "Domain-Specific Training",
    description: "AI that learns your domain and provides specialized assistance.",
  },
  {
    title: "Tool Matching",
    description: "AI-driven tool matching to recommend the best tools for your tasks.",
  },
];