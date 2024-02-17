import { toKey } from "../utils/react/toKey"
import HintGroup from "./HintGroup"

function Hints({ puzzle, data, className, type }) {
  const groups = data.map((group, index) => {
    const lineData = type === "row" ? puzzle[index] : puzzle.map((row) => row[index]);

    return <HintGroup hints={group}
      line={lineData}
      key={toKey(data, group, index)} />
  })

  return <div className={`${className}`}>{groups}</div>
}

export default Hints
