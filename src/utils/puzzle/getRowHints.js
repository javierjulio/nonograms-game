import { sumUniqueHints } from './sumUniqueHints'

const getRowHints = (data) => {
  return (data || []).map(row => sumUniqueHints(row))
}

export { getRowHints }
