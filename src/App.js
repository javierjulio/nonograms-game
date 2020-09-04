import React from 'react';
import './App.css';

import getColumnHints from './utils/puzzle/getColumnHints';
import getRowHints from './utils/puzzle/getRowHints';

function toKey(...values) {
  return values.map(v => v.toString()).join('_')
}

function HintNumber(props) {
  return <div className="hint-num">{props.value}</div>
}

function HintGroup(props) {
  const numbers = props.hints.map((hint, index) =>
    <HintNumber value={hint} key={toKey(hint, index)} />
  );
  return <div className="hint-cell">{numbers}</div>
}

function App() {
  const data = [
    [ 1, 1, 1, 1, 0 ],
    [ 1, 1, 0, 1, 0 ],
    [ 1, 1, 1, 0, 0 ],
    [ 1, 0, 0, 1, 0 ],
    [ 1, 0, 1, 0, 0 ]
  ]
  const rowHints = getRowHints(data)
  const columnHints = getColumnHints(data)

  function renderHints(hints) {
    return hints.map((group, index) =>
      <HintGroup hints={group} key={toKey(group, index)} />
    )
  }

  function renderPuzzle(data) {
    return data.map((row, rowIndex) => {
      return row.map((_, colIndex) =>
        <div className="nonogram-cell" key={toKey(rowIndex, colIndex)}></div>
      )
    })
  }

  let lastCell;

  const mouseMoveHandler = (event) => {
    console.log('mousemove', event.button)

    let cell = event.target.closest('.nonogram-cell')

    if (!cell || lastCell === cell)
      return;

    if (event.button === LEFT_MOUSE_CLICK) {
      if (clearSelection) {
        cell.classList.remove('crossed', 'filled')
      } else if (!cell.classList.contains('crossed') && !cell.classList.contains('filled')) {
        // cell.classList.remove('crossed')
        cell.classList.add('filled')
      }
    }
    else if (event.button === RIGHT_MOUSE_CLICK) {
      if (!cell.classList.contains('crossed') && !cell.classList.contains('filled')) {
        // cell.classList.remove('filled')
        cell.classList.add('crossed')
      }
    }

    lastCell = cell
  }

  const contextMenuHandler = (event) => {
    console.log('right click')
    event.preventDefault()
  }

  const LEFT_MOUSE_CLICK = 0
  const RIGHT_MOUSE_CLICK = 2

  let clearSelection = false;

  const mouseUpHandler = (event) => {
    console.log('mouse up')
    clearSelection = false;
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)

    // reset answer each time
    let answer = new Array(data.length).fill().map(() => new Array(data[0].length).fill())

    document.querySelectorAll('.nonogram-cell').forEach((value, index) => {
      let numCols = answer[0].length
      let rowIndex = Math.floor(index / numCols)
      let colIndex = index % numCols

      if (value.classList.contains('filled')) {
        answer[rowIndex][colIndex] = 1
      }
      else if (value.classList.contains('crossed')) {
        answer[rowIndex][colIndex] = 0
      }
    })

    console.log('answer', JSON.stringify(data) === JSON.stringify(answer))
  }

  const mouseDownHandler = (event) => {
    console.log('mousedown', event.button)

    let cell = event.target.closest('.nonogram-cell')
    if (cell) {
      if (event.button === LEFT_MOUSE_CLICK) {
        if (cell.classList.contains('crossed') || cell.classList.contains('filled')) {
          clearSelection = true;
          cell.classList.remove('crossed', 'filled')
        }
        else {
          cell.classList.add('filled')
          cell.classList.remove('crossed')
        }
      }
      else if (event.button === RIGHT_MOUSE_CLICK) {
        cell.classList.add('crossed')
        cell.classList.remove('filled')
      }

      if (event.button === LEFT_MOUSE_CLICK || event.button === RIGHT_MOUSE_CLICK) {
        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseup', mouseUpHandler)
      }
    }
  }

  return (
    <div>
      <div className="full-grid">
        <div className="column-hints">
          {renderHints(columnHints)}
        </div>
        <div className="row-hints">
          {renderHints(rowHints)}
        </div>
        <div className="nonogram-grid" onMouseDown={mouseDownHandler} onContextMenu={contextMenuHandler}>
          {renderPuzzle(data)}
        </div>
      </div>
      <a className="App-link" href="https://reactjs.org">
        Learn React
      </a>
    </div>
  );
}

export default App;
