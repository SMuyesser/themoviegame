import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {fetchProtectedData} from '../actions/protected-data';
import {setScores, setHeader} from '../actions/game';

import './dashboard.css';
import Header from './header';
import {API_BASE_URL} from '../config';

export class Dashboard extends React.Component {

    componentWillMount() {
        this.props.dispatch(setHeader('dashboard'));
    }

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

    render() {
        // Only visible to logged in users
        if (!this.props.loggedIn) {
            return <Redirect to="/" />;
        }

        // Only render the log out button if we are logged in
        let stats;
        let linkList;
        stats = this.props.scores.map((score, index) => {
            linkList = score.links.map((link, index) => {
                return<li className="linkList" key={index}>{link}</li>
            })
            return (<div className="stats" key={index}>
                <h2 className="game-number-stats">{index+1}</h2>
                <div className="link-stats">
                    <h3>Total Links: {score.linkCount}</h3>
                    <ul>{linkList}</ul>
                </div>
                <div className="start-stats">
                    <h3>{score.start}</h3>
                    <img className="dash-pic" src={score.startPic} alt={score.start+' poster'} 
                        style={{
                        height: '100px',
                        width: '80px'
                    }}></img>
                </div>
                <div className="end-stats">
                    <h3>{score.end}</h3>
                    <img className="dash-pic" src={score.endPic} alt={score.end+' poster'} 
                        style={{
                            height: '100px',
                            width: '80px'
                    }}></img>
                </div>
            </div>)
        })
        return (
            <div className="dashboard">
                <Header />
                <div id="stats-header-fix">
                    <div id="stats-header" className="stats">
                        <h2 className="game-record-title" id="game-number">#</h2>
                        <h2 className="game-record-title" id="link-header">Links</h2>
                        <h2 className="game-record-title" id="start-header">Start Movie</h2>
                        <h2 className="game-record-title" id="end-header">End Movie</h2>
                    </div>
                </div>
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
