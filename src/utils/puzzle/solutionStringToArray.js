const solutionStringToArray = (string, filledValue="█") => {
  return string
    .trim()
    .replace(/ +?/g, '')
    .split('\n')
    .map(row => row
      .split('')
      .map(col => Number(col === filledValue))
    )
}

export { solutionStringToArray }
