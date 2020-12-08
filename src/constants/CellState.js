import Enum from "../utils/Enum"

class CellState extends Enum {}

const instance = new CellState({
  UNKNOWN: -1,
  EMPTY: 0,
  FILLED: 1
})

export default instance
