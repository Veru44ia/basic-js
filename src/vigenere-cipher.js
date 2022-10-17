const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(type = true) {
    this.type = type;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error("Incorrect arguments!");
    }
    const messageStr = message.toUpperCase();
    const messageArr = message.toUpperCase().split("");
    const keyArr = key.padEnd(messageArr.length, key).toUpperCase().split("");

    const res = [];
    for (let i = 0; i < messageArr.length; i++) {
      if (!messageArr[i].match(/[A-Z]/)) {
        res.push(messageArr[i]);
      } else {
        res.push(keyArr.shift());
      }
    }
    const keyStr = res.join("");

    let res1 = [];
    for (let i = 0; i < messageStr.length; i++) {
      if (messageStr[i].match(/[A-Z]/)) {
        if (messageStr.charCodeAt(i) - 65 + keyStr.charCodeAt(i) - 65 >= 26) {
          res1.push(
            messageStr.charCodeAt(i) - 65 + keyStr.charCodeAt(i) - 65 - 26
          );
        } else {
          res1.push(messageStr.charCodeAt(i) - 65 + keyStr.charCodeAt(i) - 65);
        }
      } else {
        res1.push(messageStr[i]);
      }
    }

    const result = [];
    for (let i = 0; i < res1.length; i++) {
      if (typeof res1[i] === "number") {
        result.push(String.fromCharCode(res1[i] + 65));
      } else {
        result.push(res1[i]);
      }
    }

    if (this.type) {
      return result.join("");
    } else {
      return result.reverse().join("");
    }
  }
  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error("Incorrect arguments!");
    }
    const messageStr = encryptedMessage.toUpperCase();
    const messageArr = encryptedMessage.toUpperCase().split("");
    const keyArr = key.padEnd(messageArr.length, key).toUpperCase().split("");

    const res = [];
    for (let i = 0; i < messageArr.length; i++) {
      if (!messageArr[i].match(/[A-Z]/)) {
        res.push(messageArr[i]);
      } else {
        res.push(keyArr.shift());
      }
    }
    const keyStr = res.join("");

    let res1 = [];
    for (let i = 0; i < messageStr.length; i++) {
      if (messageStr[i].match(/[A-Z]/)) {
        if (messageStr.charCodeAt(i) - 65 - (keyStr.charCodeAt(i) - 65) < 0) {
          res1.push(
            messageStr.charCodeAt(i) - 65 - (keyStr.charCodeAt(i) - 65) + 26
          );
        } else {
          res1.push(
            messageStr.charCodeAt(i) - 65 - (keyStr.charCodeAt(i) - 65)
          );
        }
      } else {
        res1.push(messageStr[i]);
      }
    }

    const result = [];
    for (let i = 0; i < res1.length; i++) {
      if (typeof res1[i] === "number") {
        result.push(String.fromCharCode(res1[i] + 65));
      } else {
        result.push(res1[i]);
      }
    }

    if (this.type) {
      return result.join("");
    } else {
      return result.reverse().join("");
    }
  }
}

module.exports = {
  VigenereCipheringMachine,
};
