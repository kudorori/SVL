import { validate } from "../src";

const validateStr1 = "red blue, orange, GIA, ruby"

// test("'red' AND 'blue = true'", () => {
//   expect(validate("'red' AND 'blue'", validateStr1)).toBe(true);
// });
//
// test("'red' AND 'blue AND orange = true'", () => {
//   expect(validate("'red' AND 'blue' AND 'orange'", validateStr1)).toBe(true);
// });
//
// test("'red' AND 'blue AND pink = false'", () => {
//   expect(validate("'red' AND 'blue' AND 'pink'", validateStr1)).toBe(false);
// });
//
// test("'(red AND blue) OR 'GIA'", () => {
//   expect(validate("('red' AND 'blue') OR 'GIA'", validateStr1)).toBe(true);
// })
//
// test("NOT (red AND blue)", () => {
//   expect(validate("NOT ('red' AND 'blue')", validateStr1)).toBe(false);
// })
//
// test("NOT NOT (red AND blue)", () => {
//   expect(validate("NOT NOT ('red' AND 'blue')", validateStr1)).toBe(true);
// })
//
// test("(('ruby' AND 'red') OR 'GIA') AND NOT 'orange'", () => {
//   expect(validate("(('ruby' AND 'red') OR 'GIA') AND NOT 'orange'", validateStr1)).toBe(false);
// })
//
// test("(('ruby' AND 'red') OR 'GIA') AND 'orange'", () => {
//   expect(validate("(('ruby' AND 'red') OR 'GIA') AND 'orange'", validateStr1)).toBe(true);
// })


test("0914", () => {
  expect(validate("'orange' AND 'sapphire'", `
    o
 GIA
 GEMOLOGICAL INSTITUTE OF AMERICA'
 SAPPHIRE REPORT
 March 28, 2008
 Weight
 Measurements
 Shape
 Cutting Style: Crown
 Cutting Style: Pavilion
 Transparency
 CONCLUSION
 Species
 Variety
 TREATMENT
 No indications of heating (NTE).
 Comments:
 A pre-existing inscription "NSC IJ21 15" is present on the girdle.
 Awem•t•
 16936261
 TEI
 New York labratco
 580 Fifth Aueae I New NY 10038-4794
 T: 212-221-5858 | F: 212-575-3095
 Carlsbad
 5355 krøta I CA 9208-409
 3.21 carat
 &20x 7.19 x 5.67 mm
 Cushion
 Brilliant cut
 step cut
 Transparent
 Brownish Orange
 NATURAL CORUNDUM
 NATURAL SAPPHIRE
 TES
 297718601
 tt •tos
 IMPORTANT LIMITATIONS ON BACK
 caw
  `)).toBe(true)
})
