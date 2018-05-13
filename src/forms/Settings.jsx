import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import MobileTearSheet from '../components/MobileTearSheet';

const renderField = ({ input, ...props }) => <TextField {...input} {...props} />;

const SettingsForm = () => (
  <MobileTearSheet>
    <form className="settings-form">
      <Field name="email" hintText="email" fullWidth disabled component={renderField} />
      <Field name="city" hintText="city" fullWidth disabled component={renderField} />
      <Field
        name="oldPassword"
        hintText="old password"
        fullWidth
        disabled
        component={renderField}
      />
      <Field
        name="newPassword"
        hintText="new password"
        fullWidth
        disabled
        component={renderField}
      />
      <RaisedButton label="Update" primary style={{ marginTop: '7%' }} disabled />
    </form>
  </MobileTearSheet>
);

const settingsForm = reduxForm({ form: 'settings' })(SettingsForm);

export default connect(store => ({
  initialValues: { email: store.auth.user.email },
}))(settingsForm);
