function capitalize(str) {
  if (typeof str !== 'string') {
    throw new Error("Input must be a string");
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverseString(str) {
  if (typeof str !== 'string') {
    throw new Error("Input must be a string");
  }
  return str.split('').reverse().join('');
}

function isPalindrome(str) {
  if (typeof str !== 'string') {
    throw new Error("Input must be a string");
  }
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}

module.exports = {
  capitalize,
  reverseString,
  isPalindrome
}
