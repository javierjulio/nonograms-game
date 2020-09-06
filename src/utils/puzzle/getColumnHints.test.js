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
    [5],
    [3],
    [5],
    [1, 1],
    [1],
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
    [5],
    [3],
    [1, 1, 1],
    [2, 1],
    [0],
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
    [5],
    [3],
    [1, 1, 1],
    [2, 1],
    [0],
    [5],
    [1, 1, 1],
    [2, 2],
    [0],
    [0]
  ])
});
