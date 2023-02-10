export const sum = (...numbers: number[]): number =>
  numbers.reduce((a, b) => a + b, 0);

export const subtract = (...numbers: number[]): number =>
  numbers.reduce((a, b) => a - b, 0);

export const multiply = (...numbers: number[]): number =>
  numbers.reduce((a, b) => a * b, 1);

export const divide = (...numbers: number[]): number =>
  numbers.reduce((a, b) => a / b, 1);
