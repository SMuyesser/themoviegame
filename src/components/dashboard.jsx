import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {fetchProtectedData} from '../actions/protected-data';
import {setCurrentPlayer, setAuthToken} from '../actions/auth';
import {setScores} from '../actions/game';
import {clearAuthToken} from '../local-storage';

import './dashboard.css';
import {API_BASE_URL} from '../config';

export class Dashboard extends React.Component {

    componentDidMount() {
        if (!this.props.loggedIn) {
            return;
        }
        axios.get(API_BASE_URL+'/players/scores/'+this.props.playername)
        .then(response => {
            this.props.dispatch(setScores(response.data));
        })
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
                <button id="logout" onClick={() => this.logOut()}>Log out</button>
            );
        }
        let stats;
        stats = this.props.scores.map((score, index) => {
            return (<div className="stats" key={index}>
                <img src={score.startPic} alt={score.start+' poster'}></img>
                <div className="start-stats">
                    <h3>Start Movie</h3>
                    <h5>{score.start}</h5>
                </div>
                <img src={score.endPic} alt={score.end+' poster'}></img>
                <div className="end-stats">
                    <h3>End Movie</h3>
                    <h5>{score.end}</h5>
                </div>
                <div className="link-stats">
                    <h3>Links</h3>
                    <h5>Total: {score.linkCount}</h5>
                    <h5>Used: {score.links}</h5>
                </div>
            </div>)
        })
        return (
            <div className="dashboard">
                <div className="dashboard-header">
                    <h1 id="logo">The Movie Game</h1>
                    <div id="player-info">
                        <h2>Player: {this.props.playername}</h2>
                        <h3>Games Played: {this.props.scores.length}</h3>
                    </div>
                    <div className="landing-page-new-game">
                        <a className="btn new-game-btn" href="/setup" onClick={e => this.addStats(e)} role="button">New Game</a>
                    </div>
                    {logOutButton}
                </div>
                <div id="top-space-fix"></div>
                <div id="stats-container">
                    {stats}
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
