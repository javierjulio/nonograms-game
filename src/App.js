import { useState, Component } from 'react';
import './App.css';
import { solveNonogram } from './utils/puzzle/solver';
import seedrandom from 'seedrandom';

import { getColumnHints } from './utils/puzzle/getColumnHints';
import { getRowHints } from './utils/puzzle/getRowHints';
import { toKey } from './utils/react/toKey';

import randomPuzzle from "./utils/puzzle/randomPuzzle";

import Hints from "./components/Hints"
import GridCell from "./components/GridCell"

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
    document.removeEventListener('pointermove', this.pointerMoveHandler)
    document.removeEventListener('pointerup', this.pointerUpHandler)
    this.cellState = null
    this.lastCell = null
    this.props.actionCompleted()
  }

  pointerLeaveHandler(event) {
    document.removeEventListener('pointermove', this.pointerMoveHandler)
  }

  renderGridCells() {
    return this.props.answer.map((row, rowIndex) => {
      return row.map((value, colIndex) => {
        return <GridCell value={value} row={rowIndex} column={colIndex}
                  key={toKey(rowIndex, colIndex)} />
        }
      )
    })
  }

  render () {
    return (
      <div className={`nonogram-grid grid-${this.props.cols}x${this.props.rows}`}
        onPointerDown={this.pointerDownHandler}
        onPointerLeave={this.pointerLeaveHandler}
        onTouchEnd={this.disableTouchAction}
        onContextMenu={this.disableContextMenu}>
        {this.renderGridCells()}
      </div>
    )
  }
}

const rng = seedrandom("JAVIERJ");

function Board({ data, rowHints, columnHints, newPuzzle }) {
  // TODO: create puzzleId from data
  //
  // > data.map(row => row.join('')).join(",")
  // > "11110,11010,11100,10010,10100,11110,11010,11100,10010,10100"
  //
  // which that string can also be parsed back into a 2d array
  // > string.split(",").map(row => row.split('').map(i => Number(i)))

  const [answer, setAnswer] = useState(() => {
    return Array.from({length: data.length}, () => new Array(data[0].length).fill(-1))
  })

  const updateAnswer = (row, column, value) => {
    answer[row][column] = value
    setAnswer([...answer])
  }

  const answered = () => {
    for (let i = 0; i < data.length; i++)
      for (let j = 0; j < data[i].length; j++)
        if (data[i][j] === 1 && answer[i][j] !== 1)
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

function App() {
  const sizes = [ [5, 5] ] // [10, 5] ]
  const generateSolvablePuzzle = () => {
    while (true) {
      const [rows, columns] = sizes[Math.floor(rng() * sizes.length)]
      const data = randomPuzzle(rng, rows, columns)
      const rowHints = getRowHints(data)
      const columnHints = getColumnHints(data)
      const nonogram = solveNonogram(rowHints.map((i) => i.map((c) => c.total)), columnHints.map((i) => i.map((c) => c.total)))
      console.log(`NEW PUZZLE ${columns}x${rows}`, nonogram.solved, nonogram.solution)
      if (nonogram.solved) {
        return { id: new Date().getTime(), puzzle: nonogram.solution, rowHints, columnHints }
      }
    }
  }

  const [data, setData] = useState(() => generateSolvablePuzzle())

  const newPuzzle = () => {
    setData(generateSolvablePuzzle())
  }

  return(
    <Board key={data.id} data={data.puzzle} rowHints={data.rowHints} columnHints={data.columnHints} newPuzzle={newPuzzle} />
  )
}

export default App;
