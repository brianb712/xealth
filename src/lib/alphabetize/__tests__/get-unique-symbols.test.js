const { getUniqueSymbols } = require('../private');

describe('The function getUniqueSymbols', () => {
  it('returns unique letters from a basic collection of words.', () => {
    const testData = ['bca', 'aaa', 'acb'];
    expect(getUniqueSymbols(testData)).toEqual(['b', 'c', 'a']);
  });

  it('returns unique symbols from a collection of words.', () => {
    const testData = ['a!!!!!!', 'bc!!!', 'bded!', 'cab!', 'eda', 'e!d', 'e!e', 'e!!', 'e!!'];
    expect(getUniqueSymbols(testData)).toEqual(['a', '!', 'b', 'c', 'd', 'e']);
  });
});