const { groupWords } = require('../private');

describe('The function groupWords', () => {
  it('returns an array of arrays grouped by start symbol.', () => {
    const testData = ['aaa', 'acb'];
    expect(groupWords(testData)).toEqual([['aaa', 'acb']]);
  });

  it('returns an array of arrays grouped by multiple start symbols.', () => {
    const testData = ['bca', 'aaa', 'acb', 'cab', 'ccc'];
    expect(groupWords(testData)).toEqual([['aaa', 'acb'], ['cab', 'ccc']]);
  });
});
