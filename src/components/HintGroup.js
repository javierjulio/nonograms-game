import { toKey } from "../utils/react/toKey"

function HintGroup({ hints, line }) {
  const isHintSolved = (hint, line) => {
    const cells = (line || []).slice(hint.start, hint.start + hint.length)
    return cells.every((v) => (hint.total === 0 && v === 0) || v === 1);
  }

  const numbers = hints.map((hint, index) => {
    let styles = {}

    if (isHintSolved(hint, line)) {
      styles = {color: "#AAA"}
    }

    return <div className="hint-num" style={styles} key={toKey(hint, index)}>{hint.total}</div>
  });

  return <div className="hint-cell">{numbers}</div>
}

export default HintGroup;
