import React from 'react';
import PropTypes from 'prop-types';

function Square({ win, onClick, value }) {
  let style = {
    background: '#fff',
    border: '1px solid #999',
    float: 'left',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '34px',
    height: '34px',
    width: '34px',
    padding: 0,
    marginRight: '-1px',
    marginTop: '-1px',
    textAlign: 'center',
    outline: 'none',
    borderRadius: 0,
  };

  if (win) {
    style = { ...style, background: '#85ff85' };
  }

  return (
    <button style={style} onClick={onClick}>
      {value}
    </button>
  );
}

Square.propTypes = {
  win: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
};

Square.defaultProps = {
  value: null,
};

export default Square;
