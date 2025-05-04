import { checkStudentKnowledge } from '../studentKnowledgeCheckerUtil';

describe('studentKnowledgeCheckerUtil', () => {
  const correct = { q1: 'a', q2: 'b', q3: 'c' };

  it('should return true when all answers are correct and keys match', () => {
    const student = { q1: 'a', q2: 'b', q3: 'c' };

    expect(checkStudentKnowledge(student, correct)).toBe(true);
  });

  it('should return false when any answer is incorrect', () => {
    const student = { q1: 'a', q2: 'x', q3: 'c' };

    expect(checkStudentKnowledge(student, correct)).toBe(false);
  });

  it('should return false when keys are different', () => {
    const student = { q1: 'a', q3: 'c', q2: 'b' };

    expect(checkStudentKnowledge(student, correct)).toBe(false);
  });

  it('should return false when number of answers differs', () => {
    const student = { q1: 'a', q2: 'b' };

    expect(checkStudentKnowledge(student, correct)).toBe(false);
  });

  it('should return true when both are empty objects', () => {
    expect(checkStudentKnowledge({}, {})).toBe(true);
  });
});
