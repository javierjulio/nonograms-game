import { draw } from './asciiDraw';

test('ascii draw', () => {
  const data = [
    [ 1, 1, 1, 0, 0 ],
    [ 1, 1, 1, 1, 1 ],
    [ 1, 1, 1, 0, 0 ],
    [ 1, 0, 1, 1, 0 ],
    [ 1, 0, 1, 0, 0 ]
  ]
  const rowHints = [ [3], [5], [3], [1, 2], [1, 1] ]
  const columnHints = [ [5], [3], [5], [1, 1], [1] ]
  // console.log(draw(rowHints, columnHints, data))

  const output = [
    "       1 ",
    "         ",
    "    53511",
    // "",
    "  3 ███░░",
    "  5 █████",
    "  3 ███░░",
    "1 2 █░██░",
    "1 1 █░█░░",
    ""
  ].join('\n')

  expect(draw(rowHints, columnHints, data)).toBe(output)
})
