import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {API_BASE_URL} from '../config';

import './registerplayer.css';

export class RegisterPlayer extends React.Component {

    sendToDb(event) {
        event.preventDefault();
        axios.post(API_BASE_URL+'/players/register', {
            "playername": this.playername.value,
            "password": this.password.value,
            "password2": this.password2.value,
            "email": this.email.value
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-6">
                    <form className="input-group" id="registerPlayerForm" onSubmit={e => this.sendToDb(e)}>
                        <label>Player Name</label>
                        <input type="text" name="playername" placeholder="Player Name" required ref={(element) => {this.playername=element}}></input>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Create Password" required ref={(element) => {this.password=element}}></input>
                        <label>Confirm Password</label>
                        <input type="password" name="password2" placeholder="Confirm Password" required ref={(element) => {this.password2=element}}></input>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Enter Email" required ref={(element) => {this.email=element}}></input>
                        <input type="submit"></input>
                    </form>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    state: state
});

export default connect(mapStateToProps)(RegisterPlayer);

