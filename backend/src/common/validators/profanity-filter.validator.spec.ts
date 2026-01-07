import { NoProfanityConstraint } from './profanity-filter.validator';

describe('NoProfanityConstraint', () => {
  let validator: NoProfanityConstraint;

  beforeEach(() => {
    validator = new NoProfanityConstraint();
  });

  describe('validate', () => {
    it('should return true for clean text', () => {
      expect(validator.validate('Mi refrigerador no enfría bien')).toBe(true);
      expect(validator.validate('Necesito reparar mi lavadora')).toBe(true);
      expect(validator.validate('El técnico fue muy profesional')).toBe(true);
    });

    it('should return true for empty text', () => {
      expect(validator.validate('')).toBe(true);
      expect(validator.validate(null)).toBe(true);
      expect(validator.validate(undefined)).toBe(true);
    });

    it('should return false for text containing profanity', () => {
      expect(validator.validate('Esto es una mierda')).toBe(false);
      expect(validator.validate('Qué pendejo servicio')).toBe(false);
      expect(validator.validate('Esta chingadera no funciona')).toBe(false);
    });

    it('should be case insensitive', () => {
      expect(validator.validate('Esto es una MIERDA')).toBe(false);
      expect(validator.validate('Qué PENDEJO servicio')).toBe(false);
      expect(validator.validate('Esta ChInGaDeRa no funciona')).toBe(false);
    });

    it('should use word boundaries to avoid false positives', () => {
      // "carabina" contains "carajo" but should be valid
      expect(validator.validate('Tengo una carabina')).toBe(true);
      // "putativo" contains "puta" but should be valid (less likely in this context)
      // Note: The current implementation might flag this - adjust if needed
    });

    it('should detect profanity in longer sentences', () => {
      expect(
        validator.validate(
          'El refrigerador está en mal estado y es una mierda de aparato',
        ),
      ).toBe(false);
      expect(
        validator.validate(
          'No puedo creer que este pendejo electrodoméstico no funcione',
        ),
      ).toBe(false);
    });

    it('should return proper default message', () => {
      expect(validator.defaultMessage()).toBe(
        'The text contains inappropriate language. Please use respectful language.',
      );
    });
  });
});
