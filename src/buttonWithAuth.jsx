import React from 'react';

import AuthDialogContainer from './containers/AuthDialog';

const buttonWithAuth = (Component, isAuthenticated, history) =>
  (isAuthenticated ? (
    <Component label="Cabinet" onClick={() => history.push('/cabinet')} />
  ) : (
    <AuthDialogContainer />
  ));

export default buttonWithAuth;
