let settings = {
  rows: 3,
  columns: 3,
  seq_len: 3
};

export default function calculateWinner(squares, boardConfig) {
  settings = Object.assign({}, settings, boardConfig);
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

  let lines = addLines(horizontalStart, increments.HORIZONTAL);
  lines = lines.concat(addLines(verticalStart, increments.VERTICAL));
  lines = lines.concat(addLines(intersection, increments.BACKSLASH));
  lines = lines.concat(
    addLines(intersection.map(i => i + settings.seq_len - 1), increments.SLASH)
  );

  return lines;
}

function addLines(indices, increment) {
  const array = indices.map(i => {
    return createSequence(i, increment);
  });
  return array;
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
  const indices = zeroToNumArray(squares.length);

  return indices.filter(i => {
    const lastSquare = i + (seq_len - 1) * columns;
    return lastSquare < squares.length;
  });
}

function createSequence(start, increment) {
  let seq = [];
  for (let i = 0; i < settings.seq_len; i++) {
    const index = start + i * increment;
    seq.push(index);
  }
  return seq;
}
