import { useEffect, useState } from 'react';
import Hints from "./Hints"
import Puzzle from "./Puzzle"
import CellState from "../constants/CellState"

function Board({ data, rowHints, columnHints, newPuzzle }) {
  const [answer, setAnswer] = useState([])

  const updateAnswer = (row, column, value) => {
    answer[row][column] = value
    setAnswer([...answer])
  }

  useEffect(() => {
    let result = Array.from({length: data.length}, () => new Array(data[0].length).fill(CellState.UNKNOWN))
    // find lines where sum is 0 and cross out each cell
    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      if (row.reduce((a, b) => a + b, 0) === 0) {
        for (let x = 0; x < row.length; x++) {
          result[i][x] = CellState.EMPTY
        }
      }
    }
    for (let i = 0; i < data.length; i++) {
      const col = data.map((row) => row[i])
      if (col.reduce((a, b) => a + b, 0) === 0) {
        for (let x = 0; x < col.length; x++) {
          result[x][i] = CellState.EMPTY
        }
      }
    }
    setAnswer(result)
  }, [data, rowHints, columnHints])

  const answered = () => {
    for (let i = 0; i < data.length; i++)
      for (let j = 0; j < data[i].length; j++)
        if ((data[i][j] === CellState.FILLED && answer[i][j] !== CellState.FILLED) || (data[i][j] !== CellState.FILLED && answer[i][j] === CellState.FILLED))
          return false
    return true
  }

  const actionCompleted = () => {
    if (answered()) {
      newPuzzle()
    }
  }

  return (
    <div className="disable-text-selection">
      <div className="full-grid">
        <Hints type="column" data={columnHints} puzzle={answer} className="column-hints" />
        <Hints type="row" data={rowHints} puzzle={answer} className="row-hints" />
        <Puzzle rows={rowHints.length} cols={columnHints.length}
          answer={answer} onUpdateAnswer={updateAnswer} actionCompleted={actionCompleted} />
      </div>
    </div>
  )
}

export default Board
