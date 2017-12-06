import React from "react";
import Board from "./board";
import { calculateWinner } from "./helper";

/* TODO: 1. Add a toggle button that lets you sort the moves in either ascending
or descending order. */

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.settings = {
      rows: 5,
      columns: 5,
      seq_len: 3
    };
    const numSquares = this.settings.rows * this.settings.columns;
    this.state = {
      history: [
        {
          squares: Array(numSquares).fill(null),
          updatedSquare: null
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    if (calculateWinner(squares, this.settings) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          updatedSquare: i
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  getCoordinates(i, width = 3) {
    const col = i % width;
    const row = Math.floor(i / width);
    return "(" + col + ", " + row + ")";
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      const desc = move
        ? "Go to move #" + move + " " + this.getCoordinates(step.updatedSquare)
        : "Go to game start";

      const lookedAt = move === this.state.stepNumber ? "bold" : "";

      return (
        <li key={move}>
          <button className={lookedAt} onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    const winner = calculateWinner(current.squares, this.settings);
    let status;
    if (winner) {
      const winnerChar = current.squares[winner[0]];
      status = "Winner: " + winnerChar;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerIndices={winner}
            settings={this.settings}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
