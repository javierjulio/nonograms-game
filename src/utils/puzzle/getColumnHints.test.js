import { getColumnHints } from './getColumnHints';

test('returns column hints for 5x5 puzzle', () => {
  const data = [
    [ 1, 1, 1, 0, 0 ],
    [ 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 0, 0 ],
    [ 1, 0, 1, 1, 0 ],
    [ 1, 0, 1, 0, 0 ]
  ]

  expect(getColumnHints(data)).toStrictEqual([
    [ { total: 5, start: 0, length: 5 } ],
    [ { total: 3, start: 0, length: 3 } ],
    [ { total: 5, start: 0, length: 5 } ],
    [ { total: 1, start: 1, length: 1 }, { total: 1, start: 3, length: 1 } ],
    [ { total: 1, start: 1, length: 1 } ]
  ])
});

test('returns column hints for 1-3 dimensions', () => {
  const data = [
    [ 1, 1, 1, 1, 0 ],
    [ 1, 1, 0, 1, 0 ],
    [ 1, 1, 1, 0, 0 ],
    [ 1, 0, 0, 1, 0 ],
    [ 1, 0, 1, 0, 0 ]
  ]

  expect(getColumnHints(data)).toStrictEqual([
    [ { total: 5, start: 0, length: 5 } ],
    [ { total: 3, start: 0, length: 3 } ],
    [ { total: 1, start: 0, length: 1 }, { total: 1, start: 2, length: 1 }, { total: 1, start: 4, length: 1 } ],
    [ { total: 2, start: 0, length: 2 }, { total: 1, start: 3, length: 1 } ],
    [ { total: 0, start: 0, length: 5 } ]
  ])
});

test('returns column hints for 5x10 puzzle', () => {
  const data = [
    [ 1, 1, 1, 1, 0, 1, 1, 1, 0, 0 ],
    [ 1, 1, 0, 1, 0, 1, 0, 1, 0, 0 ],
    [ 1, 1, 1, 0, 0, 1, 1, 0, 0, 0 ],
    [ 1, 0, 0, 1, 0, 1, 0, 1, 0, 0 ],
    [ 1, 0, 1, 0, 0, 1, 1, 1, 0, 0 ]
  ]

  expect(getColumnHints(data)).toStrictEqual([
    [ { total: 5, start: 0, length: 5 } ],
    [ { total: 3, start: 0, length: 3 } ],
    [ { total: 1, start: 0, length: 1 }, { total: 1, start: 2, length: 1 }, { total: 1, start: 4, length: 1 } ],
    [ { total: 2, start: 0, length: 2 }, { total: 1, start: 3, length: 1 } ],
    [ { total: 0, start: 0, length: 5 } ],
    [ { total: 5, start: 0, length: 5 } ],
    [ { total: 1, start: 0, length: 1 }, { total: 1, start: 2, length: 1 }, { total: 1, start: 4, length: 1 } ],
    [ { total: 2, start: 0, length: 2 }, { total: 2, start: 3, length: 2 } ],
    [ { total: 0, start: 0, length: 5 } ],
    [ { total: 0, start: 0, length: 5 } ]
  ])
});
