export function calculateWinner(squares) {
  const horizontalStart = validHorizontalStart(squares);
  const verticalStart = validVerticalStart(squares);
  const union = horizontalStart.filter(x => verticalStart.includes(x));

  let lines = [];

  horizontalStart.map(i => lines.push(horizontalSequence(i)));
  verticalStart.map(i => lines.push(verticalSequence(i)));

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

function validHorizontalStart(squares, columns = 3) {
  const numSquares = squares.length;
  let validRows = [];
  for (let i = 0; i < numSquares; i++) {
    const rowStart = Math.floor(i / columns);
    const rowEnd = Math.floor((i + 2) / columns);
    if (rowStart === rowEnd) {
      validRows.push(i);
    }
  }

  return validRows;
}

function validVerticalStart(squares, columns = 3) {
  const seqLength = 3;
  const numSquares = squares.length;
  let validRows = [];
  for (let i = 0; i < numSquares; i++) {
    const lastSquare = i + (seqLength - 1) * columns;
    if (lastSquare < numSquares) {
      validRows.push(i);
    }
  }

  return validRows;
}

function horizontalSequence(start) {
  const seqLength = 3;
  let res = [];
  for (let i = start; i < start + seqLength; i++) {
    res.push(i);
  }
  return res;
}

function verticalSequence(start) {
  const seqLength = 3;
  const rowLength = 3;
  let res = [];
  for (let i = start; i < start + seqLength * rowLength; i += rowLength) {
    res.push(i);
  }
  return res;
}

function backSlashSequence(start) {
  const seqLength = 3;
  const rowLength = 3;
  const lastIndex = start + (rowLength + 1) * (seqLength - 1);
  let res = [];
  for (let i = start; i <= lastIndex; i += rowLength + 1) {
    res.push(i);
  }
  return res;
}

function slashSequence(start) {
  const seqLength = 3;
  const rowLength = 3;
  const lastIndex = start + (rowLength - 1) * (seqLength - 1);
  let res = [];
  for (let i = start; i <= lastIndex; i += rowLength - 1) {
    res.push(i);
  }
  return res;
}
