import React from 'react';
import Square from './square';

class Board extends React.Component {
  renderSquare(i) {
    const { squares, winnerIndices, onClick } = this.props;

    let winningSquare = false;
    if (winnerIndices && winnerIndices.includes(i)) {
      winningSquare = true;
    }

    return (
      <Square
        key={i}
        value={squares[i]}
        win={winningSquare}
        onClick={() => onClick(i)}
      />
    );
  }

  createRow(startNum, columns) {
    const squares = [];
    for (let i = 0; i < columns; i++) {
      squares.push(this.renderSquare(startNum++));
    }
    return (
      <div key={startNum} className="board-row">
        {squares}
      </div>
    );
  }

  render() {
    const { settings } = this.props;
    const rows = [];
    for (let i = 0; i < settings.rows; i++) {
      rows.push(this.createRow(i * settings.rows, settings.columns));
    }

    return <div>{rows}</div>;
  }
}

export default Board;
