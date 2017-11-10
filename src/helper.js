export function calculateWinner(squares) {
  const lines = validHorizontal(squares);
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

function validHorizontal(squares, columns = 3) {
  const numSquares = squares.length;
  let validRows = [];
  for (let i = 0; i < numSquares; i++) {
    const rowStart = Math.floor(i / columns);
    const rowEnd = Math.floor((i + 2) / columns);
    if (rowStart === rowEnd) {
      validRows.push([i, i + 1, i + 2]);
    }
  }
  console.log(validRows);
  return validRows;
}
