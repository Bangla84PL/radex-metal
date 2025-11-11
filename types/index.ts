// ============================================
// SERVICE TYPES
// ============================================

export type ServiceType =
  | 'balustrady'
  | 'bramy'
  | 'ogrodzenia'
  | 'jachty'
  | 'konstrukcje'
  | 'zbrojenia'
  | 'renowacja'
  | 'inne';

export interface Service {
  id: ServiceType;
  title: string;
  description: string;
  details: string[];
  icon: string;
  image: string;
  order: number;
}

// ============================================
// GALLERY TYPES
// ============================================

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: ServiceType;
  width?: number;
  height?: number;
}

// ============================================
// CONTACT TYPES
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: ServiceType;
  message: string;
  gdprConsent: boolean;
  attachments?: File[];
}

export interface ContactInfo {
  companyName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  emails: string[];
  mapUrl: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// ============================================
// PAGE CONTENT TYPES
// ============================================

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  backgroundImage: string;
  backgroundVideo?: string;
}

export interface AboutContent {
  title: string;
  content: string;
  stats: Stat[];
  image: string;
}

export interface Stat {
  label: string;
  value: string;
  icon?: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  details?: string[];
  messageId?: string;
}

export interface EmailAttachment {
  filename: string;
  content: Buffer;
  contentType: string;
  size: number;
}

// ============================================
// VALIDATION TYPES
// ============================================

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}
