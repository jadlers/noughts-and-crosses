import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Game from './Game';
import MainMenu from './MainMenu';
import Settings from './Settings';

class App extends Component {
  state = {
    settings: {
      rows: 5,
      columns: 5,
      seq_len: 3,
    },
  };

  updateSettings = (e) => {
    e.preventDefault();
    const row = e.target[0];
    const col = e.target[1];
    const seq = e.target[2];

    this.setState({
      settings: {
        ...this.state.settings,
        [row.id]: row.valueAsNumber,
        [col.id]: col.valueAsNumber,
        [seq.id]: seq.valueAsNumber,
      },
    });
  };

  render() {
    const title = 'Noughts & crosses';
    const settings = () => (
      <Settings
        values={this.state.settings}
        updateSettings={this.updateSettings}
      />
    );

    return (
      <Router>
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1>{title}</h1>
          </Link>
          <Switch>
            <Route exact path="/" component={MainMenu} />
            <Route
              path="/play"
              render={({ match }) => (
                <Game settings={this.state.settings} match={match} />
              )}
            />
            <Route path="/settings" component={settings} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
