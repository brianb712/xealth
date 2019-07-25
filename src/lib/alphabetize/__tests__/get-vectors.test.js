const { getVectors } = require('../private');

describe('The function getVectors', () => {
  it('returns vectors from a collection of words.', () => {
    const testData = ['aa', 'cb'];
    expect(getVectors(testData)).toEqual([['a', 'c']]);
  });

  it('returns multiple vectors from a collection of words.', () => {
    const testData = ['bca', 'aaa', 'acb'];
    expect(getVectors(testData)).toEqual([['b', 'a'], ['a', 'c']]);
  });

  it('returns numerous vectors from a collection of words.', () => {
    const testData = ['abcdef', 'bcdef', 'bdedf', 'cabf', 'eda', 'efd', 'efe', 'effa'];
    expect(getVectors(testData)).toEqual([['a', 'b', 'c', 'e'], ['c', 'd'], ['d', 'f'], ['d', 'e', 'f']]);
  });
});
