import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import LoginForm from './login-form';
import './home.css';

export function Home(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
				<div className="jumbotron landing-page-title">
					<h1 id="homeTitle">THE MOVIE GAME</h1>
					<p>A fun way to test your knowledge of movies and casts.</p>
		            <LoginForm />
		            <Link to="/register">Register</Link>
				</div>
        </div>
    );
};

const mapStateToProps = ({auth}) => ({
    loggedIn: auth.currentPlayer !== null
});

export default connect(mapStateToProps)(Home);