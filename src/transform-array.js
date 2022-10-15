const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (Array.isArray(arr)) {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
      if (
        (arr[i] === "--discard-next" && !arr[i + 1]) ||
        (arr[i] === "--discard-prev" && i === 0) ||
        (arr[i] === "--double-next" && !arr[i + 1]) ||
        (arr[i] === "--double-prev" && i === 0)
      ) {
        continue;
      } else if (arr[i] === "--discard-next" && arr[i + 1]) {
        arr.splice(arr[i + 1], 1);
      } else if (arr[i] === "--discard-prev" && i !== 0) {
        res.pop();
      } else if (arr[i] === "--double-next" && arr[i + 1]) {
        res.push(arr[i + 1]);
      } else if (arr[i] === "--double-prev" && i !== 0) {
        res.push(arr[i - 1]);
      } else if (
        arr[i + 1] === "--double-prev" &&
        arr[i - 1] === "--discard-next"
      ) {
        arr.splice(arr[i + 1], 1);
      } else {
        res.push(arr[i]);
      }
    }
    return res;
  } else {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
}

module.exports = {
  transform,
};
