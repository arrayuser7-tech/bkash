export type Screen = 'mobile_number' | 'verification' | 'redirect';

export interface OperatorInfo {
  name: string;
  code: string;
  logoColor: string;
  bgLight: string;
}

export interface PhoneValidationResult {
  isValid: boolean;
  rawDigits: string;
  formattedNumber: string;
  maskedNumber: string;
  operator: OperatorInfo | null;
  errorMessage: string | null;
}
