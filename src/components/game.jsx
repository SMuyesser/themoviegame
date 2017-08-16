import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {newGame} from '../actions';

import GameInfo from './gameinfo';
import LinkNav from './linknav';
import LinkChain from './linkchain';

import './main.css';

export class Game extends React.Component {

    newGame(event) {
        console.log('FIRED FIRED FIRED FIRED');
        this.props.dispatch(newGame());
    }

    render() {
        return (
            <div className="game">
            	<GameInfo />
            	<LinkNav />
            	<LinkChain />
    			<div className="game-page-btn">
    				<h2>{this.props.feedback}</h2>
    				<Link className="btn btn-danger btn-lg restart-game-btn" to="/setup" role="button" onClick={e => this.newGame(e)}>Play Again?</Link>
    			</div>
    		</div>
        );
    }
};

const mapStateToProps = state => ({
    feedback: state.feedback,
});

export default connect(mapStateToProps)(Game);