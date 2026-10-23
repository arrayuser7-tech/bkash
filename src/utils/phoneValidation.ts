import { OperatorInfo, PhoneValidationResult } from '../types';

export const BD_OPERATORS: Record<string, OperatorInfo> = {
  '13': { name: 'Grameenphone', code: 'GP', logoColor: '#00A3E0', bgLight: '#EBF8FE' },
  '17': { name: 'Grameenphone', code: 'GP', logoColor: '#00A3E0', bgLight: '#EBF8FE' },
  '14': { name: 'Banglalink', code: 'BL', logoColor: '#F37021', bgLight: '#FEF4EC' },
  '19': { name: 'Banglalink', code: 'BL', logoColor: '#F37021', bgLight: '#FEF4EC' },
  '18': { name: 'Robi', code: 'ROBI', logoColor: '#E4002B', bgLight: '#FEECF0' },
  '16': { name: 'Airtel', code: 'AIR', logoColor: '#EE2737', bgLight: '#FEECED' },
  '15': { name: 'Teletalk', code: 'TT', logoColor: '#009540', bgLight: '#ECF9F1' },
};

/**
 * Validates and formats a Bangladesh mobile phone number.
 * Standard format: 11 digits starting with 01[3-9] or 10 digits starting with 1[3-9].
 */
export function validateBDPhoneNumber(input: string): PhoneValidationResult {
  // Strip all non-digit characters
  let digits = input.replace(/\D/g, '');

  // If user included +880 country code at start, strip it
  if (digits.startsWith('880')) {
    digits = digits.slice(3);
  }

  // If user entered 10 digits without leading 0 (e.g. 1712345678), prepend 0 for standard 11-digit representation
  let normalized = digits;
  if (digits.length === 10 && digits.startsWith('1')) {
    normalized = '0' + digits;
  }

  if (normalized.length === 0) {
    return {
      isValid: false,
      rawDigits: '',
      formattedNumber: '',
      maskedNumber: '',
      operator: null,
      errorMessage: null,
    };
  }

  // Detect operator from 2-digit prefix after leading 0
  let operator: OperatorInfo | null = null;
  if (normalized.length >= 3 && normalized.startsWith('01')) {
    const prefix = normalized.substring(1, 3);
    operator = BD_OPERATORS[prefix] || null;
  }

  // Formatting (e.g., 01712-345678 or 01712 345678)
  let formattedNumber = normalized;
  if (normalized.length > 5) {
    formattedNumber = `${normalized.slice(0, 5)} ${normalized.slice(5)}`;
  }

  // Check prefix validity
  if (!normalized.startsWith('01')) {
    return {
      isValid: false,
      rawDigits: normalized,
      formattedNumber,
      maskedNumber: '',
      operator: null,
      errorMessage: 'Number must start with 01 (e.g. 017, 018, 019)',
    };
  }

  if (normalized.length >= 3 && !operator) {
    return {
      isValid: false,
      rawDigits: normalized,
      formattedNumber,
      maskedNumber: '',
      operator: null,
      errorMessage: 'Invalid Bangladesh operator code (valid: 013, 014, 015, 016, 017, 018, 019)',
    };
  }

  if (normalized.length < 11) {
    return {
      isValid: false,
      rawDigits: normalized,
      formattedNumber,
      maskedNumber: '',
      operator,
      errorMessage: `Enter ${11 - normalized.length} more digit${11 - normalized.length === 1 ? '' : 's'} (11 digits required)`,
    };
  }

  if (normalized.length > 11) {
    return {
      isValid: false,
      rawDigits: normalized,
      formattedNumber,
      maskedNumber: '',
      operator,
      errorMessage: 'Number cannot exceed 11 digits',
    };
  }

  // Masked format: +880 17•• ••••78
  const operatorDigits = normalized.slice(1, 3);
  const lastTwo = normalized.slice(-2);
  const maskedNumber = `+880 ${operatorDigits}•• ••••${lastTwo}`;

  return {
    isValid: true,
    rawDigits: normalized,
    formattedNumber: `+880 ${normalized.slice(1, 5)} ${normalized.slice(5)}`,
    maskedNumber,
    operator,
    errorMessage: null,
  };
}
