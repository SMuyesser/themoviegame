import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {newGame} from '../actions/game';
import {setCurrentPlayer, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

import './header.css';

export class Header extends React.Component {

    logOut() {
        this.props.dispatch(setCurrentPlayer(null));
        this.props.dispatch(setAuthToken(null));
        clearAuthToken();
        this.props.dispatch(newGame());
    }

    newGame() {
        this.props.dispatch(newGame());
    };

    render() {
        //returns home when log out
        if (!this.props.loggedIn) {
            return <Redirect to="/" />;
        }
        //render logout only if logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button id="logout" onClick={() => this.logOut()}>Log out</button>
            );
        }
        let header;
        //render header for dashboard
        if (this.props.headerType === 'dashboard') {
            header = (
                <div className="header">
                    <h1 id="logo">The Movie Game</h1>
                    <div id="player-info">
                        <h2 className="dash-header">Player: {this.props.playername}</h2>
                        <h3 className="dash-header">Games Played: {this.props.scores.length}</h3>
                    </div>
                    <div className="landing-page-new-game">
                        <Link id="new-game-btn" to="/setup">New Game</Link>
                    </div>
                    {logOutButton}
                </div>
            )
        } 
        //render header for setup
        else if ( this.props.headerType === 'setup') {
            header = (
                <div className="header">
                    <h1 id="logo">The Movie Game</h1>
                    <div id="player-info">
                        <h2 className="setup-header">Player: {this.props.playername}</h2>
                    </div>
                    <div className="to-dash-btn-div">
                        <Link to='/dashboard' id="to-dash-btn">To Dashboard</Link>
                    </div>
                    {logOutButton}
                </div>
            )

        } 
        //render header for game
        else if (this.props.headerType === 'game') {
            header = (
                <div className="header">
                    <h1 id="logo">The Movie Game</h1>
                    <div id="player-info">
                        <h2>Player: {this.props.playername}</h2>
                        <ul id="gameInfoText">
                            <li><h3 className="gameInfo-text">Links Used: {this.props.linkChain.length}</h3></li>
                        </ul>
                    </div>
                    <div className="restart-game-btn-div">
                        <Link id="restart-game-btn" to="/setup" 
                              role="button" onClick={() => this.newGame()}>{this.props.feedback}</Link>
                    </div>
                    <div className="to-dash-btn-div">
                        <Link to='/dashboard' id="to-dash-btn" onClick={() => this.newGame()}>To Dashboard</Link>
                    </div>
                    {logOutButton}
                </div>
            )
        }
        return (
            <div className="header-container">
                {header}
                <div id="top-space-fix"></div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentPlayer} = state.auth;
    return {
        loggedIn: currentPlayer !== null,
        playername: currentPlayer ? state.auth.currentPlayer.playername : '',
        scores: state.game.scores,
        headerType: state.game.headerType,
        linkChain: state.game.linkChain,
        feedback: state.game.feedback
    };
};

export default connect(mapStateToProps)(Header);