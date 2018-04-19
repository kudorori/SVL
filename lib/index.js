"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var logicRegexMatch = /OR|AND|\(|\)|NOT/;
var valueRegexMatch = /\'(\w*)\'/;

var infix2postfix = exports.infix2postfix = function infix2postfix(str) {
  var opStack = [];
  var postfixStack = [];
  do {
    var match = str.match(logicRegexMatch);
    if (match !== null && match.index == 0) {
      if (match[0] == ")") {
        do {
          postfixStack.push(opStack.pop());
        } while (opStack[opStack.length - 1] != "(");
        opStack.pop();
      } else {
        opStack.push(match[0]);
      }
      str = str.replace(match[0], "");
    } else {
      var value = str.match(valueRegexMatch);
      postfixStack.push(value[1]);
      str = str.replace(valueRegexMatch, "");
    }
    str = str.trim();
  } while (str.length > 0);

  while (opStack.length > 0) {
    postfixStack.push(opStack.pop());
  }
  // console.log(postfixStack);
  return postfixStack;
};

/**
 * [parse description]
 * @param  {string} str [description]
 * @return {[type]}     [description]
 */
var parse = exports.parse = function parse(str) {
  var postfixStack = infix2postfix(str);
};

/**
 * [validate description]
 * @param  {object | string} validator [description]
 * @param  {string} str       [description]
 * @return {boolean}           [description]
 */
var validate = exports.validate = function validate(validator, str) {
  var postfixStack = typeof validator == "array" ? validator : infix2postfix(validator);
  var opStack = [];
  var valueStack = [];

  if (postfixStack.length == 1) {
    return str.test(new RegExp(postfixStack[0], "gi"));
  }

  while (postfixStack.length > 0) {
    var item = postfixStack.shift();
    if (logicRegexMatch.test(item)) {
      // logic
      var bol = false;
      switch (item) {
        case "AND":
          bol = [valueStack.pop(), valueStack.pop()].every(function (v) {
            return v === true || str.search(new RegExp(v, "gi")) != -1;
          });
          break;
        case "OR":
          bol = [valueStack.pop(), valueStack.pop()].some(function (v) {
            return str.search(new RegExp(v, "gi")) != -1;
          });
          break;
        case "NOT":
          bol = !valueStack.pop();
          break;
      }
      valueStack.push(bol);
    } else {
      valueStack.push(item);
    }
  }

  return valueStack[0];
};