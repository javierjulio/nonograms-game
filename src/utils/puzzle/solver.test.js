import { solveNonogram } from './solver';

test('solvable 5x5 with one hint dimension', () => {
  const rowHints = [[3], [3], [4], [3], [1]]
  const columnHints = [[2], [2], [4], [3], [3]]
  const { solved } = solveNonogram(rowHints, columnHints)
  expect(solved).toBe(true)
});

test('solvable 5x5 and two hint dimension', () => {
  const rowHints = [[3], [4], [1, 3], [1, 1], [2]]
  const columnHints = [[2], [1, 1], [3, 1], [4], [3]]
  const { solved } = solveNonogram(rowHints, columnHints)
  expect(solved).toBe(true)
});

test('solvable 5x10 and two hint dimension', () => {
  const rowHints = [[3], [2], [1, 2], [2, 2], [4, 1]]
  const columnHints = [[2], [1], [0], [1, 1], [1, 1], [1, 1], [1, 1], [2], [2], [2]]
  const { solved } = solveNonogram(rowHints, columnHints)
  expect(solved).toBe(true)
});

test('solvable 15x10 and three hint dimension', () => {
  const rowHints = [[1], [1, 1], [1, 1], [2, 3], [1, 3], [2, 2], [4, 4], [3, 2], [5, 4], [2, 2, 2], [1, 1, 3], [2, 4], [4, 3], [6, 1], [7, 1]]
  const columnHints = [[3, 8], [2, 4, 4], [3, 1, 3], [2, 2, 4], [4, 4, 2], [5, 5], [4, 5, 1], [2, 2, 2], [3, 1], [3]]
  const { solved } = solveNonogram(rowHints, columnHints)
  expect(solved).toBe(true)
});

test('not solvable, multiple solutions', () => {
  const rowHints = [[1], [4], [1, 1], [4], [1]]
  const columnHints = [[1], [4], [1, 1], [4], [1]]
  const { solved } = solveNonogram(rowHints, columnHints)
  expect(solved).toBe(false)
});

test('not solvable with multiple solutions', () => {
  const rowHints = [[1, 1], [1, 1, 1], [1, 1], [1], [1]]
  const columnHints = [[2], [1, 1], [1, 1], [1, 1], [2]]
  const { solved } = solveNonogram(rowHints, columnHints)
  expect(solved).toBe(false)
})

test('not solvable, impossible', () => {
  const rowHints = [[1, 1], [1, 1, 1], [1, 1], [1], [1]]
  const columnHints = [[2], [3], [1, 1], [3], [2]]
  const { solved } = solveNonogram(rowHints, columnHints)
  expect(solved).toBe(false)
})

test('solvable from hints from a randomly generated puzzle', () => {
  // was randomly generated and can be solved
  const rowHints = [[5], [4], [4], [3, 1], [3], [1, 3], [2, 1], [2, 1], [2, 1], [5]]
  const columnHints = [[6, 1], [5, 4], [10], [3, 1, 1], [1, 1, 5]]
  const { solved } = solveNonogram(rowHints, columnHints)
  expect(solved).toBe(true)
});
