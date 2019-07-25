const { removeWhiteSpace } = require('../private');

describe('The function removeWhiteSpace', () => {
  it('remove spaces from the end of words.', () => {
    const testData = ['a ', 'b            ', 'c'];
    expect(removeWhiteSpace(testData)).toEqual(['a', 'b', 'c']);
  });

  it('removes tabs from the end of words.', () => {
    const testData = ['aba\t', 'aca', 'bcde\t\t\t\t', 'caad'];
    expect(removeWhiteSpace(testData)).toEqual(['aba', 'aca', 'bcde', 'caad']);
  });

  it('removes carriage returns from the end of words.', () => {
    const testData = ['aba\r', 'aca\r\r\r', 'bcde\r\r\r\r', 'caad'];
    expect(removeWhiteSpace(testData)).toEqual(['aba', 'aca', 'bcde', 'caad']);
  });

  it('leading white space from words.', () => {
    const testData = [' a', '\tb', '\rc'];
    expect(removeWhiteSpace(testData)).toEqual(['a', 'b', 'c']);
  });

  it('does not remove white space within words.', () => {
    const testData = ['a a', 'b\tb', 'c\rc'];
    expect(removeWhiteSpace(testData)).toEqual(['a a', 'b\tb', 'c\rc']);
  });

  it('handles null and undefined values.', () => {
    const testData = ['a a', 'b\tb', 'c\rc', null, undefined];
    expect(removeWhiteSpace(testData)).toEqual(['a a', 'b\tb', 'c\rc', null, undefined]);
  });
});