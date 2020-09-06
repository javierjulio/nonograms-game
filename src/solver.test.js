import solvable from './solver';
import seedrandom from 'seedrandom';

test('solvable 5x5 with one hint dimension', () => {
  const rowHints = [[3], [3], [4], [3], [1]]
  const columnHints = [[2], [2], [4], [3], [3]]
  expect(solvable(rowHints, columnHints)).toBe(true)
});

test('solvable 5x5 and two hint dimension', () => {
  const rowHints = [[3], [4], [1, 3], [1, 1], [2]]
  const columnHints = [[2], [1, 1], [3, 1], [4], [3]]
  expect(solvable(rowHints, columnHints)).toBe(true)
});

test('solvable 5x10 and two hint dimension', () => {
  const rowHints = [[3], [2], [1, 2], [2, 2], [4, 1]]
  const columnHints = [[2], [1], [0], [1, 1], [1, 1], [1, 1], [1, 1], [2], [2], [2]]
  expect(solvable(rowHints, columnHints)).toBe(true)
});

test('solvable 15x10 and three hint dimension', () => {
  const rowHints = [[1], [1, 1], [1, 1], [2, 3], [1, 3], [2, 2], [4, 4], [3, 2], [5, 4], [2, 2, 2], [1, 1, 3], [2, 4], [4, 3], [6, 1], [7, 1]]
  const columnHints = [[3, 8], [2, 4, 4], [3, 1, 3], [2, 2, 4], [4, 4, 2], [5, 5], [4, 5, 1], [2, 2, 2], [3, 1], [3]]
  expect(solvable(rowHints, columnHints)).toBe(true)
});

test('not solvable, multiple solutions', () => {
  const rowHints = [[1], [4], [1, 1], [4], [1]]
  const columnHints = [[1], [4], [1, 1], [4], [1]]
  expect(solvable(rowHints, columnHints)).toBe(false)
});

test('not solvable with multiple solutions', () => {
  const rowHints = [[1, 1], [1, 1, 1], [1, 1], [1], [1]]
  const columnHints = [[2], [1, 1], [1, 1], [1, 1], [2]]
  expect(solvable(rowHints, columnHints)).toBe(false)
})

test('not solvable, impossible', () => {
  const rowHints = [[1, 1], [1, 1, 1], [1, 1], [1], [1]]
  const columnHints = [[2], [3], [1, 1], [3], [2]]
  expect(solvable(rowHints, columnHints)).toBe(false)
})

test('solvable from hints from a randomly generated puzzle', () => {
  // was randomly generated and is solvable
  const rowHints = [[5], [4], [4], [3, 1], [3], [1, 3], [2, 1], [2, 1], [2, 1], [5]]
  const columnHints = [[6, 1], [5, 4], [10], [3, 1, 1], [1, 1, 5]]
  expect(solvable(rowHints, columnHints)).toBe(true)
});


function generateRandomPuzzle(rng, rows, cols, values = 1, density = null) {
  if (density === null) {
    density = rng() * 0.6 + 0.2;
  }

  return Array.from({length: rows}, () => {
    return Array.from({length: cols}, () => {
      // const num = rng()
      // if (num < density) {
      //   return Math.floor(num * values) + 1
      // }
      if (rng() < density) {
        return Math.floor(rng() * values) + 1
      }
      return 0
    })
  })

  // let data = new Array(rows).fill();
  // return data.map(() => {
  //   return new Array(cols).fill(0).map(() => (rng() < density) ? Math.floor(rng() * values) + 1 : 0);
  // })

  // for (let row = 0; row < rows; row++) {
  //   board[row] = new Array(cols).fill(0).map(_ => (rng() < density) ? Math.floor(rng() * values) + 1 : 0);
  //   // for (let col = 0; col < cols; col++) {
  //   //   if (rng() < density) {
  //   //     board[row][col] = Math.floor(rng() * values) + 1;
  //   //   }
  //   // }
  // }
  // return board;
}

import { getColumnHints } from './utils/puzzle/getColumnHints';
import { getRowHints } from './utils/puzzle/getRowHints';
import { draw } from './utils/puzzle/asciiDraw';

// test('seed random', () => {
//   const expectedBoard = [
//     [ 1, 1, 1, 1, 1 ],
//     [ 0, 0, 0, 1, 0 ],
//     [ 1, 0, 1, 1, 1 ],
//     [ 1, 1, 1, 1, 0 ],
//     [ 1, 0, 1, 1, 0 ]
//   ]
//   let rng = seedrandom('hello.');
//   let data = generateRandomPuzzle(rng, 5, 5)
//   expect(data).toStrictEqual(expectedBoard)
//   expect(solvable(getRowHints(data), getColumnHints(data))).toBe(true)

//   let board = generateRandomPuzzle(rng, 5, 15)
//   // console.log(getColumnHints(board))
//   // console.log(getRowHints(board))
//   // TODO: revert back to using a class, since we will need
//   // the puzzle solution to compare to when user attempts to solve
//   expect(solvable(getRowHints(board), getColumnHints(board))).toBe(true)
// })

// test('seed random 2', () => {
//   let rng = seedrandom('seed');
//   let data = generateRandomPuzzle(rng, 15, 10)
//   expect(solvable(getRowHints(data), getColumnHints(data))).toBe(true)

//   let board = generateRandomPuzzle(rng, 10, 15)
//   // console.log(getColumnHints(board))
//   // console.log(getRowHints(board))
//   // TODO: revert back to using a class, since we will need
//   // the puzzle solution to compare to when user attempts to solve
//   expect(solvable(getRowHints(board), getColumnHints(board))).toBe(true)
// })

test('seed many random puzzles', () => {
  // let rng = seedrandom('Javier Julio');
  let sizes = [ [5, 5], [5, 10], [10, 5], [10, 10], [5, 15], [15, 5] ]
  let finalSizes = []
  let result = Array.from({length: 30}, (_, i) => {
    let rng = seedrandom(`${i + 1}`);
    let [rows, columns] = sizes[Math.floor(rng() * sizes.length)]
    finalSizes.push([ rows, columns ])

    let data = generateRandomPuzzle(rng, rows, columns, 1, 0.7)
    let isSolvable = solvable(getRowHints(data), getColumnHints(data))
    if (rows === 10 && columns === 5) {
      if (isSolvable) {
        console.log(draw(getRowHints(data), getColumnHints(data), data))
      }
    }
    return isSolvable
  })
  console.log('solvable', result.filter((value) => value).length)
  console.log('not solvable', result.filter((value) => !value).length)
  console.log(finalSizes.map(v => `${v[0]}x${v[1]}`))
})
