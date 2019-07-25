const { getSubmatrices } = require('../private');

describe('The function getSubmatrices', () => {
  it('removes the first character from each element of an array.', () => {
    const testData = [['abb', 'aba']];
    expect(getSubmatrices(testData)).toEqual([['bb', 'ba']]);
  });

  it('removes the first character from each element of each array.', () => {
    const testData = [['aaa', 'acb'], ['cab', 'ccc']];
    expect(getSubmatrices(testData)).toEqual([['aa', 'cb'], ['ab', 'cc']]);
  });
});
