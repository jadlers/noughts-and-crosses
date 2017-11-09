import React from "react";
import ReactDOM from "react-dom";
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
    const boardSize = 3;
    const rows = [];
    for (var i = 0; i < boardSize; i++) {
      rows.push(this.createRow(i * boardSize, boardSize));
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
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
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

    const winner = calculateWinner(current.squares);
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
