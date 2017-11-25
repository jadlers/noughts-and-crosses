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
  const increments = {
    HORIZONTAL: 1,
    VERTICAL: settings.COLUMNS,
    SLASH: settings.COLUMNS - 1,
    BACKSLASH: settings.COLUMNS + 1
  };

  let lines = [];

  horizontalStart.map(i =>
    lines.push(createSequence(i, increments.HORIZONTAL))
  );
  verticalStart.map(i => lines.push(createSequence(i, increments.VERTICAL)));
  union.map(i => {
    lines.push(createSequence(i + settings.COLUMNS - 1, increments.SLASH));
    lines.push(createSequence(i, increments.BACKSLASH));
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

function createSequence(start, increment) {
  let seq = [];
  for (let i = 0; i < settings.SEQ_LEN; i++) {
    const index = start + i * increment;
    seq.push(index);
  }
  return seq;
}
