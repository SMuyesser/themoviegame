import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './home';
import Setup from './setup';
import Game from './game';
import './App.css';

export default function App(props) {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/setup" component={Setup} />
          <Route exact path="/game" component={Game} gameStatus="You win" />
        </div>
      </Router>
    );
}

