import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// List of prohibited words in Spanish
const PROFANITY_LIST = [
  // Common profanity in Spanish
  'puta',
  'puto',
  'pendejo',
  'pendeja',
  'cabron',
  'cabrón',
  'chinga',
  'chingada',
  'chingadera',
  'chingar',
  'mierda',
  'verga',
  'carajo',
  'joder',
  'coño',
  'cojones',
  'hijo de puta',
  'hija de puta',
  'mamada',
  'pinche',
  'culero',
  'culera',
  'ojete',
  'pendejada',
  // Add more as needed
];

@ValidatorConstraint({ name: 'NoProfanity', async: false })
export class NoProfanityConstraint implements ValidatorConstraintInterface {
  validate(text: string): boolean {
    if (!text) return true; // Empty text is valid

    const normalizedText = text.toLowerCase();

    // Check if any profanity word is in the text
    return !PROFANITY_LIST.some((word) => {
      // Use word boundaries to avoid false positives
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      return regex.test(normalizedText);
    });
  }

  defaultMessage(): string {
    return 'The text contains inappropriate language. Please use respectful language.';
  }
}

export function NoProfanity(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: NoProfanityConstraint,
    });
  };
}
