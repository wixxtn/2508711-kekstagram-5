const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export { getRandomInteger, getRandomArrayElement };

function checkStringLength(len, maxLength) {
  return len >= maxLength;
}

function isPalindrome(str) {
  const cleanedStr = str.replaceAll(' ', '').toLowerCase();
  const reversedStr = cleanedStr.split('').reverse().join('');
  return cleanedStr === reversedStr;
}

function digitsToInteger(input) {
  const str = input.toString();
  let result = '';

  for (const char of str) {
    if (!Number.isNaN(parseInt(char, 10))) {
      result += char;
    }
  }
  const numberResult = parseInt(result, 10);
  return result.length > 0 ? numberResult : NaN;
}

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { checkStringLength, isPalindrome, digitsToInteger, debounce };
