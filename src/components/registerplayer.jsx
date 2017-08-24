import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {API_BASE_URL} from '../config';

import './registerplayer.css';

export class RegisterPlayer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            redirectToNewPage: false
        }
    }

    sendToDb(event) {
        event.preventDefault();
        const component = this;
        axios.post(API_BASE_URL+'/players/register', {
            "playername": this.playername.value,
            "password": this.password.value,
            "password2": this.password2.value,
            "email": this.email.value
            })
            .then(response => {
                if(response.data === 'Success') {
                    alert('You are registered and can now track your greatness!');
                    component.setState({ redirectToNewPage: true });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    check() {
      if (document.getElementById('password').value !== document.getElementById('confirm_password').value) {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'Passwords do not match';
      } else {
        document.getElementById('message').innerHTML = '';
      }
    }

    render() {

        if (this.state.redirectToNewPage) {
            return (
                <Redirect to="/setup"></Redirect>
            )
        }

        return (
            <div className="row">
                <div className="col-lg-6">
                    <form className="input-group" id="registerPlayerForm" onSubmit={e => this.sendToDb(e)}>
                        <label>Player Name</label>
                        <input type="text" name="playername" placeholder="Player Name" required ref={(element) => {this.playername=element}}></input>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Create Password" id="password" onKeyUp={e => this.check(e)} required ref={(element) => {this.password=element}}></input>
                        <label>Confirm Password</label>
                        <input type="password" name="password2" placeholder="Confirm Password" id="confirm_password" onKeyUp={e => this.check(e)} required ref={(element) => {this.password2=element}}></input>
                        <span id='message'></span>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Enter Email" required ref={(element) => {this.email=element}}></input>
                        <input id="submitButton" type="submit"></input>
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

