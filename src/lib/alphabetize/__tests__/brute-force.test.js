const { bruteForce } = require('../alphabetize');

describe('The function bruteForce', () => {
  it('returns ordered symbols from a collection of alphabetic order vectors when initial order is already correct.', () => {
    const testData = [['a', 'b', 'c', 'e'], ['c', 'd'], ['d', 'f'], ['d', 'e', 'f']];
    const uniqueSymbols = ['a', 'b', 'c', 'e', 'd', 'f'];
    expect(bruteForce(testData, uniqueSymbols)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('returns ordered symbols from a collection of alphabetic order vectors when initial order is almost correct.', () => {
    const testData = [['a', 'b', 'c', 'e'], ['c', 'd'], ['d', 'f'], ['d', 'e', 'f']];
    const uniqueSymbols = ['b', 'a', 'e', 'f', 'd', 'c'];
    expect(bruteForce(testData, uniqueSymbols)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('returns ordered symbols from a collection of alphabetic order vectors when initial order is not correct.', () => {
    const testData = [['a', 'b', 'c', 'e'], ['c', 'd'], ['d', 'f'], ['d', 'e', 'f']];
    const uniqueSymbols = ['f', 'e', 'b', 'a', 'd', 'c'];
    expect(bruteForce(testData, uniqueSymbols)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });
});
