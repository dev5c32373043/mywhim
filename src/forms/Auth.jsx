import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';

import actions from '../actions/auth';

const onSubmit = (values, dispatch) => {
  const { action, email, password } = values;
  dispatch(actions[action]({ email, password }));
};

const renderField = ({ input, meta: { touched, error }, ...props }) => (
  <TextField {...input} {...props} errorText={(touched && error) || undefined} />
);

const AuthForm = props => (
  <form className="auth-form" onSubmit={props.handleSubmit}>
    <Field name="email" type="email" hintText="Email" fullWidth component={renderField} />
    <Field name="password" type="password" hintText="Password" fullWidth component={renderField} />
  </form>
);

AuthForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const validate = (values) => {
  const errors = {};
  const email = values.email || '';
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.length) {
    errors.email = 'email required!';
  } else if (!emailRegex.test(email)) {
    errors.email = 'email not correct!';
  }
  const password = values.password || '';
  if (!password.length) {
    errors.password = 'password required!';
  } else if (password.length < 6) {
    errors.password = 'too short';
  }
  return errors;
};

const authForm = reduxForm({
  form: 'auth',
  validate,
  onSubmit,
  enableReinitialize: true,
})(AuthForm);

export default authForm;
