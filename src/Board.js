import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

class Board extends React.Component {
  propTypes = {
    squares: PropTypes.arrayOf(PropTypes.string).isRequired,
    winnerIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
    onClick: PropTypes.func.isRequired,
    settings: PropTypes.shape({
      columns: PropTypes.number.isRequired,
      rows: PropTypes.number.isRequired,
      seq_len: PropTypes.number.isRequired,
    }).isRequired,
  };
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
