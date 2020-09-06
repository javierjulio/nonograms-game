const toKey = (...values) => {
  if (values.length === 0)
    throw new Error('At least one argument is required')

  return values
    .map(value => value.toString())
    .filter(value => value !== '')
    .join('_')
}

export { toKey }
