import React from 'react';

import './main.css';

export default function Home(props) {
    return (
        <div className="home">
				<div class="jumbotron landing-page-title">
					<h1>THE MOVIE GAME</h1>
					<p>A fun way to test your knowledge of movies and casts.</p>
				</div>
				<div class="landing-page-new-game">
					<a class="btn btn-danger btn-lg" href="wireframe-set-up-page.html" role="button">New Game</a>
				</div>
        </div>
    );
};