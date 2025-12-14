export interface FAQ {
  question: string;
  answer: string;
}

export interface Template {
  id: string;
  title: string;
  category: 'Banking' | 'Police' | 'Utility' | 'Job' | 'School' | 'General';
  englishBody: string;
  hindiBody: string;
  faqs: FAQ[];
  tags: string[];
}

export interface Draft {
  id: string;
  templateId: string | null; // null if AI generated from scratch
  title: string;
  content: string; // The final filled content
  lastModified: number;
}

export enum AppView {
  HOME = 'home',
  CATEGORY = 'category',
  EDITOR = 'editor',
  AI_TOOL = 'ai_tool',
  DRAFTS = 'drafts',
  FAQ = 'faq',
  REQUEST = 'request',
  ABOUT = 'about',
  CONTACT = 'contact',
  LEGAL = 'legal'
}
