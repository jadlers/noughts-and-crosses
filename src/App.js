import React from 'react';
import Game from './Game';

const App = () => {
  const title = 'Noughts & crosses';
  return (
    <div>
      <h1>{title}</h1>
      <Game />
    </div>
  );
};

export default App;
