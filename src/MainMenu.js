import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = () => (
  <ul>
    <Link to="/play">
      <li>Play</li>
    </Link>
  </ul>
);

export default MainMenu;
