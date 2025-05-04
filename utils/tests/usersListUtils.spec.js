import { filterUsersByAge, sortUsersByName, findUserById, isEmailTaken } from '../usersListUtils';

describe('User Utils', () => {
  const users = [
    { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
    { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
    { id: 3, name: 'Charlie', age: 22, email: 'charlie@example.com' },
    { id: 4, name: 'Dave', age: 40, email: 'dave@example.com' },
  ];

  describe('filterUsersByAge', () => {
    it('should return users within the specified age range', () => {
      const result = filterUsersByAge(users, 24, 35);

      expect(result).toStrictEqual([
        { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
        { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
      ]);
    });

    it('should return an empty array if no users match the range', () => {
      expect(filterUsersByAge(users, 10, 20)).toStrictEqual([]);
    });

    it('should throw an error if input is not an array', () => {
      expect(() => filterUsersByAge(null, 20, 30)).toThrow('Users must be an array');
    });
  });

  describe('sortUsersByName', () => {
    it('should return users sorted alphabetically by name', () => {
      const result = sortUsersByName(users);

      expect(result.map(u => u.name)).toStrictEqual(['Alice', 'Bob', 'Charlie', 'Dave']);
    });

    it('should not mutate the original array', () => {
      const original = [...users];

      sortUsersByName(users);

      expect(users).toStrictEqual(original);
    });

    it('should throw an error if input is not an array', () => {
      expect(() => sortUsersByName('invalid')).toThrow('Users must be an array');
    });
  });

  describe('findUserById', () => {
    it('should return the user with the specified id', () => {
      expect(findUserById(users, 2)).toStrictEqual({ id: 2, name: 'Bob', age: 30, email: 'bob@example.com' });
    });

    it('should return null if user is not found', () => {
      expect(findUserById(users, 999)).toBeNull();
    });

    it('should throw an error if input is not an array', () => {
      expect(() => findUserById({}, 1)).toThrow('Users must be an array');
    });
  });

  describe('isEmailTaken', () => {
    it('should return true if email exists in the list', () => {
      expect(isEmailTaken(users, 'alice@example.com')).toBe(true);
    });

    it('should return false if email does not exist', () => {
      expect(isEmailTaken(users, 'nobody@example.com')).toBe(false);
    });

    it('should throw an error if input is not an array', () => {
      expect(() => isEmailTaken('not array', 'test@example.com')).toThrow('Users must be an array');
    });
  });
});
