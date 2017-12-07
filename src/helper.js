let settings;

export function calculateWinner(squares, boardConfig) {
  settings = boardConfig;
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
  const intersection = horizontalStart.filter(x => verticalStart.includes(x));
  const increments = {
    HORIZONTAL: 1,
    VERTICAL: settings.columns,
    SLASH: settings.columns - 1,
    BACKSLASH: settings.columns + 1
  };

  let lines = [];

  horizontalStart.map(i =>
    lines.push(createSequence(i, increments.HORIZONTAL))
  );
  verticalStart.map(i => lines.push(createSequence(i, increments.VERTICAL)));
  intersection.map(i => {
    lines.push(createSequence(i + settings.seq_len - 1, increments.SLASH));
    lines.push(createSequence(i, increments.BACKSLASH));
  });

  return lines;
}

function getRow(index, columns) {
  return Math.floor(index / columns);
}

function zeroToNumArray(end) {
  return Array.from(Array(end).keys());
}

function validHorizontalStart(squares) {
  const { columns, seq_len } = settings;
  const row = i => getRow(i, columns);
  const indices = zeroToNumArray(squares.length);

  return indices.filter(index => {
    const endIndex = index + seq_len - 1;
    return row(index) === row(endIndex);
  });
}

function validVerticalStart(squares) {
  const { columns, seq_len } = settings;
  let validRows = [];

  for (let i = 0; i < squares.length; i++) {
    const lastSquare = i + (seq_len - 1) * columns;
    if (lastSquare < squares.length) {
      validRows.push(i);
    }
  }

  return validRows;
}

function createSequence(start, increment) {
  let seq = [];
  for (let i = 0; i < settings.seq_len; i++) {
    const index = start + i * increment;
    seq.push(index);
  }
  return seq;
}
