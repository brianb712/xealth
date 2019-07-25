const { removeDuplicateArrays } = require('../private');

describe('The function removeDuplicateArrays', () => {
  it('returns unique vectors from a list of vectors.', () => {
    const testData = [['a', 'b', 'c', 'e'], ['c', 'd'], ['d', 'f'], ['d', 'e', 'f'], ['d', 'f']];
    expect(removeDuplicateArrays(testData)).toEqual([['a', 'b', 'c', 'e'], ['c', 'd'], ['d', 'f'], ['d', 'e', 'f']]);
  });
});
