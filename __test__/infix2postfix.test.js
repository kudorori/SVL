import { parse, infix2postfix } from "../src";

test("'red' AND 'blue'", () => {
  expect(infix2postfix("'red' AND 'blue'")).toEqual(["red", "blue", "AND"]);
});


test("'red' AND 'blue' OR 'orange'", () => {
  expect(infix2postfix("'red' AND 'blue' OR 'orange'")).toEqual(["red", "blue", "orange", "OR", "AND"]);
});

test("('red' OR 'blue') AND 'orange'", () => {
  expect(infix2postfix("('red' OR 'blue') AND 'orange'")).toEqual(["red", "blue", "OR", "orange", "AND"]);
})

test("('red' OR 'blue') AND ('orange' OR 'red')", () => {
  expect(infix2postfix("('red' OR 'blue') AND ('orange' OR 'red')")).toEqual(["red", "blue", "OR", "orange", "red", "OR", "AND"]);
})

test("(('red' OR 'blue') AND 'orange') OR 'red'", () => {
  expect(infix2postfix("(('red' OR 'blue') AND 'orange') OR 'red'")).toEqual(["red", "blue", "OR", "orange", "AND", "red", "OR"]);
})

test("NOT (('red' OR 'blue') AND ('orange' OR 'red'))", () => {
  expect(infix2postfix("NOT (('red' OR 'blue') AND ('orange' OR 'red'))")).toEqual(["red", "blue", "OR", "orange", "red", "OR", "AND", "NOT"]);
})

test("NOT ('red' OR 'blue' AND NOT('orange'))", () => {
  expect(infix2postfix("NOT ('red' OR 'blue' AND NOT('orange' OR 'orangy'))")).toEqual(["red", "blue", "orange", "orangy", "OR", "NOT", "AND", "OR", "NOT"]);
})

test("One Value", () => {
  expect(infix2postfix("'red'")).toEqual(["red"])
})
