const sumUniqueHints = (array, callback=null) => {
  if (!callback) {
    callback = (value => value === 1);
  }

  return array.reduce((memo, value, index, target) => {
    if (callback(value)) {
      memo[memo.length - 1] += 1
    }
    else if (callback(target[index + 1]) && memo[memo.length - 1] > 0) {
      memo.push(0)
    }
    return memo
  }, [0])
};

export { sumUniqueHints }
