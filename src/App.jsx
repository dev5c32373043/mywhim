import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

import store from './store';
import Router from './Router';
import authActions from './actions/auth';

class App extends Component {
  componentWillMount() {
    store.dispatch(authActions.authenticate());
  }
  render() {
    const { isLoading } = this.props;
    return (
      <MuiThemeProvider>
        {isLoading ? <CircularProgress style={{ position: 'absolute', top: '50%' }} /> : <Router />}
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const AppWithState = connect(s => ({
  isLoading: s.auth.isLoading,
}))(App);

ReactDOM.render(
  <Provider store={store}>
    <AppWithState />
  </Provider>,
  document.getElementById('root'),
);
