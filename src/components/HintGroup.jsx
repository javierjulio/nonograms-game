import { toKey } from "../utils/react/toKey"
import CellState from "../constants/CellState"

function HintGroup({ hints, line }) {
  const isHintSolved = (hint, line) => {
    const cells = (line || []).slice(hint.start, hint.start + hint.length)
    return cells.every((v) => (hint.total === 0 && v === CellState.EMPTY) || v === CellState.FILLED);
  }

  const numbers = hints.map((hint, index) => {
    let classNames = ["hint-num"]

    if (isHintSolved(hint, line)) {
      classNames.push("text-muted")
    }

    return <div className={classNames.join(" ")} key={toKey(hint, index)}>{hint.total}</div>
  });

  return <div className="hint-cell">{numbers}</div>
}

export default HintGroup;
