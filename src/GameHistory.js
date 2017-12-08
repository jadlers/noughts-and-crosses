import React from "react";

class GameHistory extends React.Component {
  render() {
    const { moves } = this.props;
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
