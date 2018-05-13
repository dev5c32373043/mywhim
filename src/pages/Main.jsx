/* eslint-disable react/forbid-prop-types */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import FilterForm from '../forms/Filter';
import ProductListContainer from '../containers/ProductList';
import CategoryListContainer from '../containers/CategoryList';
import buttonWithAuth from '../buttonWithAuth';

const MainPage = props => (
  <Fragment>
    <AppBar
      title="MyWhim"
      className="app-bar"
      showMenuIconButton={false}
      iconElementRight={buttonWithAuth(FlatButton, props.isAuthenticated, props.history)}
    />
    <FilterForm />
    <CategoryListContainer />
    <ProductListContainer />
  </Fragment>
);

MainPage.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default MainPage;
