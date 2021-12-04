// Day 4: Giant Squid
// Part One
const { input } = require("./input.js");
const { run } = require("../../util/run.js");

run(() => {
  let [numbers, ...boards] = input.split("\n\n");
  numbers = numbers.split(",").map(Number);
  const locationMap = new Map();
  boards = boards.map((b, boardNo) =>
    b.split("\n").map((row, rowNo) =>
      row
        .trim()
        .split(/\s+/)
        .map((n, colNo) => {
          locationMap.set(
            Number(n),
            (locationMap.get(Number(n)) || []).concat({
              board: boardNo,
              row: rowNo,
              col: colNo,
            })
          );
          return { number: Number(n), marked: false };
        })
    )
  );

  const draw = (n = 1) => {
    if (n < 1) return;
    drawIndex++;
    const locations = locationMap.get(numbers[drawIndex]) ?? [];
    for (const location of locations) {
      boards[location.board][location.row][location.col].marked = true;
      if (checkBingo(location)) {
        bingo = location.board;
        return;
      }
    }
    draw(n - 1);
  };

  const checkBingo = ({ board, row, col }) => {
    if (boards[board][row].every((el) => el.marked)) return true;
    if (boards[board].every((row) => row[col].marked)) return true;
    return false;
  };

  const calculateScore = (board, number) => {
    const unmarkedSum = board
      .reduce((allNumbers, currentRow) => allNumbers.concat(currentRow), [])
      .reduce(
        (sum, element) => (element.marked ? sum : sum + element.number),
        0
      );
    return unmarkedSum * number;
  };

  let bingo = null;
  let drawIndex = -1;

  draw(5);
  while (bingo == null) {
    draw();
  }

  return { output: calculateScore(boards[bingo], numbers[drawIndex]) };
});
