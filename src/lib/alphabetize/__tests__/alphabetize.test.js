const { alphabetize } = require('../alphabetize');

describe('The function alphabetize', () => {
  it('returns letters in order (does not support right to left languages).', () => {
    const testData = ['ab', 'ba', 'ca', 'dc', 'ee', 'fa', 'gfa', 'hab'];
    expect(alphabetize(testData)).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
  });

  it('returns letters and symbols in order.', () => {
    const testData = ['a!', '!a', '*a', 'd*', 'ee', 'fa', '&fa', '-a!'];
    expect(alphabetize(testData)).toEqual(['a', '!', '*', 'd', 'e', 'f', '&', '-']);
  });

  it('disregards white space.', () => {
    const testData = ['\tb ', '\ra   ', '   c \t\t'];
    expect(alphabetize(testData)).toEqual(['b', 'a', 'c']);
  });

  it('disregards empty, white space only, null , NaN and undefined elements.', () => {
    const testData = ['', 'b', null, 'a', undefined, 'c', ' \t\r   ', NaN];
    expect(alphabetize(testData)).toEqual(['b', 'a', 'c']);
  });

  it('solves a complex word list.', () => {
    const testData = ['aabce', 'cda', 'ead', 'ecb', 'ecc', 'edad', 'edae', 'edb', 'ede'];
    expect(alphabetize(testData)).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  it('solves a more complex word list.', () => {
    const testData = ['afffff', 'bcfff', 'bdedf', 'cabf', 'eda', 'efd', 'efe', 'eff', 'eff'];
    expect(alphabetize(testData)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('handles words of many different lengths.', () => {
    const testData = [
      'a',
      'aa',
      'afffff',
      'bcfff',
      'bdedf',
      'bdedfa',
      'cabf',
      'eda',
      'efd',
      'efe',
      'eff',
      'eff',
      'efffffffffffffffff',
    ];
    expect(alphabetize(testData)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('handles repeated words.', () => {
    const testData = [
      'afffff',
      'afffff',
      'afffff',
      'bcfff',
      'bdedf',
      'cabf',
      'cabf',
      'eda',
      'efd',
      'efd',
      'efd',
      'efd',
      'efd',
      'efd',
      'efe',
      'eff',
      'eff',
    ];
    expect(alphabetize(testData)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('handles international characters.', () => {
    const testData = ['ââÑcê', 'cÐâ', 'êâÐ', 'êcÑ', 'êcc', 'êÐâÐ', 'êÐâê', 'êÐÑ', 'êÐê'];
    expect(alphabetize(testData)).toEqual(['â', 'Ñ', 'c', 'Ð', 'ê']);
  });

  it('handles capital letters.', () => {
    const testData = ['AABCE', 'CDA', 'EAD', 'ECB', 'ECC', 'EDAD', 'EDAE', 'EDB', 'EDE'];
    expect(alphabetize(testData)).toEqual(['A', 'B', 'C', 'D', 'E']);
  });

  it('handles numbers as strings.', () => {
    const testData = ['11235', '341', '514', '532', '533', '5414', '5415', '542', '545'];
    expect(alphabetize(testData)).toEqual(['1', '2', '3', '4', '5']);
  });

  it('does not mutate parameter that is passed.', () => {
    const testData = ['b ', 'a ', 'c '];
    const result = alphabetize(testData);

    expect(result).toEqual(['b', 'a', 'c']);
    expect(testData).toEqual(['b ', 'a ', 'c ']);
  });

  it('does not support hyphenated words (treats hyphen as any other symbol).', () => {
    const testData = ['bbb-aaa', 'aaa-bbb', 'cccc', 'ccc-'];

    expect(alphabetize(testData)).toEqual(['b', 'a', 'c', '-']);
  });

  it('throws an exception if numbers are passed as numbers.', () => {
    const testData = [11235, 341, 514, 532, 533, 5414, 5415, 542, 545];
    let didThrow = false;
    try {
      alphabetize(testData);
    } catch {
      didThrow = true;
    }
    expect(didThrow).toEqual(true);
  });

  it('throws an exception if a string is passed.', () => {
    const testData = 'a';
    let didThrow = false;
    try {
      alphabetize(testData);
    } catch {
      didThrow = true;
    }
    expect(didThrow).toEqual(true);
  });

  it('throws an exception if an object is passed.', () => {
    const testData = { wordList: ['ab', 'ba', 'ca', 'dc', 'ee', 'fa', 'gfa', 'hab'] };
    let didThrow = false;
    try {
      alphabetize(testData);
    } catch {
      didThrow = true;
    }
    expect(didThrow).toEqual(true);
  });

  it('throws an exception if an array of objects is passed.', () => {
    const testData = [{ word: 'ab' }, { word: 'ba' }, { word: 'ca' }, { word: 'dc' }, { word: 'ee' }];
    let didThrow = false;
    try {
      alphabetize(testData);
    } catch {
      didThrow = true;
    }
    expect(didThrow).toEqual(true);
  });

  it('throws an exception if there are more symbols than words.', () => {
    const testData = ['afffff', 'bcfff', 'bdedf', 'cabf'];
    let didThrow = false;
    try {
      alphabetize(testData);
    } catch {
      didThrow = true;
    }
    expect(didThrow).toEqual(true);
  });

  it('treats uppercase and lowercase as different symbols.', () => {
    const testData = ['bca', 'aaa', 'ACB'];
    let didThrow = false;
    try {
      alphabetize(testData);
    } catch {
      didThrow = true;
    }
    expect(didThrow).toEqual(true);
  });

  it('does not handle contractions (apostrophe is treated as a different symbol).', () => {
    const testData = ['ant', 'can\'t', 'nat', 'tac'];
    let didThrow = false;
    try {
      alphabetize(testData);
    } catch {
      didThrow = true;
    }
    expect(didThrow).toEqual(true);
  });

  it('throws an exception if only empty, null or undefined elements are passed.', () => {
    const testData = [null, undefined, '', ''];
    let didThrow = false;
    try {
      alphabetize(testData);
    } catch {
      didThrow = true;
    }
    expect(didThrow).toEqual(true);
  });

  it('throws an exception if an array of arrays is passed.', () => {
    const testData = [['abc'], ['bac'], ['cab']];
    let didThrow = false;
    try {
      alphabetize(testData);
    } catch {
      didThrow = true;
    }
    expect(didThrow).toEqual(true);
  });

  it('BUG: does not detect a contridiction in word order.', () => {
    const testData = ['abc', 'bac', 'abcc'];
    expect(alphabetize(testData)).toEqual(['a', 'b', 'c']);
  });

  it('TODEFINE: does not handle internal white space.', () => {
    const testData = ['abc', 'bac', 'bac a', 'bac b', 'bac c'];
    expect(alphabetize(testData)).toEqual(['a', 'b', 'c', ' ']);
  });

  it('handles very large words.', () => {
    const testData = [
      'afffffafafafafafafadafadafadffdbdbdfa',
      'bcfffdededdadaaaabbbababaccdcdedfdfdedfcdba',
      'bdedfcbdedadecbdceda',
      'cabfabcdefdefedfedefd',
      'edadbdbdbcbdbcbdbcbdbcbdbcdadeadaacabacabd',
      'efdcedbdaa',
      'efe',
      'eff',
      'eff',
    ];
    expect(alphabetize(testData)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('handles a large collection of words.', () => {
    const testData = [
      'able',
      'access',
      'adverb',
      'almanac',
      'alphabetize',
      'antenna',
      'axiom',
      'block',
      'breathe',
      'bump',
      'candle',
      'carton',
      'centrifuge',
      'cicuit',
      'coil',
      'computational',
      'computer',
      'demolish',
      'diffuse',
      'dresser',
      'enroll',
      'enrolled',
      'enrolls',
      'execute',
      'flotsam',
      'goat',
      'golgi',
      'hour',
      'house',
      'inch',
      'incline',
      'instrument',
      'jar',
      'jazz',
      'kilt',
      'kind',
      'lament',
      'lamentations',
      'light',
      'mangrove',
      'mantle',
      'meter',
      'mollusk',
      'nourish',
      'offer',
      'open',
      'process',
      'quilt',
      'race',
      'rampant',
      'restore',
      'rise',
      'scuttle',
      'self',
      'shoe',
      'square',
      'talk',
      'toe',
      'upper',
      'vein',
      'vole',
      'water',
      'well',
      'xealth',
      'xeno',
      'yard',
      'yellow',
      'zero',
    ];
    const expectedResult = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
    expect(alphabetize(testData)).toEqual(expectedResult);
  });

  it('handles a large, complex collection of words and symbols.', () => {
    const testData = [
      "!",
      "@email",
      "#number",
      "$10",
      "%5",
      "^",
      "&amp",
      "*2",
      "()",
      ")(",
      "123",
      "21",
      "345",
      "45",
      "5",
      "678",
      "7",
      "8",
      "999",
      "00",
      "able",
      "access",
      "adverb",
      "almanac",
      "alphabetize",
      "antenna",
      "apend",
      "aqua",
      "axiom",
      "block",
      "breathe",
      "bump",
      "candle",
      "carton",
      "centrifuge",
      "cicuit",
      "coil",
      "computational",
      "computer",
      "demolish",
      "diffuse",
      "dresser",
      "enroll",
      "enrolled",
      "enrolls",
      "execute",
      "flotsam",
      "goat",
      "golgi",
      "hour",
      "house",
      "inch",
      "incline",
      "instrument",
      "jar",
      "jazz",
      "kilt",
      "kind",
      "lament",
      "lamentations",
      "light",
      "mangrove",
      "mantle",
      "meter",
      "mollusk",
      "offer",
      "omni",
      "only",
      "ooze",
      "open",
      "orange",
      "quilt",
      "race",
      "rampant",
      "restore",
      "rise",
      "scuttle",
      "self",
      "shoe",
      "square",
      "stalk",
      "suppose",
      "svelt",
      "swanky",
      "take",
      "well",
      "xealth",
      "xeno",
      "yard",
      "yellow",
      "zero",
    ];
    const expectedResult = [
      '!',
      '@',
      '#',
      '$',
      '%',
      '^',
      '&',
      '*',
      '(',
      ')',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
    expect(alphabetize(testData)).toEqual(expectedResult);
  });

  it('thows an exception if iteration limit is reached (due to alphabetic order conflict).', () => {
    const testData = [
      'able',
      'access',
      'adverb',
      'almanac',
      'alphabetize',
      'antenna',
      'axiom',
      'block',
      'breathe',
      'bump',
      'candle',
      'carton',
      'centrifuge',
      'cicuit',
      'coil',
      'computational',
      'computer',
      'demolish',
      'diffuse',
      'dresser',
      'enroll',
      'enrolled',
      'enrolls',
      'execute',
      'flotsam',
      'goat',
      'golgi',
      'hour',
      'house',
      'inch',
      'incline',
      'instrument',
      'jar',
      'jazz',
      'kind',
      'kilt',
      'lament',
      'lamentations',
      'light',
      'mangrove',
      'mantle',
      'meter',
      'mollusk',
      'nourish',
      'offer',
      'open',
      'process',
      'quilt',
      'race',
      'rampant',
      'restore',
      'rise',
      'scuttle',
      'self',
      'shoe',
      'square',
      'talk',
      'toe',
      'upper',
      'vein',
      'vole',
      'water',
      'well',
      'xealth',
      'xeno',
      'yard',
      'yellow',
      'zero',
    ];

    let didThrow = false;
    try {
      alphabetize(testData);
    } catch {
      didThrow = true;
    }
    expect(didThrow).toEqual(true);
  });
});
