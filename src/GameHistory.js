import React from "react";

class GameHistory extends React.Component {
  render() {
    const { status, moves } = this.props;
    const style = {
      marginLeft: "20px"
    };
    return (
      <div style={style}>
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    );
  }
}

export default GameHistory;
