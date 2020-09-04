import sumUniqueHints from './sumUniqueHints'

const getRowHints = (data) => {
  return (data || []).map(row => sumUniqueHints(row))
}

export default getRowHints;
