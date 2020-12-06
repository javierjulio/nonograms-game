import React, { useState, Component } from 'react'
import './App.css';
import { solveNonogram } from './utils/puzzle/solver';
import seedrandom from 'seedrandom';

import { getColumnHints } from './utils/puzzle/getColumnHints';
import { getRowHints } from './utils/puzzle/getRowHints';
import { toKey } from './utils/react/toKey';

function HintNumber(props) {
  return <div className="hint-num">{props.value}</div>
}

function HintGroup(props) {
  const numbers = props.hints.map((hint, index) =>
    <HintNumber value={hint} key={toKey(hint, index)} />
  );
  return <div className="hint-cell">{numbers}</div>
}

function HintGroups({ data }) {
  return data.map((group, index) =>
    <HintGroup hints={group} key={toKey(data, group, index)} />
  )
}

const GridCell = React.memo(({value, row, column}) => {
  const classStates = [ "crossed", "filled" ]
  const className = classStates[value] || ""
  return <div className={`nonogram-cell ${className}`} data-row={row} data-column={column} title={`row ${row+1}, column ${column+1}`}></div>
})

// for left mouse click its different on pointermove but right mouse click is the same
// https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#Determining_button_states
const LEFT_MOUSE = 1
const RIGHT_MOUSE = 2

class Puzzle extends Component {

  constructor(props) {
    super(props)
    this.lastCell = null;
    this.cellState = null;
    this.pointerDownHandler = this.pointerDownHandler.bind(this);
    this.pointerMoveHandler = this.pointerMoveHandler.bind(this);
    this.pointerUpHandler = this.pointerUpHandler.bind(this);
    this.pointerLeaveHandler = this.pointerLeaveHandler.bind(this);
  }

  disableContextMenu(event) {
    event.preventDefault()
  }

  // using `touch-action: none;` works but is not enough to prevent a quick double tap to zoom
  disableTouchAction(event) {
    event.preventDefault();
  }

  // EMPTY = -1;  // rename to UNKNOWN
  // CROSSED = 0; // rename to EMPTY
  // FILLED = 1;

  getCellFromEvent(event) {
    const target = (event.pointerType === 'mouse') ?
      event.target :
      document.elementFromPoint(event.clientX, event.clientY)

    if (target)
      return target.closest('.nonogram-cell')
  }

  pointerDownHandler(event) {
    this.lastCell = null
    this.cellState = null

    const cell = this.getCellFromEvent(event)

    if (!cell)
      return;

    this.lastCell = cell

    if (event.buttons === LEFT_MOUSE) {
      if (this.props.answer[cell.dataset.row][cell.dataset.column] === 0) { // crossed
        this.cellState = -1 // unknown
      }
      else if (this.props.answer[cell.dataset.row][cell.dataset.column] === 1) { // filled
        this.cellState = 0 // crossed
      }
      else {
        this.cellState = 1 // filled
      }
    }
    else if (event.buttons === RIGHT_MOUSE) {
      this.cellState = 0 // CROSSED
    }

    if (this.cellState !== null) {
      this.props.onUpdateAnswer(cell.dataset.row, cell.dataset.column, this.cellState)
      document.addEventListener('pointermove', this.pointerMoveHandler)
      document.addEventListener('pointerup', this.pointerUpHandler)
    }
  }

  pointerMoveHandler(event) {
    const cell = this.getCellFromEvent(event)

    if (!cell || this.lastCell === cell)
      return;

    const cellValue = this.props.answer[cell.dataset.row][cell.dataset.column]
    // if update action is to clear/empty and current cell is NOT empty, update it
    // or if update action is to fill/cross (NOT empty) and current cell is empty, update it
    if ((this.cellState === -1 && cellValue !== -1) || (this.cellState !== -1 && cellValue === -1)) {
      this.props.onUpdateAnswer(cell.dataset.row, cell.dataset.column, this.cellState)
    }

    this.lastCell = cell
  }

