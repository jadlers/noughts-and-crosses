import React from 'react';
import PropTypes from 'prop-types';

class GameHistory extends React.Component {
  getCoordinates(i) {
    const { columns } = this.props.settings;
    const col = i % columns;
    const row = Math.floor(i / columns);
    return `(${col}, ${row})`;
  }

  stepString(move, updatedSquare) {
    let str = 'Go to game start';
    if (move) {
      str = `Go to move #${move} ${this.getCoordinates(updatedSquare, 5)}`;
    }
    return str;
  }

  render() {
    const { history, stepNumber } = this.props.state;

    const moves = history.map((step, move) => {
      const desc = this.stepString(move, step.updatedSquare);
      const lookedAt = move === stepNumber ? { fontWeight: 'bold' } : {};

      return (
        <li key={move}>
          <button style={lookedAt} onClick={() => this.props.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    const style = {
      marginLeft: '20px',
    };

    return (
      <div style={style}>
        <ol>{moves}</ol>
      </div>
    );
  }
}

GameHistory.propTypes = {
  settings: PropTypes.shape({
    columns: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    seq_len: PropTypes.number.isRequired,
  }).isRequired,
  state: PropTypes.shape({
    history: PropTypes.array.isRequired,
    stepNumber: PropTypes.number.isRequired,
  }).isRequired,
  jumpTo: PropTypes.func.isRequired,
};

export default GameHistory;
