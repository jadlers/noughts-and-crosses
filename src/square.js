import React from "react";

function Square({ win, onClick, value }) {
  const classes = win ? "square winning" : "square";
  return (
    <button className={classes} onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
