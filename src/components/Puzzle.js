import { Component } from 'react';
import { toKey } from '../utils/react/toKey';
import GridCell from "./GridCell"

// for left mouse click its different on pointermove but right mouse click is the same
// https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#Determining_button_states
const RIGHT_MOUSE_POINTER = 2

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

    if (event.isPrimary) {
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
    else if (event.buttons === RIGHT_MOUSE_POINTER) {
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

export default Puzzle
