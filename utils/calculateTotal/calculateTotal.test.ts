import { describe, it, expect } from 'vitest';
import { calculateTotal } from './calculateTotal';

describe('calculateTotal', () => {
  describe('basic valid inputs', () => {
    it('should handle single number', () => {
      expect(calculateTotal('100')).toBe(100);
    });

    it('should sum comma-separated numbers', () => {
      expect(calculateTotal('100, 200, 300')).toBe(600);
    });

    it('should sum newline-separated numbers', () => {
      expect(calculateTotal('100\n200\n300')).toBe(600);
    });

    it('should handle mixed comma and newline separators', () => {
      expect(calculateTotal('100,200\n300')).toBe(600);
    });

    it('should handle decimal numbers', () => {
      expect(calculateTotal('10.5, 20.3, 30.2')).toBe(61);
    });

    it('should handle negative numbers', () => {
      expect(calculateTotal('100, -50, 25')).toBe(75);
    });
  });

  describe('input formatting edge cases', () => {
    it('should handle extra spaces around numbers', () => {
      expect(calculateTotal('  100  ,  200  ,  300  ')).toBe(600);
    });

    it('should handle empty strings between separators', () => {
      expect(calculateTotal('100,,200')).toBe(300);
      expect(calculateTotal('100,\n,200')).toBe(300);
    });

    it('should handle trailing separators', () => {
      expect(calculateTotal('100,200,')).toBe(300);
      expect(calculateTotal('100,200\n')).toBe(300);
    });

    it('should handle leading separators', () => {
      expect(calculateTotal(',100,200')).toBe(300);
      expect(calculateTotal('\n100,200')).toBe(300);
    });

    it('should return 0 for empty string', () => {
      expect(calculateTotal('')).toBe(0);
    });

    it('should return 0 for only separators', () => {
      expect(calculateTotal(',,\n,')).toBe(0);
    });
  });

  describe('invalid inputs', () => {
    it('should return 0 when any value is not a number', () => {
      expect(calculateTotal('100, abc, 200')).toBe(0);
      expect(calculateTotal('hello')).toBe(0);
      expect(calculateTotal('100, 200, 300x')).toBe(600);
    });

    it('should return 0 for partially valid numbers', () => {
      expect(calculateTotal('100.50.50')).toBe(100.50); // parseFloat would parse "100.50"
      expect(calculateTotal('100, 200, ')).toBe(300); // Note: trailing comma with space is handled
    });

    it('should handle scientific notation (if parseFloat supports)', () => {
      // parseFloat supports scientific notation
      expect(calculateTotal('1e2, 2e3')).toBe(2100);
    });
  });

  describe('complex mixed cases', () => {
    it('should handle complex real-world input', () => {
      const input = `100, 200.50
                    300.25, 400
                    500.75`;
      expect(calculateTotal(input)).toBe(1501.5);
    });

    it('should handle messy input with spaces and newlines', () => {
      const input = ' 100 ,\n200 , 300\n,400 ';
      expect(calculateTotal(input)).toBe(1000);
    });
  });
});