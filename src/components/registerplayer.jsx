import React from 'react';
import axios from 'axios';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {connect} from 'react-redux';
import {setStartFinalize} from '../actions';
import {API_BASE_URL} from '../config';

export class RegisterPlayer extends React.Component {

    sendToDb(formData) {
        console.log(formData);
        axios.post(API_BASE_URL+'/players/register', {
            "playername": formData.playername,
            "password": formData.password,
            "password2": formData.password2,
            "email": formData.email
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-6">
                    <form className="input-group" id="registerPlayerForm" onSubmit={data => this.sendToDb(data)}>
                        <label>Player Name</label>
                        <input type="text" name="playername" placeholder="Player Name" required></input>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Create Password" required></input>
                        <label>Confirm Password</label>
                        <input type="password" name="password2" placeholder="Confirm Password" required></input>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Enter Email" required></input>
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

