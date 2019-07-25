/**
 * Removes leading and trailing white space for each word in an array.
 * @param {array} wordList - A list of words.
 * @returns {array} - A list of words with leading and trailing white space removed.
 */
const removeWhiteSpace = wordList => wordList.map(word => word && word.trim());

/**
 * Removes elements from an array that are null, undefined, empty strings, or NaN.
 * @param {array} wordList - A list of words.
 * @returns {array} - A list of words with null, undefined, empty string and NaN elements removed.
 */
const removeInvalidElements = wordList => {
  return wordList.filter(word => word !== '' && word !== undefined && word !== null && !Number.isNaN(word));
};

/**
 * Removes duplicate elements from an array of strings.
 * @param {array} elementArray - Array of strings.
 * @returns {array} - An array of strings with duplicate elements removed.
 */
const removeDuplicates = elementArray => {
  return elementArray.filter((element, index) => elementArray.indexOf(element) === index);
};

/**
 * Returns an array of all unique symbols in a collection of words.
 * @param {array} wordList - A list of words.
 * @returns {array} - A list of unique symbols.
 */
const getUniqueSymbols = wordList => {
  const uniqueSymbols = [];
  wordList.forEach(word => {
    [...word].forEach(symbol => {
      if (!uniqueSymbols.includes(symbol)) uniqueSymbols.push(symbol);
    });
  });
  return uniqueSymbols;
};

/**
 * Collect words that start with the same symbol.
 * @param {array} wordList - A list of words.
 * @returns {array} - An array of arrays.
 */
const groupWords = wordList => {
  const groupedWords = [];
  let nextGroup = [];
  for (let index = 0; index < wordList.length - 1; ++index) {
    if (wordList[index].charAt(0) === wordList[index + 1].charAt(0)) {
      if (!nextGroup.includes(wordList[index])) nextGroup.push(wordList[index]);
      nextGroup.push(wordList[index + 1]);
    } else if (nextGroup.length) {
      groupedWords.push(nextGroup);
      nextGroup = [];
    }
  }

  if (nextGroup.length) groupedWords.push(nextGroup);
  return groupedWords;
};

/**
 * Removes the first character from each element in an array.
 * @param {array} wordList - A list of words.
 * @returns {array} - A list of words with the first character removed.
 */
const getSubmatrices = wordList => {
  return wordList.map(words => words.map(word => word.slice(1)));
};

/**
 * Returns the alphabetically ordered vectors within an alphabetic matrix of words.
 * @param {array} matrix - An array of words in alphabetic order.
 * @returns {array} - An array of alphabetically ordered symbols.
 */
const getVectors = matrix => {
  const arrayOfVectors = [];
  const columnVector = matrix.map(word => word.charAt(0));

  arrayOfVectors.push(removeDuplicates(columnVector));

  const newVectors = groupWords(matrix);
  const subMatrices = getSubmatrices(newVectors);

  subMatrices.forEach(subMatrix => {
    getVectors(subMatrix).forEach(vector => {
      arrayOfVectors.push(removeDuplicates(vector));
    });
  });

  return arrayOfVectors;
};

/**
 * Removes duplicate elements from an array.
 * @param {array} arrayOfArrays
 * @returns {array} - An array of arrays with duplicate arrays removed.
 */
const removeDuplicateArrays = arrayOfArrays => {
  return Array.from(new Set(arrayOfArrays.map(JSON.stringify)), JSON.parse);
};

module.exports = {
  removeWhiteSpace,
  removeInvalidElements,
  removeDuplicates,
  getUniqueSymbols,
  groupWords,
  getSubmatrices,
  getVectors,
  removeDuplicateArrays
};
