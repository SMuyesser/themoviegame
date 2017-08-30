import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {fetchProtectedData} from '../actions/protected-data';
import {setCurrentPlayer, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

import './dashboard.css';

export class Dashboard extends React.Component {

    componentDidMount() {
        if (!this.props.loggedIn) {
            return;
        }
        this.props.dispatch(fetchProtectedData());
    }

    logOut() {
        this.props.dispatch(setCurrentPlayer(null));
        this.props.dispatch(setAuthToken(null));
        clearAuthToken();
    }

    render() {
        // Only visible to logged in users
        if (!this.props.loggedIn) {
            return <Redirect to="/" />;
        }

        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
        }

/*        let stats;
        stats = this.props.scores
        (this.props.stats) {
            moviesOrCast = this.state.movieOrCastList.map((actor) => (
                <li key={actor.id}>
                    <button onClick={() => { this.getMoviesFromActor(actor) }}>
                        {actor.name}
                        <img src={'https://image.tmdb.org/t/p/w138_and_h175_bestv2'+actor.profile_path} alt={actor.name+" image"}/>
                    </button>
                </li>
            ));         
        }*/

        return (
            <div className="dashboard">
                <div className="dashboard-header">
                    <div id="logo"></div>
                    Player Name: {this.props.playername}
                    {logOutButton}
                </div>
                <div id="top-space-fix"></div>
                <div id="stats-container">
                </div>
                <div className="landing-page-new-game">
                    <a className="btn new-game-btn" href="/setup" onClick={e => this.addStats(e)} role="button">New Game</a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentPlayer} = state.auth;
    return {
        loggedIn: currentPlayer !== null,
        playername: currentPlayer ? state.auth.currentPlayer.playername : '',
        scores: state.game.scores
    };
};

export default connect(mapStateToProps)(Dashboard);
