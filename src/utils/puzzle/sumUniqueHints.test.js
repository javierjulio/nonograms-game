import { sumUniqueHints } from './sumUniqueHints';

test('with all zeros, returns zero as hint', () => {
  const row = [ 0, 0, 0, 0, 0 ]
  expect(sumUniqueHints(row)).toStrictEqual([0])
});

test('with leading and trailing zeros', () => {
  const row = [ 0, 1, 0, 1, 0 ]
  expect(sumUniqueHints(row)).toStrictEqual([1, 1])
});

test('with more leading and trailing zeros', () => {
  const row = [ 0, 0, 0, 1, 0, 1, 1, 0, 0, 0 ]
  expect(sumUniqueHints(row)).toStrictEqual([1, 2])
});

test('with leading and trailing filled values', () => {
  const row = [ 1, 0, 1, 0, 1 ]
  expect(sumUniqueHints(row)).toStrictEqual([1, 1, 1])
});

test('with all filled values, returns total as hint', () => {
  const row = [1, 1, 1, 1, 1]
  expect(sumUniqueHints(row)).toStrictEqual([5])
})

test('with 3 different filled values, returns 3, 2, 1 as hints', () => {
  const row = [1, 1, 1, 0, 0, 1, 1, 0, 0, 1]
  expect(sumUniqueHints(row)).toStrictEqual([3, 2, 1])
});
