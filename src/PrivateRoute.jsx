import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...args }) => (
  <Route
    {...args}
    render={props =>
      (args.isAuthenticated ? <Component {...args.parentProps} {...props} /> : <Redirect to="/" />)
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default connect(store => ({
  isAuthenticated: store.auth.isAuthenticated,
}))(PrivateRoute);
