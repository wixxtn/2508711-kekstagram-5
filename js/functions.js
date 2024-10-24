function checkStringLength(len, maxLength){
  return len >= maxLength;
}

function isPalindrome (str){
  const cleanedStr = str.replaceAll(' ', '').toLowerCase;
  const reversedStr = cleanedStr.split('').reverse().join('');
  return cleanedStr === reversedStr;
}

function digitsToInteger(input) {
 const str = input.toString();
 let result = '';

 for (let char of str) {
   if (!Number.isNaN(parseInt(char))) {
     result += char;
   }
 }
 const numberResult = parseInt(result);
 return result.length > 0 ? numberResult : NaN;
}
