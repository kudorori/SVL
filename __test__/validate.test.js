import { validate } from "../src";

const validateStr1 = "red blue, orange, GIA, ruby"

test("'red' AND 'blue = true'", () => {
  expect(validate("'red' AND 'blue'", validateStr1)).toBe(true);
});

test("'red' AND 'blue AND orange = true'", () => {
  expect(validate("'red' AND 'blue' AND 'orange'", validateStr1)).toBe(true);
});

test("'red' AND 'blue AND pink = false'", () => {
  expect(validate("'red' AND 'blue' AND 'pink'", validateStr1)).toBe(false);
});

test("'(red AND blue) OR 'GIA'", () => {
  expect(validate("('red' AND 'blue') OR 'GIA'", validateStr1)).toBe(true);
})

test("NOT (red AND blue)", () => {
  expect(validate("NOT ('red' AND 'blue')", validateStr1)).toBe(false);
})

test("NOT NOT (red AND blue)", () => {
  expect(validate("NOT NOT ('red' AND 'blue')", validateStr1)).toBe(true);
})

test("(('ruby' AND 'red') OR 'GIA') AND NOT 'orange'", () => {
  expect(validate("(('ruby' AND 'red') OR 'GIA') AND NOT 'orange'", validateStr1)).toBe(false);
})

test("(('ruby' AND 'red') OR 'GIA') AND 'orange'", () => {
  expect(validate("(('ruby' AND 'red') OR 'GIA') AND 'orange'", validateStr1)).toBe(true);
})

test("ruby and not star", () => {
  expect(validate("'ruby' AND NOT 'star'", validateStr1)).toBe(true);
})
