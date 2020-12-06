import { toKey } from "../utils/react/toKey"
import HintGroup from "./HintGroup"

function HintGroupList({ data, className }) {
  const groups = data.map((group, index) =>
    <HintGroup hints={group} key={toKey(data, group, index)} />
  );
  return <div className={`${className}`}>{groups}</div>
}

export default HintGroupList
