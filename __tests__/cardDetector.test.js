const { detectCardType, getCardType } = require('../src/utils/cardDetector');

describe('Card Detector (BIN detection)', () => {
  test('detects Visa', () => {
    const result = detectCardType('4532015112830366');
    expect(result.type).toBe('Visa');
    expect(result.iconId).toBe('visa');
  });

  test('detects Mastercard', () => {
    expect(detectCardType('5555555555554444').type).toBe('Mastercard');
    expect(detectCardType('2221123456789012').type).toBe('Mastercard');
  });

  test('detects American Express', () => {
    const result = detectCardType('378282246310005');
    expect(result.type).toBe('American Express');
    expect(result.iconId).toBe('amex');
  });

  test('detects Мир', () => {
    const result = detectCardType('2200123456789012');
    expect(result.type).toBe('Мир');
    expect(result.iconId).toBe('mir');
  });

  test('detects Discover', () => {
    expect(detectCardType('6011111111111117').type).toBe('Discover');
    expect(detectCardType('6555555555554442').type).toBe('Discover');
  });

  test('detects JCB', () => {
    expect(detectCardType('3530111333300000').type).toBe('JCB');
    expect(detectCardType('3566002020360505').type).toBe('JCB');
  });

  test('detects UnionPay', () => {
    expect(detectCardType('6221260000000000').type).toBe('UnionPay');
    expect(detectCardType('6250943000000016').type).toBe('UnionPay');
  });

  test('returns Unknown for invalid BIN', () => {
    const result = detectCardType('9999123456781234');
    expect(result.type).toBe('Unknown');
    expect(result.iconId).toBeNull();
  });

  test('handles empty input', () => {
    const result = detectCardType('');
    expect(result.type).toBe('Unknown');
    expect(result.iconId).toBeNull();
  });

  test('handles non-numeric input', () => {
    const result = detectCardType('abc123');
    expect(result.type).toBe('Unknown');
    expect(result.iconId).toBeNull();
  });

  test('correctly identifies card with spaces', () => {
    const result = detectCardType('4532 0151 1283 0366');
    expect(result.type).toBe('Visa');
    expect(result.iconId).toBe('visa');
  });

  // Тест обратной совместимости
  test('getCardType returns only type name (legacy)', () => {
    expect(getCardType('2200123456789012')).toBe('Мир');
    expect(getCardType('9999123456781234')).toBe('Unknown');
  });
});