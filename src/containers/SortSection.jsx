import React from 'react';
import { connect } from 'react-redux';

import SortSection from '../components/SortSection';
import mainPageActions from '../actions/MainPage';

const SortSectionContainer = props => <SortSection {...props} />;

const mapDispatchToProps = dispatch => ({
  sort(param) {
    dispatch(mainPageActions.filter(param));
  },
});

export default connect(null, mapDispatchToProps)(SortSectionContainer);
