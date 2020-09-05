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

  const contextMenuHandler = (event) => {
    console.log('right click')
    event.preventDefault()
  }

  const LEFT_MOUSE_CLICK = 0
  const RIGHT_MOUSE_CLICK = 2

  // let clearSelection;
  let lastCell;

  // const mouseMoveHandler = (event) => {
  //   console.log('mousemove', event.button)

  //   let cell = event.target.closest('.nonogram-cell')

  //   if (!cell || lastCell === cell)
  //     return;

  //   if (event.button === LEFT_MOUSE_CLICK) {
  //     if (clearSelection) {
  //       cell.classList.remove('crossed', 'filled')
  //     } else if (!cell.classList.contains('crossed') && !cell.classList.contains('filled')) {
  //       // cell.classList.remove('crossed')
  //       cell.classList.add('filled')
  //     }
  //   }
  //   else if (event.button === RIGHT_MOUSE_CLICK) {
  //     if (!cell.classList.contains('crossed') && !cell.classList.contains('filled')) {
  //       // cell.classList.remove('filled')
  //       cell.classList.add('crossed')
  //     }
  //   }

  //   lastCell = cell
  // }

  // const mouseUpHandler = (event) => {
  //   console.log('mouse up')
  //   clearSelection = false;
  //   document.removeEventListener('mousemove', mouseMoveHandler)
  //   document.removeEventListener('mouseup', mouseUpHandler)

  //   // reset answer each time
  //   // set cell value to 0, otherwise all cells have to be updated
  //   let answer = new Array(data.length).fill().map(() => new Array(data[0].length).fill(0))

  //   document.querySelectorAll('.nonogram-cell').forEach((value, index) => {
  //     let numCols = answer[0].length
  //     let rowIndex = Math.floor(index / numCols)
  //     let colIndex = index % numCols

  //     if (value.classList.contains('filled')) {
  //       answer[rowIndex][colIndex] = 1
  //     }
  //     else if (value.classList.contains('crossed')) {
  //       answer[rowIndex][colIndex] = 0
  //     }
  //   })

  //   console.log('answer', JSON.stringify(data) === JSON.stringify(answer))
  // }

  // const mouseDownHandler = (event) => {
  //   console.log('mousedown', event.button)

  //   let cell = event.target.closest('.nonogram-cell')
  //   if (cell) {
  //     if (event.button === LEFT_MOUSE_CLICK) {
  //       if (cell.classList.contains('crossed') || cell.classList.contains('filled')) {
  //         clearSelection = true;
  //         cell.classList.remove('crossed', 'filled')
  //       }
  //       else {
  //         cell.classList.add('filled')
  //         cell.classList.remove('crossed')
  //       }
  //     }
  //     else if (event.button === RIGHT_MOUSE_CLICK) {
  //       cell.classList.add('crossed')
  //       cell.classList.remove('filled')
  //     }

  //     if (event.button === LEFT_MOUSE_CLICK || event.button === RIGHT_MOUSE_CLICK) {
  //       document.addEventListener('mousemove', mouseMoveHandler)
  //       document.addEventListener('mouseup', mouseUpHandler)
  //     }
  //   }
  // }

  const EMPTY = -1;
  const CROSSED = 0;
  const FILLED = 1;
  let cellState;

  const updateCellForState = (cell, state, override=true) => {
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

  const pointerDownHandler = (event) => {
    console.log('pointerDown', event.pointerType, event.button, event.buttons)
    lastCell = null
    cellState = null

    let cell;
    if (event.pointerType === 'mouse') {
      cell = event.target.closest('.nonogram-cell')
    } else {
      let target = document.elementFromPoint(event.clientX, event.clientY);
      cell = target.closest('.nonogram-cell')
    }

    if (!cell)
      return;

    if (event.pointerType === 'mouse') {
      if (event.button === LEFT_MOUSE_CLICK) {
        if (cell.classList.contains('crossed')) {
          // clearSelection = true;
          // cell.classList.remove('crossed')
          cellState = EMPTY
        }
        else if (cell.classList.contains('filled')) {
          // cell.classList.replace('filled', 'crossed')
          cellState = CROSSED
        }
        else {
          // cell.classList.add('filled')
          cellState = FILLED
        }

        // if (cell.classList.contains('crossed') || cell.classList.contains('filled')) {
        //   clearSelection = true;
        //   cell.classList.remove('crossed', 'filled')
        // }
        // else {
        //   cell.classList.add('filled')
        //   cell.classList.remove('crossed')
        // }
      }
      else if (event.button === RIGHT_MOUSE_CLICK) {
        // cell.classList.add('crossed')
        // cell.classList.remove('filled')
        cellState = CROSSED
      }
    }

    if (event.pointerType === 'touch') {
      if (cell.classList.contains('crossed')) {
        // clearSelection = true;
        // cell.classList.remove('crossed')
        cellState = EMPTY

      }
      else if (cell.classList.contains('filled')) {
        // cell.classList.replace('filled', 'crossed')
        cellState = CROSSED
      }
      else {
        // cell.classList.add('filled')
        cellState = FILLED
      }

      // if (event.button === LEFT_MOUSE_CLICK) {
        // if (cell.classList.contains('crossed') || cell.classList.contains('filled')) {
        //   clearSelection = true;
        //   cell.classList.remove('crossed', 'filled')
        // }
        // else {
        //   cell.classList.add('filled')
        //   cell.classList.remove('crossed')
        // }
      // }
      // else if (event.button === RIGHT_MOUSE_CLICK) {
      //   cell.classList.add('crossed')
      //   cell.classList.remove('filled')
      // }
    }

    if (cellState !== null) {
      updateCellForState(cell, cellState)
    }

    document.addEventListener('pointermove', pointerMoveHandler)
    document.addEventListener('pointerup', pointerUpHandler)
  }

  const pointerMoveHandler = (event) => {
    console.log('pointerMove', event.pointerType, event.buttons)

    let cell;
    if (event.pointerType === 'mouse') {
      cell = event.target.closest('.nonogram-cell')
    } else {
      let target = document.elementFromPoint(event.clientX, event.clientY);
      cell = target.closest('.nonogram-cell')
    }

    if (!cell || lastCell === cell) {
      return;
    }

    if (event.pointerType === 'mouse') {
      if (event.buttons === 1) { // for left mouse click (different on pointermove) https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#Determining_button_states
        if(cellState !== EMPTY && (cell.classList.contains('crossed') || cell.classList.contains('filled'))) {
        }
        else {
          updateCellForState(cell, cellState)
        }
        // if (clearSelection) {
        //   cell.classList.remove('crossed', 'filled')
        // }
        // if (cell.classList.contains('crossed')) {
        //   clearSelection = true;
        //   cell.classList.remove('crossed')
        // }
        // else if (cell.classList.contains('filled')) {
        //   cell.classList.replace('filled', 'crossed')
        //   cell.classList.add('crossed')
        // }
        // else {
        //   cell.classList.add('filled')
        // }

        // if (clearSelection) {
        //   cell.classList.remove('crossed', 'filled')
        // } else if (!cell.classList.contains('crossed') && !cell.classList.contains('filled')) {
        //   // cell.classList.remove('crossed')
        //   cell.classList.add('filled')
        // }
      }
      else if (event.buttons === RIGHT_MOUSE_CLICK) { // stays the same with pointermove
        if (!cell.classList.contains('crossed') && !cell.classList.contains('filled')) {
          // cell.classList.remove('filled')
          // cell.classList.add('crossed')
          updateCellForState(cell, cellState)
        }
      }
    }

    if (event.pointerType === 'touch') {
      if(cellState !== EMPTY && (cell.classList.contains('crossed') || cell.classList.contains('filled'))) {
      }
      else {
        updateCellForState(cell, cellState)
      }

      // if (event.buttons === 1) { // for left mouse click (different on pointermove) https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events#Determining_button_states
        // if (clearSelection) {
        //   cell.classList.remove('crossed', 'filled')
        // } else if (!cell.classList.contains('crossed') && !cell.classList.contains('filled')) {
        //   // cell.classList.remove('crossed')
        //   cell.classList.add('filled')
        // }
      // }
      // else if (event.buttons === RIGHT_MOUSE_CLICK) { // stays the same with pointermove
      //   if (!cell.classList.contains('crossed') && !cell.classList.contains('filled')) {
      //     // cell.classList.remove('filled')
      //     cell.classList.add('crossed')
      //   }
      // }
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
    lastCell = null;
    cellState = null;
    document.removeEventListener('pointermove', pointerMoveHandler)
    document.removeEventListener('pointerup', pointerUpHandler)

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
      else if (value.classList.contains('crossed')) {
        answer[rowIndex][colIndex] = 0
      }
    })

    if (JSON.stringify(data) === JSON.stringify(answer)) {
      console.log('SOLVED!!')
      alert("Solved!")
    }
  }

  return (
    <div className="disable-text-selection">
      <div className="full-grid">
        <div className="column-hints">
          {renderHints(columnHints)}
        </div>
        <div className="row-hints">
          {renderHints(rowHints)}
        </div>
        <div className="nonogram-grid" onTouchEnd={disableTouchAction} onPointerDown={pointerDownHandler} onContextMenu={contextMenuHandler}>
        {/* <div className="nonogram-grid" onPointerDown={pointerDownHandler} onMouseDown={mouseDownHandler} onContextMenu={contextMenuHandler} onTouchStart={touchStartHandler}> */}
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
