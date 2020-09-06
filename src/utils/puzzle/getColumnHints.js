import { sumUniqueHints } from './sumUniqueHints'

// Takes a matrix of rows to columns and swaps so its now columns to rows
//
// Given the following:
// [
//   [ 1, 1, 0 ],
//   [ 0, 1, 1 ],
//   [ 1, 1, 0 ]
// ]
//
// Changes to:
// [
//   [ 1, 0, 1 ],
//   [ 1, 1, 1 ],
//   [ 0, 1, 0 ]
// ]

const transpose = (data) => {
  return data.reduce((memo, row) => row.map((_, i) => [...(memo[i] || []), row[i]] ), [])
}

const getColumnHints = (data) => {
  return transpose(data).map(row => sumUniqueHints(row))
}

export { getColumnHints }
