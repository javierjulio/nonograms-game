import { memo } from "react";
import { ReactComponent as XIcon } from "../svgs/x.svg";

const GridCell = memo(({value, row, column}) => {
  const classStates = [ "crossed", "filled" ]
  const className = classStates[value] || "unknown"

  let contents = ""
  if (className === "crossed") {
    contents = <XIcon />
  }

  return (
    <div className={`nonogram-cell ${className}`}
      title={`row ${row+1}, column ${column+1}`}
      data-row={row} data-column={column}>
      { contents }
    </div>
  )
})

export default GridCell;
