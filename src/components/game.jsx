import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {newGame} from '../actions/game';

import GameInfo from './gameinfo';
import GuessList from './guesslist';
import LinkChain from './linkchain';

import './game.css';

export class Game extends React.Component {
    
    newGame(event) {
        this.props.dispatch(newGame());
    };

    render() {
        return (
            <div className="game">
            	<GameInfo />
            	<LinkChain />
                <GuessList />
                <div className="game-page-btn">
                    <Link className="btn btn-danger btn-lg restart-game-btn" to="/setup" 
                          role="button" onClick={e => this.newGame(e)}>{this.props.feedback}</Link>
                </div>
    		</div>
        );
    }
};

const mapStateToProps = ({game}) => ({
    feedback: game.feedback
});

export default connect(mapStateToProps)(Game);