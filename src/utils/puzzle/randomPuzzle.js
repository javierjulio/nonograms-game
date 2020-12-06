function randomFromRange(min, max, rng) { // min and max are included
  return Math.floor(rng() * (max - min + 1) + min);
}

function randomPuzzle(rng, rows, cols) {
  return Array.from({length: rows}, () => {
    let cells = []
    let num = randomFromRange(1, cols, rng)
    let value = randomFromRange(0, 1, rng)
    while (cells.length < cols) {
      cells.push(...new Array(num).fill(value))
      value = 1 - value
      num = randomFromRange(1, cols - cells.length, rng)
    }
    return cells
  })
}

export default randomPuzzle;
