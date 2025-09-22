export enum CourseCategory {
  RECO_LICENSING = 'RECO_LICENSING',
  LEGAL_REQUIREMENTS = 'LEGAL_REQUIREMENTS',
  MARKET_ANALYSIS = 'MARKET_ANALYSIS',
  NEGOTIATION = 'NEGOTIATION',
  DOCUMENTATION = 'DOCUMENTATION',
  ETHICS = 'ETHICS',
  CONTINUING_EDUCATION = 'CONTINUING_EDUCATION'
}

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  PROFESSIONAL = 'PROFESSIONAL'
}

export enum EnrollmentStatus {
  ENROLLED = 'ENROLLED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum ResourceType {
  DOCUMENT = 'DOCUMENT',
  VIDEO = 'VIDEO',
  ARTICLE = 'ARTICLE',
  FORM = 'FORM',
  GUIDE = 'GUIDE',
  WEBINAR = 'WEBINAR'
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  content: Record<string, any>;
  category: CourseCategory;
  level: CourseLevel;
  duration: number; // Duration in minutes
  isFree: boolean;
  price?: number;
  thumbnail?: string;
  prerequisites: string[];
  learningObjectives: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  content: Record<string, any>;
  order: number;
  duration: number; // Duration in minutes
  isQuiz: boolean;
  createdAt: Date;
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  completedAt?: Date;
  progress: number; // Progress percentage
  status: EnrollmentStatus;
}

export interface EducationProgress {
  id: string;
  userId: string;
  courseId: string;
  moduleId?: string;
  completed: boolean;
  score?: number;
  timeSpent: number; // Time spent in minutes
  completedAt?: Date;
  createdAt: Date;
}

export interface RecoResource {
  id: string;
  title: string;
  description?: string;
  url: string;
  type: ResourceType;
  category: string;
  isOfficial: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SelfRepresentationGuide {
  id: string;
  title: string;
  content: Record<string, any>;
  category: string;
  step: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LicensingRequirement {
  title: string;
  description: string;
  duration?: string;
  provider?: string;
  format?: string;
  passingGrade?: string;
  validity?: string;
  minimum?: string;
}

export interface LicensingCost {
  item: string;
  cost: string;
}

export interface ContinuingEducationRequirement {
  title: string;
  hours?: number;
  description: string;
  topics?: string[];
}

export interface EducationProgressSummary {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHoursSpent: number;
  enrollments: Array<{
    courseTitle: string;
    category: CourseCategory;
    progress: number;
    status: EnrollmentStatus;
    enrolledAt: Date;
    completedAt?: Date;
  }>;
}

export interface CourseFilters {
  category?: CourseCategory;
  level?: CourseLevel;
  isFree?: boolean;
}

export interface ProgressUpdateData {
  courseId: string;
  moduleId?: string;
  completed: boolean;
  score?: number;
  timeSpent: number;
}
