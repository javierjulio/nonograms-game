import { getRowHints } from './getRowHints';

test('returns row hints for 5x5 puzzle', () => {
  const data = [
    [ 1, 1, 1, 0, 0 ],
    [ 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 0, 0 ],
    [ 1, 0, 1, 1, 0 ],
    [ 1, 0, 1, 0, 0 ]
  ]

  expect(getRowHints(data)).toStrictEqual([
    [3],
    [5],
    [3],
    [1, 2],
    [1, 1],
  ])
});

test('returns row hints for 1-3 dimensions', () => {
  const data = [
    [ 1, 0, 1, 0, 1 ],
    [ 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 0, 0 ],
    [ 1, 0, 1, 1, 0 ],
    [ 0, 0, 0, 0, 0 ]
  ]

  expect(getRowHints(data)).toStrictEqual([
    [1, 1, 1],
    [5],
    [3],
    [1, 2],
    [0],
  ])
});
