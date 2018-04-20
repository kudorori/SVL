const logicRegexMatch = /OR|AND|\(|\)|NOT/;
const valueRegexMatch = /\'([\w\ ]+)\'/;

export const infix2postfix = str => {
  let opStack = [];
  let postfixStack = [];
  do {
    const match = str.match(logicRegexMatch);
    if(match !== null && match.index == 0) {
      if(match[0] == ")") {
        do {
          postfixStack.push(opStack.pop());
        } while (opStack[opStack.length - 1] != "(");
        opStack.pop()
      } else {
        opStack.push(match[0]);
      }
      str = str.replace(match[0], "");
    } else {
      const value = str.match(valueRegexMatch);
      postfixStack.push(value[1]);
      str = str.replace(valueRegexMatch, "");
    }
    str = str.trim();

  } while(str.length > 0)

  while(opStack.length > 0) {
    postfixStack.push(opStack.pop());
  }
  // console.log(postfixStack);
  return postfixStack;
}



/**
 * [parse description]
 * @param  {string} str [description]
 * @return {[type]}     [description]
 */
export const parse = (str) => {
  const postfixStack = infix2postfix(str);
}

/**
 * [validate description]
 * @param  {object | string} validator [description]
 * @param  {string} str       [description]
 * @return {boolean}           [description]
 */
export const validate = (validator, str) => {
  const postfixStack = typeof(validator) == "array" ? validator : infix2postfix(validator);
  let opStack = [];
  let valueStack = [];

  if(postfixStack.length == 1) {
    return new RegExp(postfixStack[0], "gi").test(str);
  }

  while( postfixStack.length > 0 ) {
    const item = postfixStack.shift();
    if(logicRegexMatch.test(item)) {
      // logic
      let bol = false;
      switch(item) {
        case "AND":
          bol = [valueStack.pop(), valueStack.pop()].every(v => v === true || new RegExp(v, "gi").test(str) );
          break;
        case "OR":
          bol = [valueStack.pop(), valueStack.pop()].some(v => new RegExp(v, "gi").test(str) );
          break;
        case "NOT":
          const lastValue = valueStack.pop();
          if(typeof(lastValue) == "string") {
            bol = !new RegExp(lastValue, "gi").test(str);
          } else if(typeof(lastValue) == "boolean") {
            bol = !lastValue;
          }

          break;
      }
      valueStack.push(bol)
    } else {
      valueStack.push(item);
    }
  }

  return valueStack[0];

}
