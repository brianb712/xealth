const { removeDuplicates } = require('../private');

describe('The function removeDuplicates', () => {
  it('returns unique letters from a row of letters.', () => {
    const testData = ['a', 'a', 'a', 'b', 'c', 'a', 'b', 'c'];
    expect(removeDuplicates(testData)).toEqual(['a', 'b', 'c']);
  });

  it('returns unique words from a list of words.', () => {
    const testData = ['aba', 'aba', 'aca', 'bcde', 'caad', 'caad'];
    expect(removeDuplicates(testData)).toEqual(['aba', 'aca', 'bcde', 'caad']);
  });
});