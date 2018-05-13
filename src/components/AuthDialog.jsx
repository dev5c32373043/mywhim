import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import AuthForm from '../forms/Auth';

const AuthDialog = (props) => {
  const actions = [
    <FlatButton label="Login" onClick={props.login} primary />,
    <FlatButton label="Register" onClick={props.register} primary />,
    <FlatButton label="Cancel" primary onClick={() => props.toggleDialog(props.dialogActive)} />,
  ];
  return (
    <Fragment>
      <FlatButton
        label="Login"
        labelStyle={{ color: '#fff' }}
        onClick={() => props.toggleDialog(props.dialogActive)}
      />
      <Dialog
        title="Let's getting started"
        actions={actions}
        modal={false}
        open={props.dialogActive}
        contentStyle={{ maxWidth: 400 }}
        onRequestClose={() => props.toggleDialog(props.dialogActive)}
      >
        <AuthForm />
      </Dialog>
    </Fragment>
  );
};

AuthDialog.propTypes = {
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  dialogActive: PropTypes.bool.isRequired,
};

export default AuthDialog;
