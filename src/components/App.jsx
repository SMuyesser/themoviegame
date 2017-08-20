import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './home';
import Setup from './setup';
import Game from './game';

export class App extends React.Component {
	render() {
	    return (
	      <Router>
	        <div className="App">
	          <Route exact path="/" component={Home} />
	          <Route exact path="/setup" component={Setup} />
	          <Route exact path="/game" component={Game} />
	        </div>
	      </Router>
	    );
	}
}

const mapStateToProps = state => {
	return state
}

export default connect(mapStateToProps)(App);
