import { add } from '../index.js';

describe('add()', () => {
  it('Should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