  pointerUpHandler(event) {
    this.removeActivePointerHandlers()
    this.cellState = null
    this.lastCell = null

    if (this.props.checkAnswer()) {
      this.props.onComplete()
    }
  }

  removeActivePointerHandlers() {
    document.removeEventListener('pointermove', this.pointerMoveHandler)
    document.removeEventListener('pointerup', this.pointerUpHandler)
  }

  pointerLeaveHandler(event) {
    this.removeActivePointerHandlers()
  }

  render () {
    return (
      <div className={`nonogram-grid grid-${this.props.data[0].length}x${this.props.data.length}`}
        onPointerDown={this.pointerDownHandler}
        onPointerLeave={this.pointerLeaveHandler}
        onTouchEnd={this.disableTouchAction}
        onContextMenu={this.disableContextMenu}>
        {
          this.props.answer.map((row, rowIndex) => {
            return row.map((value, colIndex) => {
              return <GridCell
                        value={value}
                        row={rowIndex}
                        column={colIndex}
                        key={toKey(this.props.data, rowIndex, colIndex)} />
              }
            )
          })
        }
      </div>
    )
  }
}

let rng = seedrandom("Javier");

function Board() {
  // TODO: create puzzleId from data
  //
  // > data.map(row => row.join('')).join(",")
  // > "11110,11010,11100,10010,10100,11110,11010,11100,10010,10100"
  //
  // which that string can also be parsed back into a 2d array
  // > string.split(",").map(row => row.split('').map(i => Number(i)))

  const [data, setData] = useState(generateRandomPuzzle(rng, 5, 5))
  const [answer, setAnswer] = useState(
    Array.from({length: data.length}, () => new Array(data[0].length).fill(-1))
  )

  function randomFromRange(min, max, rng) { // min and max included
    return Math.floor(rng() * (max - min + 1) + min);
  }

  function generateRandomPuzzle(rng, rows, cols, values = 1) {
    return Array.from({length: rows}, () => {
      let cells = []
      let num = randomFromRange(1, cols, rng)
      let value = randomFromRange(0, 1, rng)
      while (cells.length < cols) {
        cells.push(...new Array(num).fill(value))
        value = 1 - value
        num = randomFromRange(1, cols - cells.length, rng)
      }
      return cells
    })
  }

  let sizes = [ [5, 5], [10, 5] ] // [ [5, 5], [5, 10], [10, 5] ]
  function getNewPuzzle() {
    while (true) {
      console.log('new puzzle')
      let [rows, columns] = sizes[Math.floor(rng() * sizes.length)]
      let data = generateRandomPuzzle(rng, rows, columns)
      let nonogram = solveNonogram(getRowHints(data), getColumnHints(data))
      if (nonogram.solved) {
        console.log(nonogram)
        return nonogram.solution;
      }
    }
  }

  const completeHandler = () => {
    console.log('COMPLETED! Your answer:', answer)
    const newPuzzle = getNewPuzzle()
    setData(newPuzzle)
    setAnswer(Array.from({length: newPuzzle.length}, () => new Array(newPuzzle[0].length).fill(-1)))
  }

  const updateAnswer = (row, column, value) => {
    answer[row][column] = value
    setAnswer([...answer])
  }

  // TODO: consolidate checkAnswer and onComplete methods??
  const checkAnswer = () => {
    for (let i = 0; i < data.length; i++)
      for (let j = 0; j < data[i].length; j++)
        if (data[i][j] === 1 && answer[i][j] !== 1)
          return false
    return true
  }

  return (
    <div className="disable-text-selection">
      <div className="full-grid">
        <div className="column-hints">
          <HintGroups data={getColumnHints(data)} />
        </div>
        <div className="row-hints">
          <HintGroups data={getRowHints(data)} />
        </div>
        <Puzzle data={data} answer={answer} onComplete={completeHandler} onUpdateAnswer={updateAnswer} checkAnswer={checkAnswer} />
      </div>
    </div>
  )
}

function App() {
  return(
    <Board />
  )
}

export default App;
