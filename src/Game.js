import React from 'react';
import { Route } from 'react-router-dom';
import { shape, string, number } from 'prop-types';
import Board from './Board';
import GameHistory from './GameHistory';
import calculateWinner from './calculateWinner';

/* TODO: 1. Add a toggle button that lets you sort the moves in either ascending
or descending order. */

class Game extends React.Component {
  constructor(props) {
    super(props);
    const { rows, columns } = this.props.settings;
    this.state = {
      history: [
        {
          squares: Array(rows * columns).fill(null),
          updatedSquare: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    if (calculateWinner(squares, this.settings) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares,
          updatedSquare: i,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const { path } = this.props.match;
    const { history } = this.state;
    const current = history[this.state.stepNumber];
    const { settings } = this.props;

    const winner = calculateWinner(current.squares, settings);
    let status;
    if (winner) {
      const winnerChar = current.squares[winner[0]];
      status = `Winner: ${winnerChar}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    const gameHistory = () => (
      <GameHistory
        state={this.state}
        settings={settings}
        jumpTo={i => this.jumpTo(i)}
      />
    );

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerIndices={winner}
            settings={settings}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div>
          <span style={{ marginLeft: '20px', marginBottom: '10px' }}>
            {status}
          </span>
          <Route path={`${path}/history`} component={gameHistory} />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  settings: shape({
    rows: number.isRequired,
    columns: number.isRequired,
    seq_len: number.isRequired,
  }).isRequired,
  match: shape({
    path: string.isRequired,
  }).isRequired,
};

export default Game;
