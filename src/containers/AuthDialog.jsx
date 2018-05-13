import React from 'react';
import { connect } from 'react-redux';
import { submit, change } from 'redux-form';
import actions from '../actions/auth';
import AuthDialog from '../components/AuthDialog';

const AuthDialogContainer = props => <AuthDialog {...props} />;

const mapStateToProps = store => ({
  dialogActive: store.auth.dialogActive,
});

const mapDispatchToProps = dispatch => ({
  toggleDialog(active) {
    dispatch(actions.toggleDialog(!active));
  },
  async login() {
    await dispatch(change('auth', 'action', 'login'));
    dispatch(submit('auth'));
  },
  async register() {
    await dispatch(change('auth', 'action', 'register'));
    dispatch(submit('auth'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthDialogContainer);
