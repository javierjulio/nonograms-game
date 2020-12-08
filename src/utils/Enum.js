class Enum {
  constructor(items) {
    for (let key in items) {
      this[key] =  items[key];
    }
    Object.freeze(this);
  }

  keys() {
    return Object.keys(this);
  }
}

export default Enum
