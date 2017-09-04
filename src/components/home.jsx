import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import RegistrationForm from './registration-form';
import LoginForm from './login-form';

import './home.css';

export class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            formType: 'login'
        }
    }

    setFormToRegister() {
        this.setState({
            formType: 'register'
        })
    }

    setFormToLogin() {
        this.setState({
            formType: 'login'
        })
    }

    render() {
        // If we are logged in (which happens automatically when registration
        // If we are logged in redirect straight to the user's dashboard
        if (this.props.loggedIn) {
            return <Redirect to="/dashboard" />;
        }
        
        let form;
        if(this.state.formType === 'login') {
            form = (
                <div className="form-container">
                    <LoginForm />
                    <Link id="register-link" to="/" onClick={() => this.setFormToRegister()}>Register New Player</Link>
                </div>
            )
        } else if (this.state.formType === 'register') {
            form = (
                <div className="form-container">
                    <RegistrationForm onSubmit={values => {console.log(values)}} />
                    <Link id="login-link" to="/" onClick={() => this.setFormToLogin()}>Existing Player Login</Link>
                </div>
            )
        }
        return (

            <div className="home">
                    <div className="jumbotron landing-page-title">
                        <h1 id="homeTitle">THE MOVIE GAME</h1>
                        <p>A fun puzzle game to test your knowledge of movies and casts.</p>
                        {form}
                        <p>Demo Player: DemoPlayer | Password: Demo1234</p>
                    </div>
            </div>
        );
    }
};

const mapStateToProps = ({auth}) => ({
    loggedIn: auth.currentPlayer !== null
});

export default connect(mapStateToProps)(Home);
