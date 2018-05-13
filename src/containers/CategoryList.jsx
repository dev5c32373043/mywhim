import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Category from '../components/Category';
import List from '../components/List';
import actions from '../actions/CategoryList';
import { categoriesSelector } from '../selectors/CategoryList';

const CategoryListContainer = props => (
  <List
    className="categories"
    items={props.categories}
    component={Category}
    onClick={props.updateCategory}
  />
);

CategoryListContainer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateCategory: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  categories: categoriesSelector(store),
});

const mapDispatchToProps = dispatch => ({
  updateCategory(ev) {
    dispatch(actions.updateCategory(ev.target.textContent));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListContainer);
