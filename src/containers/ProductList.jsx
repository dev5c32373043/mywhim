import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import Product from '../components/Product';
import List from '../components/List';
import actions from '../actions/ProductList';

class ProductListContainer extends Component {
  componentWillMount() {
    const { isLoading, getProducts } = this.props;
    if (isLoading) getProducts();
  }
  render() {
    return this.props.isLoading ? (
      <CircularProgress />
    ) : (
      <List className="products" items={this.props.products} component={Product} />
    );
  }
}

const mapStateToProps = store => ({
  products: store.mainPage.productList.products,
  isLoading: store.mainPage.productList.isLoading,
});

const mapDispatchToProps = dispatch => ({
  getProducts() {
    dispatch(actions.getProducts());
  },
});

ProductListContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  getProducts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListContainer);
