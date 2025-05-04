import { findMax, findMin, removeDuplicates } from '../arrayUtils';

describe('ArrayUtils', () => {
  const arr = [1,5,3,3];

  describe('findMax', () => {
    it('should return highest number', () => {
      expect(findMax(arr)).toBe(5);
    });

    it('should throw error if input is not array', () => {
      expect(() => findMax(123)).toThrow('Input must be an array');
    });
  });

  describe('findMin', () => {
    it('should return lowest number', () => {
      expect(findMin(arr)).toBe(1);
    });

    it('should throw error if input is not array', () => {
      expect(() => findMin(123)).toThrow('Input must be an array');
    });
  });

  describe('removeDuplicates', () => {
    it('should return unique set', () => {
      expect(removeDuplicates(arr)).toStrictEqual([1,5,3]);
    });

    it('should throw error if input is not array', () => {
      expect(() => removeDuplicates(123)).toThrow('Input must be an array');
    });
  });
});
