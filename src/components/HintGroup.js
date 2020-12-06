import { toKey } from "../utils/react/toKey"
import HintNumber from "./HintNumber"

function HintGroup(props) {
  const numbers = props.hints.map((hint, index) =>
    <HintNumber value={hint} key={toKey(hint, index)} />
  );
  return <div className="hint-cell">{numbers}</div>
}

export default HintGroup;
