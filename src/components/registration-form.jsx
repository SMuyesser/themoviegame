import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {registerPlayer} from '../actions/players';
import {login} from '../actions/auth';
import './registration-form.css';


const validate = values => {
  const errors = {}
  if (!values.playername) {
    errors.playername = 'Required'
  } 

  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords do not match'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderField = ({ input, id, type, meta: { touched, error, warning } }) => (
  <div>
    <div>
      <input {...input} placeholder={id} type={type}/>
      {touched && (error && <span>{error}</span>)}
    </div>
  </div>
)

const playerRegistrationForm = (props) => {

  const { handleSubmit, pristine, reset, submitting } = props
  const onSubmit = values => {
      const {playername, password, email} = values;
      const player = {playername, password, email};
      return props
          .dispatch(registerPlayer(player))
          .then(() => props.dispatch(login(playername, password)))
  }
  return (              
    <form onSubmit={handleSubmit(values => onSubmit(values))} className="register-form">
      <h1 className="form-title">Register</h1>
      <Field name="playername" type="text" component={renderField} id="Enter Player Name" />
      <Field name="password" type="password" component={renderField} id="Enter Password" />
      <Field name="passwordConfirm" type="password" component={renderField} id="Confirm Password" />
      <Field name="email" type="text" component={renderField} id="Enter Email" />
      <div id="register-btn-container">
        <button id="register-form-submit-btn" type="submit" disabled={submitting}>Submit</button>
        <button id="register-form-clear-btn" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'playerRegistrationForm', 
  validate                 
})(playerRegistrationForm)
