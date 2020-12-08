const sumUniqueHints = (array) => {
  const hints = [];
  let count = 0;

  for (let i = 0; i <= array.length; i++) {
    if (array[i] !== undefined && array[i] === 1) {
      count++;
    } else if (count > 0) {
      hints.push({ total: count, start: i - count, length: count });
      count = 0;
    }
  }

  if (hints.length === 0) {
    hints.push({ total: count, start: 0, length: array.length });
  }

  return hints;
};

export { sumUniqueHints }
