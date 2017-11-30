import React from "react";
import ReactDOM from "react-dom";
import { calculateWinner } from "./helper";
import "./index.css";

/* TODO: 1. Add a toggle button that lets you sort the moves in either ascending
or descending order. */

function Square({ win, onClick, value }) {
  const classes = win ? "square winning" : "square";
  return (
    <button className={classes} onClick={onClick}>
      {value}
    </button>
  );
}

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
    for (var i = 0; i < columns; i++) {
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
    for (var i = 0; i < settings.rows; i++) {
      rows.push(this.createRow(i * settings.rows, settings.columns));
    }

    return <div>{rows}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          updatedSquare: null
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
    this.settings = {
      rows: 3,
      columns: 3,
      seq_len: 3
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

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
