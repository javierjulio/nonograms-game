import { sumUniqueHints } from './sumUniqueHints';

test('with all zeros, returns zero as hint', () => {
  const row = [ 0, 0, 0, 0, 0 ]
  expect(sumUniqueHints(row)).toStrictEqual([
    { total: 0, start: 0, length: 5 }
  ])
});

test('with leading and trailing zeros', () => {
  const row = [ 0, 1, 0, 1, 0 ]
  expect(sumUniqueHints(row)).toStrictEqual([
    { total: 1, start: 1, length: 1 },
    { total: 1, start: 3, length: 1 }
  ])
});

test('with more leading and trailing zeros', () => {
  const row = [ 0, 0, 0, 1, 0, 1, 1, 0, 0, 0 ]
  expect(sumUniqueHints(row)).toStrictEqual([
    { total: 1, start: 3, length: 1 },
    { total: 2, start: 5, length: 2 }
  ])
});

test('with leading and trailing filled values', () => {
  const row = [ 1, 0, 1, 0, 1 ]
  expect(sumUniqueHints(row)).toStrictEqual([
    { total: 1, start: 0, length: 1 },
    { total: 1, start: 2, length: 1 },
    { total: 1, start: 4, length: 1 }
  ])
});

test('with all filled values, returns total as hint', () => {
  const row = [1, 1, 1, 1, 1]
  expect(sumUniqueHints(row)).toStrictEqual([
    { total: 5, start: 0, length: 5 }
  ])
})

test('with 3 different filled values, returns 3, 2, 1 as hints', () => {
  const row = [1, 1, 1, 0, 0, 1, 1, 0, 0, 1]
  expect(sumUniqueHints(row)).toStrictEqual([
    { total: 3, start: 0, length: 3 },
    { total: 2, start: 5, length: 2 },
    { total: 1, start: 9, length: 1 }
  ])
});
