const { capitalize, reverseString, isPalindrome } = require('../stringUtils');

describe('stringUtils', () => {
  describe('capitalize', () => {
    it('should return string with first letter capitalized', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should throw error if input is not a string', () => {
      expect(() => capitalize(123)).toThrow('Input must be a string');
    });
  });

  describe('reverseString', () => {
    it('should return reversed string', () => {
      expect(reverseString('hello')).toBe('olleh');
    });

    it('should throw error if input is not a string', () => {
      expect(() => reverseString(null)).toThrow('Input must be a string');
    });
  });

  describe('isPalindrome', () => {
    it('should return true for palindrome string', () => {
      expect(isPalindrome('racecar')).toBe(true);
    });

    it('should return false for non-palindrome string', () => {
      expect(isPalindrome('hello')).toBe(false);
    });

    it('should throw error if input is not a string', () => {
      expect(() => isPalindrome(true)).toThrow('Input must be a string');
    });
  });
})