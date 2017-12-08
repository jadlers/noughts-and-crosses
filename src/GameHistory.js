import React from "react";

class GameHistory extends React.Component {
  getCoordinates(i, width = 3) {
    const col = i % width;
    const row = Math.floor(i / width);
    return "(" + col + ", " + row + ")";
  }

  render() {
    const { history, stepNumber } = this.props.state;

    const moves = history.map((step, move) => {
      const desc = move
        ? "Go to move #" + move + " " + this.getCoordinates(step.updatedSquare)
        : "Go to game start";

      const lookedAt = move === stepNumber ? { fontWeight: "bold" } : {};

      return (
        <li key={move}>
          <button style={lookedAt} onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    const style = {
      marginLeft: "20px"
    };

    return (
      <div style={style}>
        <ol>{moves}</ol>
      </div>
    );
  }
}

export default GameHistory;
