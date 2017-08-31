import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerPlayer} from '../actions/players';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
import {Redirect} from 'react-router-dom';

import './registration-form.css';

export class RegistrationForm extends React.Component {

        constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
    }

    onSubmit(values) {
        const {playername, password, email} = values;
        const player = {playername, password, email};
        return this.props
            .dispatch(registerPlayer(player))
            .then(() => this.props.dispatch(login(playername, password)))
            .then(() => this.setState({
                redirect: true
            }))
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to='/dashboard' />;
        }

        return (
            <form
                className="register-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <h1 className="form-title">Register</h1>
                <label htmlFor="playername">Player Name</label>
                <Field
                    component={Input}
                    type="text"
                    name="playername"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, length({min: 10, max: 72}), isTrimmed]}
                />
                <label htmlFor="passwordConfirm">Confirm password</label>
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matches('password')]}
                />
                <label htmlFor="email">Email</label>
                <Field component={Input} type="text" name="email" />
                <button
                    id="register-form-btn"
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
