import { memo } from "react";

const GridCell = memo(({value, row, column}) => {
  const classStates = [ "crossed", "filled" ]
  const className = classStates[value] || ""

  return (
    <div className={`nonogram-cell ${className}`}
      title={`row ${row+1}, column ${column+1}`}
      data-row={row} data-column={column}>
    </div>
  )
})

export default GridCell;
