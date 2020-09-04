import solutionStringToArray from './solutionStringToArray';

test('with indentation, parses to an array', () => {
  const sample = `█ █ █ x x
                  █ x █ █ █`

  const expected = [
    [ 1, 1, 1, 0, 0 ],
    [ 1, 0, 1, 1, 1 ]
  ]

  expect(solutionStringToArray(sample)).toStrictEqual(expected)
})

test('with leading and trailing newlines, parses to an array', () => {
  const sample = `
    █ █ █ x x
    █ x █ █ █
    `

  const expected = [
    [ 1, 1, 1, 0, 0 ],
    [ 1, 0, 1, 1, 1 ]
  ]

  expect(solutionStringToArray(sample)).toStrictEqual(expected)
})

test('with no spaces between values, parses to an array', () => {
  const sample = `███xx
                  █x███`

  const expected = [
    [ 1, 1, 1, 0, 0 ],
    [ 1, 0, 1, 1, 1 ]
  ]
  expect(solutionStringToArray(sample)).toStrictEqual(expected)
})

test('with custom filled value, parses to an array', () => {
  const sample = `###__
                  #_###`

  const expected = [
    [ 1, 1, 1, 0, 0 ],
    [ 1, 0, 1, 1, 1 ]
  ]
  expect(solutionStringToArray(sample, "#")).toStrictEqual(expected)
})

test('with a larger solution, parses to an array', () => {
  const sample = `
    x x x █ █
    x x █ █ █
    x █ █ x █
    █ █ x x █
    █ █ █ █ █
    `

  const expected = [
    [ 0, 0, 0, 1, 1 ],
    [ 0, 0, 1, 1, 1 ],
    [ 0, 1, 1, 0, 1 ],
    [ 1, 1, 0, 0, 1 ],
    [ 1, 1, 1, 1, 1 ]
  ]
  expect(solutionStringToArray(sample)).toStrictEqual(expected)
})
