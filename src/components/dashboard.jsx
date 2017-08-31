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
        stats = this.props.scores.map((score, index) => {
            return (<div className="stats" key={index}>
                <h1>Game {index+1}</h1>
                <img src={score.startPic} alt={score.start+' poster'} 
                    style={{
                    height: '100px',
                    width: '80px'
                }}></img>
                <div className="start-stats">
                    <h3>Start Movie</h3>
                    <h5>{score.start}</h5>
                </div>
                <img src={score.endPic} alt={score.end+' poster'} 
                    style={{
                        height: '100px',
                        width: '80px'
                }}></img>
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
                <Header />
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
