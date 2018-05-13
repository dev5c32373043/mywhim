import React from 'react';
import { connect } from 'react-redux';

import MainPage from '../pages/Main';

const MainPageContainer = props => <MainPage {...props} />;

const mapStateToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(MainPageContainer);
