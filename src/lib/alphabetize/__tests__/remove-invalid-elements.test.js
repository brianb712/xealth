const { removeInvalidElements } = require('../private');

describe('The function removeInvalidElements', () => {
  it('removes empty string elements.', () => {
    const testData = ['a', '', 'b', '', 'c'];
    expect(removeInvalidElements(testData)).toEqual(['a', 'b', 'c']);
  });

  it('removes undefined elements.', () => {
    const testData = ['a', undefined, 'b', 'c'];
    expect(removeInvalidElements(testData)).toEqual(['a', 'b', 'c']);
  });

  it('removes null elements.', () => {
    const testData = ['a', 'b', 'c', null];
    expect(removeInvalidElements(testData)).toEqual(['a', 'b', 'c']);
  });

  it('removes NaN elements.', () => {
    const testData = ['a', 'b', 'c', NaN];
    expect(removeInvalidElements(testData)).toEqual(['a', 'b', 'c']);
  });
});
