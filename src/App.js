import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Game from './Game';
import MainMenu from './MainMenu';

const App = () => {
  const title = 'Noughts & crosses';
  return (
    <Router>
      <div>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>{title}</h1>
        </Link>
        <Switch>
          <Route exact path="/" component={MainMenu} />
          <Route path="/play" component={Game} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
