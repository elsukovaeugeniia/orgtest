const { validateLuhn } = require('../src/utils/cardValidator');

describe('Card Validator', () => {
  test('valid Visa card', () => {
    expect(validateLuhn('4532015112830366')).toBe(true);
  });

  test('invalid card number', () => {
    expect(validateLuhn('1234567890123456')).toBe(false);
  });

  test('empty string', () => {
    expect(validateLuhn('')).toBe(false);
  });
});
