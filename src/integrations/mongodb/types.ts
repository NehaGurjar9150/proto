// MongoDB Collection Types for neha_didi_portfolio database

export interface ChatMessage {
  _id?: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ConversationHistory {
  _id?: string;
  userId?: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioData {
  _id?: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  bio: string;
  updatedAt: Date;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
  createdAt: Date;
}

export interface Skill {
  _id?: string;
  category: string;
  skills: string[];
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}
