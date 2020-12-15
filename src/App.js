import { useEffect, useState } from 'react';
import './App.css';
import { solveNonogram } from './utils/puzzle/solver';
import seedrandom from 'seedrandom';
import { getColumnHints } from './utils/puzzle/getColumnHints';
import { getRowHints } from './utils/puzzle/getRowHints';
import randomPuzzle from "./utils/puzzle/randomPuzzle";
import Board from "./components/Board"

function App() {
  // TODO: create puzzleId from data
  //
  // > data.map(row => row.join('')).join(",")
  // > "11110,11010,11100,10010,10100,11110,11010,11100,10010,10100"
  //
  // which that string can also be parsed back into a 2d array
  // > string.split(",").map(row => row.split('').map(i => Number(i)))
  const generateSolvablePuzzle = () => {
    const seed = Date.now().toString(36)
    const rng = seedrandom(seed)

    const sizes = [ [5, 5], [10, 5] ]

    while (true) {
      const [rows, columns] = sizes[Math.floor(rng() * sizes.length)]
      const data = randomPuzzle(rng, rows, columns)
      const rowHints = getRowHints(data)
      const columnHints = getColumnHints(data)
      const nonogram = solveNonogram(rowHints.map((i) => i.map((c) => c.total)), columnHints.map((i) => i.map((c) => c.total)))
      console.log(`NEW PUZZLE ${columns}x${rows}`, nonogram.solved, nonogram.solution)
      if (nonogram.solved) {
        return { seed: seed, puzzle: nonogram.solution, rowHints, columnHints }
      }
    }
  }

  const [data, setData] = useState({seed: "", puzzle: [], rowHints: [], columnHints: []})

  useEffect(() => {
    setData(generateSolvablePuzzle())
  }, []);

  const newPuzzle = () => {
    setData(generateSolvablePuzzle())
  }

  return(
    <Board data={data.puzzle} rowHints={data.rowHints} columnHints={data.columnHints} newPuzzle={newPuzzle} />
  )
}

export default App;
