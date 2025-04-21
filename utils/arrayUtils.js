
function findMax(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }
  return Math.max(...arr);
}

function findMin(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }
  return Math.min(...arr);
}

function removeDuplicates(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Input must be an array");
  }
  return [...new Set(arr)];
}

module.exports = {
  findMax,
  findMin,
  removeDuplicates
}