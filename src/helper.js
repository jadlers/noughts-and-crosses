const settings = {
  ROWS: 3,
  COLUMNS: 3,
  SEQ_LEN: 3
};

export function calculateWinner(squares) {
  const lines = getValidSequences(squares);

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

function getValidSequences(squares) {
  const horizontalStart = validHorizontalStart(squares);
  const verticalStart = validVerticalStart(squares);
  const union = horizontalStart.filter(x => verticalStart.includes(x));

  let lines = [];

  horizontalStart.map(i => lines.push(horizontalSequence(i)));
  verticalStart.map(i => lines.push(verticalSequence(i)));
  union.map(i => {
    lines.push(slashSequence(i + settings.COLUMNS - 1));
    lines.push(backSlashSequence(i));
  });

  return lines;
}

function validHorizontalStart(squares) {
  const { COLUMNS } = settings;
  let validRows = [];

  for (let i = 0; i < squares.length; i++) {
    const rowStart = Math.floor(i / COLUMNS);
    const rowEnd = Math.floor((i + 2) / COLUMNS);
    if (rowStart === rowEnd) {
      validRows.push(i);
    }
  }

  return validRows;
}

function validVerticalStart(squares) {
  const { COLUMNS, SEQ_LEN } = settings;
  let validRows = [];

  for (let i = 0; i < squares.length; i++) {
    const lastSquare = i + (SEQ_LEN - 1) * COLUMNS;
    if (lastSquare < squares.length) {
      validRows.push(i);
    }
  }

  return validRows;
}

function horizontalSequence(start) {
  const { SEQ_LEN } = settings;
  let res = [];

  for (let i = start; i < start + SEQ_LEN; i++) {
    res.push(i);
  }

  return res;
}

function verticalSequence(start) {
  const { SEQ_LEN, ROWS } = settings;
  let res = [];

  for (let i = start; i < start + SEQ_LEN * ROWS; i += ROWS) {
    res.push(i);
  }

  return res;
}

function backSlashSequence(start) {
  const { SEQ_LEN, ROWS } = settings;
  const lastIndex = start + (ROWS + 1) * (SEQ_LEN - 1);
  let res = [];

  for (let i = start; i <= lastIndex; i += ROWS + 1) {
    res.push(i);
  }

  return res;
}

function slashSequence(start) {
  const { SEQ_LEN, ROWS } = settings;
  const lastIndex = start + (ROWS - 1) * (SEQ_LEN - 1);
  let res = [];

  for (let i = start; i <= lastIndex; i += ROWS - 1) {
    res.push(i);
  }

  return res;
}
