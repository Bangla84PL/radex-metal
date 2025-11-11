import { ContactFormData, ValidationResult, ValidationError } from '@/types';

/**
 * Validate contact form data
 */
export function validateContactForm(data: Partial<ContactFormData>): ValidationResult {
  const errors: ValidationError[] = [];

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'Imię i nazwisko musi zawierać minimum 2 znaki.',
      code: 'VALIDATION_ERROR',
    });
  } else if (data.name.trim().length > 100) {
    errors.push({
      field: 'name',
      message: 'Imię i nazwisko nie może być dłuższe niż 100 znaków.',
      code: 'VALIDATION_ERROR',
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push({
      field: 'email',
      message: 'Podaj poprawny adres email.',
      code: 'INVALID_EMAIL',
    });
  }

  // Phone validation (Polish format)
  const phoneRegex = /^(\+48)?[0-9]{9}$/;
  const cleanPhone = data.phone?.replace(/\s/g, '');
  if (!data.phone || !phoneRegex.test(cleanPhone || '')) {
    errors.push({
      field: 'phone',
      message: 'Podaj poprawny numer telefonu (9 cyfr lub +48XXXXXXXXX).',
      code: 'INVALID_PHONE',
    });
  }

  // Service type validation
  const validServiceTypes = [
    'balustrady',
    'bramy',
    'ogrodzenia',
    'jachty',
    'konstrukcje',
    'zbrojenia',
    'renowacja',
    'inne',
  ];
  if (!data.serviceType || !validServiceTypes.includes(data.serviceType)) {
    errors.push({
      field: 'serviceType',
      message: 'Wybierz rodzaj usługi.',
      code: 'INVALID_SERVICE_TYPE',
    });
  }

  // Message validation
  if (!data.message || data.message.trim().length < 20) {
    errors.push({
      field: 'message',
      message: 'Wiadomość musi zawierać minimum 20 znaków.',
      code: 'MESSAGE_TOO_SHORT',
    });
  } else if (data.message.trim().length > 2000) {
    errors.push({
      field: 'message',
      message: 'Wiadomość nie może być dłuższa niż 2000 znaków.',
      code: 'MESSAGE_TOO_LONG',
    });
  }

  // GDPR consent validation
  if (!data.gdprConsent) {
    errors.push({
      field: 'gdprConsent',
      message: 'Musisz wyrazić zgodę na przetwarzanie danych osobowych.',
      code: 'GDPR_CONSENT_REQUIRED',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate file upload
 */
export function validateFile(file: File): { isValid: boolean; error?: string } {
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `Nieprawidłowy typ pliku "${file.name}". Dozwolone: JPG, PNG, PDF.`,
    };
  }

  if (file.size > MAX_SIZE) {
    return {
      isValid: false,
      error: `Plik "${file.name}" jest za duży (${formatFileSize(file.size)}). Maksymalny rozmiar: 5MB.`,
    };
  }

  return { isValid: true };
}

/**
 * Validate multiple files
 */
export function validateFiles(files: File[]): { isValid: boolean; error?: string } {
  const MAX_FILES = 3;

  if (files.length > MAX_FILES) {
    return {
      isValid: false,
      error: `Możesz załączyć maksymalnie ${MAX_FILES} pliki.`,
    };
  }

  for (const file of files) {
    const result = validateFile(file);
    if (!result.isValid) {
      return result;
    }
  }

  return { isValid: true };
}

/**
 * Format file size to human-readable string
 */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Sanitize input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .slice(0, 1000); // Limit length
}
