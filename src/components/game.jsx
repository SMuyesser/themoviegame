import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import GameInfo from './gameinfo';
import LinkNav from './linknav';
import LinkChain from './linkchain';

import './main.css';

export class Game extends React.Component {

    render() {
        return (
            <div className="game">
            	<GameInfo />
            	<LinkNav />
            	<LinkChain />
    			<div className="game-page-btn">
    				<h2>{this.props.feedback}</h2>
    				<Link className="btn btn-danger btn-lg restart-game-btn" to="/setup" role="button">Play Again?</Link>
    			</div>
    		</div>
        );
    }
};

const mapStateToProps = state => ({
    feedback: state.feedback
});

export default connect(mapStateToProps)(Game);