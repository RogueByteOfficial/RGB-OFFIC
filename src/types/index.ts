export type Language = 'ar' | 'en';
export type ThemeMode = 'light' | 'dark' | 'system';

export interface LocalizedString {
  ar: string;
  en: string;
}

export interface Banner {
  id: string;
  title: LocalizedString;
  subtitle?: LocalizedString;
  description: LocalizedString;
  imageUrl: string;
  badge?: LocalizedString;
  buttonText: LocalizedString;
  buttonLink: string;
  secondaryButtonText?: LocalizedString;
  secondaryButtonLink?: string;
  order: number;
  isActive: boolean;
  createdAt?: string;
}

export interface ValueItem {
  id?: string;
  title: LocalizedString;
  desc: LocalizedString;
  icon: string;
}

export interface AboutInfo {
  companyName: LocalizedString;
  tagline: LocalizedString;
  bio: LocalizedString;
  story: LocalizedString;
  vision: LocalizedString;
  mission: LocalizedString;
  values: ValueItem[];
  experienceYears: number;
  completedProjects: number;
  satisfiedClients: number;
  expertTeam: number;
  heroImageUrl?: string;
}

export interface Service {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
  features?: LocalizedString[];
}

export type ApplicationStatus = 'live' | 'beta' | 'in_development';

export interface Application {
  id: string;
  name: LocalizedString;
  logoUrl: string;
  coverImageUrl: string;
  screenshots: string[];
  shortDesc: LocalizedString;
  fullDesc: LocalizedString;
  features: LocalizedString[];
  technologies: string[];
  version: string;
  releaseDate: string;
  status: ApplicationStatus;
  googlePlayUrl?: string;
  appStoreUrl?: string;
  websiteUrl?: string;
  githubUrl?: string;
  order: number;
  isFeatured: boolean;
  isActive: boolean;
}

export type ProjectStatus = 'completed' | 'ongoing';

export interface Project {
  id: string;
  title: LocalizedString;
  coverImageUrl: string;
  gallery: string[];
  description: LocalizedString;
  technologies: string[];
  clientName?: string;
  category?: LocalizedString;
  projectUrl?: string;
  githubUrl?: string;
  date: string;
  status: ProjectStatus;
  isFeatured: boolean;
  order?: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: any;
  isRead: boolean;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
  whatsapp?: string;
  telegram?: string;
}

export interface SeoSettings {
  metaTitle: LocalizedString;
  metaDescription: LocalizedString;
  keywords: string;
  ogImageUrl?: string;
}

export interface GeneralSettings {
  siteName: LocalizedString;
  companyName: LocalizedString;
  logoUrl: string;
  faviconUrl?: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: LocalizedString;
  defaultLanguage: Language;
  theme: ThemeMode;
  seo: SeoSettings;
  social: SocialLinks;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  createdAt: any;
  usedIn?: string[];
}
