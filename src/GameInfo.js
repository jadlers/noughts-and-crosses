import React from "react";

class GameInfo extends React.Component {
  render() {
    const { status, moves } = this.props;
    return (
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    );
  }
}

export default GameInfo;
