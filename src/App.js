import React, { useState } from 'react'
import './App.css';

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

function GridCells({ data }) {
  return data.map((row, rowIndex) => {
    return row.map((_, colIndex) =>
      <div className="nonogram-cell" title={`row ${rowIndex+1}, column ${colIndex+1}`} key={toKey(data, rowIndex, colIndex)}></div>
    )
  })
}

function Puzzle({ data, onComplete }) {
  const rowHints = getRowHints(data)
  const columnHints = getColumnHints(data)

  const contextMenuHandler = (event) => {
    console.log('right click')
    event.preventDefault()
  }

  // for left mouse click its different on pointermove but right mouse click is the same
  // https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#Determining_button_states
  const LEFT_MOUSE_CLICK = 1
  const RIGHT_MOUSE_CLICK = 2

  let lastCell;

  const EMPTY = -1;
  const CROSSED = 0;
  const FILLED = 1;
  let cellState;

  const updateCellForState = (cell, state) => {
    if (state === FILLED) {
      cell.classList.remove('crossed')
      cell.classList.add('filled')
    }
    else if (state === CROSSED) {
      cell.classList.remove('filled')
      cell.classList.add('crossed')
    }
    else {
      cell.classList.remove('filled', 'crossed')
    }
  }

  const getCellFromEvent = (event) => {
    const target = (event.pointerType === 'mouse') ?
      event.target :
      document.elementFromPoint(event.clientX, event.clientY)

    if (target)
      return target.closest('.nonogram-cell')
  }

  const pointerDownHandler = (event) => {
    console.log('pointerDown', event.pointerType, event.button, event.buttons)
    lastCell = null
    cellState = null

    let cell = getCellFromEvent(event)

    if (!cell)
      return;

    if (event.buttons === LEFT_MOUSE_CLICK) { // same value for left mouse, touch contact, pen contact
      if (cell.classList.contains('crossed')) {
        cellState = EMPTY
      }
      else if (cell.classList.contains('filled')) {
        cellState = CROSSED
      }
      else {
        cellState = FILLED
      }
    }
    else if (event.buttons === RIGHT_MOUSE_CLICK) {
      cellState = CROSSED
    }

    if (cellState !== null) {
      updateCellForState(cell, cellState)
      document.addEventListener('pointermove', pointerMoveHandler)
      document.addEventListener('pointerup', pointerUpHandler)
    }
  }

  const pointerMoveHandler = (event) => {
    console.log('pointerMove', event.pointerType, event.button, event.buttons)

    let cell = getCellFromEvent(event)

    if (!cell || lastCell === cell)
      return;

    if (cellState === EMPTY || (!cell.classList.contains('crossed') && !cell.classList.contains('filled'))) {
      updateCellForState(cell, cellState)
    }

    lastCell = cell
  }

  // using touch-action: none; works but is not enough to prevent a quick double tap to zoom
  const disableTouchAction = (event) => {
    console.log('disable touch action');
    event.preventDefault();
  }

  const pointerUpHandler = (event) => {
    console.log('pointerUp');

    document.removeEventListener('pointermove', pointerMoveHandler)
    document.removeEventListener('pointerup', pointerUpHandler)

    cellState = null;
    lastCell = null;

    // 1) Reset answer each time
    // 2) Set cell default value to 0, otherwise all cells have to
    //    be updated, only the correct ones should matter
    let answer = new Array(data.length).fill().map(() => new Array(data[0].length).fill(0))

    document.querySelectorAll('.nonogram-cell').forEach((value, index) => {
      let numCols = answer[0].length
      let rowIndex = Math.floor(index / numCols)
      let colIndex = index % numCols

      if (value.classList.contains('filled')) {
        answer[rowIndex][colIndex] = 1
      }
    })

    if (JSON.stringify(data) === JSON.stringify(answer)) {
      console.log('SOLVED!!')
      onComplete(answer)
    }
  }

  const pointerLeaveHandler = (event) => {
    console.log('pointerLeave');
    document.removeEventListener('pointermove', pointerMoveHandler)
    document.removeEventListener('pointerup', pointerUpHandler)
  }

  return (
    <div className="disable-text-selection">
      <div className="full-grid">
        <div className="column-hints">
          <HintGroups data={columnHints} />
        </div>
        <div className="row-hints">
          <HintGroups data={rowHints} />
        </div>
        <div className={`nonogram-grid grid-${data[0].length}x${data.length}`}
          onPointerDown={pointerDownHandler}
          onPointerLeave={pointerLeaveHandler}
          onTouchEnd={disableTouchAction}
          onContextMenu={contextMenuHandler}>
          <GridCells data={data} />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState(
    // [
    //   [ 1, 1, 1, 1, 0 ],
    //   [ 1, 1, 0, 1, 0 ],
    //   [ 1, 1, 1, 0, 0 ],
    //   [ 1, 0, 0, 1, 0 ],
    //   [ 1, 0, 1, 0, 0 ]
    // ]
    [
      [ 1, 1, 1, 1, 0, 1, 1, 1, 1, 0 ],
      [ 1, 1, 0, 1, 0, 1, 1, 1, 1, 0 ],
      [ 1, 1, 1, 0, 0, 1, 1, 1, 1, 0 ],
      [ 1, 0, 0, 1, 0, 1, 1, 1, 1, 0 ],
      [ 1, 0, 1, 0, 0, 1, 1, 1, 1, 0 ]
    ]
  )

  let newData = [
    [ 1, 1, 1, 1, 0 ],
    [ 1, 1, 0, 1, 0 ],
    [ 1, 1, 1, 0, 0 ],
    [ 1, 0, 0, 1, 0 ],
    [ 1, 0, 1, 0, 0 ],
    [ 1, 1, 1, 1, 0 ],
    [ 1, 1, 0, 1, 0 ],
    [ 1, 1, 1, 0, 0 ],
    [ 1, 0, 0, 1, 0 ],
    [ 1, 0, 1, 0, 0 ]
  ]

  const completeHandler = (answer) => {
    console.log('COMPLETED! Your answer:', answer)
    setData(newData)
  }

  return(
    <Puzzle data={data} onComplete={completeHandler} />
  )
}

export default App;
