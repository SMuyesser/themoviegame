import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {newGame} from '../actions';

import GameInfo from './gameinfo';
import GuessList from './guesslist';
import LinkChain from './linkchain';

import './main.css';

export class Game extends React.Component {

    newGame(event) {
        this.props.dispatch(newGame());
    }

    render() {
        return (
            <div className="game">
            	<GameInfo />
            	<GuessList />
            	<LinkChain />
    			<div className="game-page-btn">
    				<Link className="btn btn-danger btn-lg restart-game-btn" to="/setup" 
                          role="button" onClick={e => this.newGame(e)}>{this.props.feedback}</Link>
    			</div>
    		</div>
        );
    }
};

const mapStateToProps = state => ({
    feedback: state.feedback
});

export default connect(mapStateToProps)(Game);