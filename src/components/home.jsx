import React from 'react';

import './home.css';

export default function Home(props) {
    return (
        <div className="home">
				<div className="jumbotron landing-page-title">
					<h1>THE MOVIE GAME</h1>
					<p>A fun way to test your knowledge of movies and casts.</p>
				</div>
				<div className="landing-page-new-game">
					<a className="btn btn-danger btn-lg" href="/setup" role="button">New Game</a>
				</div>
        </div>
    );
};