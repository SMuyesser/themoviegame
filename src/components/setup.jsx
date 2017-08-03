import React from 'react';
import {Link} from 'react-router-dom';
import StartMovie from './startMovie';
import EndMovie from './endMovie';

import './main.css';

export default function Setup(props) {
    return (
        <div className="setup">
			<div className="page-header">
				<h2 className="game-setup-page-title">How To Play</h2>
				<p>Player must alternate selecting movies and cast members from those movies to connect the starting movie to the ending movie.</p>
				<p>Select your starting and ending movies below.  If you don't like your choices, just click show new movies.</p>
			</div>
			<div className="container-fluid game-setup-page">
				<h2 className="game-setup-page-title">Game Set-Up</h2>
				<StartMovie />
				<EndMovie />
				<a className="show-new-movies-btn" href="wireframe-game-page.html" role="button">Show New Movies</a>
			</div>
			<div className="game-setup-page-begin-btn">
				<Link className="btn btn-danger btn-lg begin-game-btn" to="/game" role="button">Begin Game</Link>
			</div>
		</div>
    );
};