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

    // Normalize text: lowercase, remove special chars, remove repeated letters
    const normalizedText = this.normalizeText(text);

    // Check if any profanity word is in the normalized text
    return !PROFANITY_LIST.some((word) => {
      const normalizedWord = this.normalizeText(word);

      // Check if normalized word appears in normalized text
      // This catches: puta, putaaa, p.u.t.a, p-u-t-a, etc.
      return normalizedText.includes(normalizedWord);
    });
  }

  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-záéíóúñ]/g, '') // Remove all non-letter chars (spaces, dots, hyphens, etc)
      .replace(/(.)\1+/g, '$1'); // Replace repeated letters with single letter (aaa -> a)
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
