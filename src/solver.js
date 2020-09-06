// A port of the Nonogram solver by fedimser
// https://fedimser.github.io/nonogram
// https://github.com/fedimser/fedimser.github.io/blob/master/js/Nonogram.js

class Line {
  constructor(groups) {
    this.groups = groups;
    this.gn = groups.length;

    if (this.gn > 0) {
      this.restLength = new Array(this.gn).fill(0)
      this.restLength[this.gn - 1] = groups[this.gn - 1];
      for (var i = this.gn - 2; i >= 0; i--) {
        this.restLength[i] = groups[i] + 1 + this.restLength[i + 1];
      }
    }
  }

  setCells(cells) {
    this.length = cells.length;
    this.cells = cells;

    this.sure = new Array(this.length).fill(0)
    for (var i = 0; i < this.length; i++) {
      if (this.cells[i] != 0)
        this.sure[i] = 1;
    }

    this.cur = new Array(this.length).fill(0);
    this.ansLine = new Array(this.length).fill(0);
  }

  checkFinal(pos) {
    for (var i = pos; i < this.length; i++)
      if (this.cells[i] == 1)
        return;

    for (var i = 0; i < this.length; i++) {
      if (this.ansLine[i] == 0)
        this.ansLine[i] = this.cur[i];
      else if (this.ansLine[i] != this.cur[i]) {
        this.ansLine[i] = 2;
        this.cells[i] = 0; this.sure[i] = 1;
      }
    }
    this.realFound++;
  }

  rec(g, pos) {
    if (this.realFound > 0)
      return;

    if (pos + this.restLength[g] > this.length)
      return;

    var ok = true;
    for (var i = pos; i < pos + this.groups[g]; i++) {
      if (this.cells[i] == -1) {
        ok = false;
        break;
      }
      this.cur[i] = 1;
    }

    if (pos + this.groups[g] < this.length && this.cells[pos + this.groups[g]] == 1) {
      ok = false;
    }

    if (ok) {
      if (g == this.gn - 1)
        this.checkFinal(pos + this.groups[g]);
      else {
        for (var i = pos + this.groups[g] + 1; i < this.length; ++i) {
          this.rec(g + 1, i);
          if (this.cells[i] == 1)
            break;
        }
      }
    }

    for (var i = pos; i < pos + this.groups[g]; i++) {
      this.cur[i] = 0;
    }
  }

  isFeasible() {
    if (this.gn == 0) {
      for (var i = 0; i < this.length; ++i)
        if (this.cells[i] == 1)
          return false;
      return true;
    }

    this.realFound = 0;
    for (var i = 0; i < this.length; ++i) {
      //console.log("TRYING FROM " + i + "...");
      this.rec(0, i);
      if (this.cells[i] == 1)
        break;
    }
    return (this.realFound != 0);
  }

  isModificationFeasible(pos, val) {
    if (this.ansLine[pos] == 2 || this.ansLine[pos] == val)
      return true;

    var tmp = this.cells[pos];
    this.cells[pos] = val;
    var ans = this.isFeasible();
    this.cells[pos] = tmp;
    return ans;
  }

  solve() {
    if (!this.isFeasible())
      return false;

    for (var i = 0; i < this.length; ++i) {
      // console.log("Checking "+i+" ...");
      if (this.sure[i] == 1)
        continue;

      if (!this.isModificationFeasible(i, 1))
        this.cells[i] = -1;
      else if (!this.isModificationFeasible(i, -1))
        this.cells[i] = 1;
      else
        this.cells[i] = 0;

      this.sure[i] = 1;
    }

    return true;
  }
}

class NonogramSolver {

  static solve(rowHints, columnHints) {
    const nonogram = new NonogramSolver(rowHints, columnHints)
    const solved = nonogram.solve()
    return { solved, solution: nonogram.solution() }
  }

  constructor(rowHints, columnHints) {
    this.width = columnHints.length;
    this.height = rowHints.length;

    // this.matrix = new Array(this.height).fill().map(() => new Array(this.width).fill(0))
    this.matrix = Array.from({length: this.height}, () => new Array(this.width).fill(0))
    // this.matrix = Array.from({length: this.height}, () => new Int8Array(this.width))

    // this.rows = [];
    // this.columns = [];

    this.rows = rowHints.map((hint) => new Line(hint))
    this.columns = columnHints.map((hint) => new Line(hint))

    // this.rows = new Array(this.height).fill().map((_, i) => new Line(rowHints[i]));

    // console.log(temprows, this.rows, JSON.stringify(temprows))
    // console.log(JSON.stringify(temprows) === JSON.stringify(this.rows))

    // this.rows = Array.from({length: this.height}, (v, i) => new Line(rowHints[i]));
    // this.columns = new Array(this.width).fill().map((_, i) => new Line(columnHints[i]));

    // for (var i = 0; i < this.height; i++) this.rows.push(new Line(rowHints[i]));
    // for (var i = 0; i < this.width; i++) this.columns.push(new Line(columnHints[i]));
  }

  solution() {
    // convert -1 to 0, otherwise matrix is 1 or -1, we need 0=empty, 1=filled
    this.matrix.map(row => row.map(col => (col === -1) ? 0 : col))
  }

  getColumn(j) {
    // let result = new Array(this.height).fill().map((_, i) => this.matrix[i][j]);
    return Array.from({length: this.height}, (_, i) => this.matrix[i][j]);
    // return result;
    // var ans = [];
    // for (var i = 0; i < this.height; i++)
    //   ans.push(this.matrix[i][j]);
    // return ans;
  }

  updateMatrix(x, y, value) {
    if (this.matrix[x][y] == 0 && value != 0) {
      this.matrix[x][y] = value;
      this.changed = true;
    }
  }

  isComplete() {
    for (var i = 0; i < this.height; i++)
      for (var j = 0; j < this.width; j++)
        if (this.matrix[i][j] == 0) return false;
    // for (const row of this.matrix)
    //   for (const col of row)
    //     if (col == 0) return false;
    return true;
  }

  process() {
    do {
      this.changed = false;
      for (var i = 0; i < this.height; i++) {
        this.rows[i].setCells(this.matrix[i]);
        if (!this.rows[i].solve()) return false;
        for (var j = 0; j < this.width; j++) this.updateMatrix(i, j, this.rows[i].cells[j]);
      }

      for (var i = 0; i < this.width; i++) {
        this.columns[i].setCells(this.getColumn(i));
        if (!this.columns[i].solve()) return false;
        for (var j = 0; j < this.height; j++) this.updateMatrix(j, i, this.columns[i].cells[j]);
      }
    } while (this.changed);
    return true;
  }

  solve() {
    if (!this.process()) return false;  // Impossible
    if (!this.isComplete()) return false;  // Multiple Solutions
    return true;
  }
}

const solveNonogram = (rowHints, columnHints) => {
  // let nonogram = new NonogramSolver(rowHints, columnHints)
  // let solved = nonogram.solve()
  // if (solved) {
  //   console.log(nonogram.solution())
  // }
  const { solved, solution } = NonogramSolver.solve(rowHints, columnHints)
  // console.log(solution)
  return { solved, solution }
}

export { solveNonogram }
