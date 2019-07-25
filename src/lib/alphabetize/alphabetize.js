const {
  removeWhiteSpace,
  removeInvalidElements,
  removeDuplicates,
  getUniqueSymbols,
  getVectors,
  removeDuplicateArrays } = require('./private');

/**
 * Recursive brute force method for alphabetizing symbols from an array of alphabetic vectors.
 * @param {array} arrayOfVectors - An array of symbol collections that are in alphabetic order.
 * @param {array} uniqueSymbols - The collection of symbols that need to be alphabetized.
 * @param {number} iterations - Optional parameter that is used to prevent infinite recursion.
 * @returns {array} - An array of symbols in alphabetic order.
 */
const bruteForce = (arrayOfVectors, uniqueSymbols, iterations = 0) => {
  let symbolOrder = uniqueSymbols;
  if (iterations > 1000) throw new Error('Symbol order could not be determined within iteration limit.');

  arrayOfVectors.forEach(vector => {
    vector.forEach((symbol, index) => {
      const locationA = symbolOrder.indexOf(symbol);
      // The order of symbols in symbolOrder must match the order defined in each vector.
      // If this is not the case, swap the mismatching elements and try again.
      for (let i = index + 1; i < vector.length; ++i) {
        const locationB = symbolOrder.indexOf(vector[i]);
        if (locationA > locationB) {
          const newSymbolOrder = [...symbolOrder];
          newSymbolOrder[locationA] = symbolOrder[locationB];
          newSymbolOrder[locationB] = symbolOrder[locationA];
          symbolOrder = bruteForce(arrayOfVectors, newSymbolOrder, iterations + 1);
          break;
        }
      }
    });
  });
  return symbolOrder;
};

/**
 * Takes a list of words in alphabetic order and returns a list of symbols in alphabetic order.
 * @param {array} wordArray - A list of words in alphabetic order.
 * @returns {array} - An array of symbols in alphabetic order.
 */
const alphabetize = (wordArray) => {
  if (!Array.isArray(wordArray)) throw new Error('Word list must be passed as an array of strings.');
  const trimmedWordArray = removeWhiteSpace(wordArray);
  const validWords = removeInvalidElements(trimmedWordArray);
  const uniqueWords = removeDuplicates(validWords);
  if (!uniqueWords.length) throw new Error('Array contains only empty elements.');

  const uniqueSymbols = getUniqueSymbols(uniqueWords);
  if (uniqueSymbols.length > uniqueWords.length) throw new Error('Unsolvable: There are more symbols than words.');

  const alphaVectors = getVectors(uniqueWords);
  const uniqueVectors = removeDuplicateArrays(alphaVectors);

  const symbolOrder = bruteForce(uniqueVectors, uniqueSymbols);
  return symbolOrder;
};

module.exports = {
  bruteForce,
  alphabetize
};
