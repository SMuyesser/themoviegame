import React from 'react';
import {Link} from 'react-router-dom';

import GameInfo from './gameinfo';
import LinkNav from './linknav';
import LinkChain from './linkchain';

import './main.css';

export default function Game(props) {
    return (
        <div className="game">
        	<GameInfo />
        	<LinkNav />
        	<LinkChain />
			<div className="game-page-btn">
				<h2>You Win!</h2>
				<Link className="btn btn-danger btn-lg restart-game-btn" to="/setup" role="button">Play Again?</Link>
			</div>
		</div>
    );
};


