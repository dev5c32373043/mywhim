import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './store';
import PrivateRoute from './PrivateRoute';

import MainPageContainer from './containers/MainPage';
import CabinetPage from './pages/Cabinet';
import NotFound from './pages/NotFound';

const Router = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={MainPageContainer} />
      <PrivateRoute exact path="/cabinet" component={CabinetPage} />
      <Route component={NotFound} />
    </Switch>
  </ConnectedRouter>
);

export default Router;
