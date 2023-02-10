import { divide, multiply, subtract, sum } from '#/math.js';
import { describe, expect, test } from 'vitest';

describe('Math', () => {
  describe('sum', () => {
    test('should return the sum of the given numbers', () => {
      expect(sum(1, 2, 3)).toEqual(6);
    });
  });

  describe('subtract', () => {
    test('should return the difference of the given numbers', () => {
      expect(subtract(1, 2, 3)).toEqual(-6);
    });
  });

  describe('multiply', () => {
    test('should return the product of the given numbers', () => {
      expect(multiply(1, 2, 3)).toEqual(6);
    });
  });

  describe('divide', () => {
    test('should return the quotient of the given numbers', () => {
      expect(divide(1, 2, 3)).toEqual(1 / 6);
    });
  });
});
