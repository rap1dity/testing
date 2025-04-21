const { add, subtract, multiply, divide } = require('../mathUtils');

describe('mathUtils', () => {
  const a = 10, b = 5;

  it('add should return the sum of two numbers', () => {
    expect(add(a, b)).toBe(15);
  });

  it('subtract should return the difference between two numbers', () => {
    expect(subtract(a, b)).toBe(5);
  });

  it('multiply should return the product of two numbers', () => {
    expect(multiply(a, b)).toStrictEqual(50);
  });

  describe('divide', () => {
    it('should return the result of dividing the first number by the second', () => {
      expect(divide(a, b)).toBe(2);
    });

    it('should handle division by zero', () => {
      expect(() => divide(a, 0)).toThrow('Cannot divide by zero');
    });
  })
})