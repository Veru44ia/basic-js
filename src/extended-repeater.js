const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  if (typeof str !== "string") {
    str = String(str);
  }

  const addition =
    typeof options.addition !== "undefined" ? options.addition : "";
  const separator =
    typeof options.separator !== "undefined" ? options.separator : "+";
  const additionSeparator =
    typeof options.additionSeparator !== "undefined"
      ? options.additionSeparator
      : "|";
  const repeatTimes =
    typeof options.repeatTimes !== "undefined" ? options.repeatTimes : 1;
  const additionRepeatTimes =
    typeof options.additionRepeatTimes !== "undefined"
      ? options.additionRepeatTimes
      : 1;

  return (
    str +
    (addition + additionSeparator)
      .repeat(additionRepeatTimes)
      .slice(0, -additionSeparator.length) +
    separator
  )
    .repeat(repeatTimes)
    .slice(0, -separator.length);
}

module.exports = {
  repeater,
};
