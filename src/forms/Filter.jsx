/* eslint-disable class-methods-use-this */

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import LocationSelectContainer from '../containers/LocationSelect';
import SortSectionContainer from '../containers/SortSection';
import mainPageActions from '../actions/MainPage';

const onSubmit = (values, dispatch) => {
  dispatch(mainPageActions.filter(values));
};

const renderTextField = ({ input, ...props }) => <TextField {...input} {...props} />;

const FilterForm = props => (
  <form className="filter-form" onSubmit={props.handleSubmit(onSubmit)}>
    <Field
      name="title"
      hintText="search everising"
      style={{ margin: '0 3% 3% 3%' }}
      component={renderTextField}
    />
    <Field
      name="location"
      component={props => (
        <LocationSelectContainer
          value={props.input.value}
          onChange={(ev, i, val) => props.input.onChange(val)}
        />
      )}
    />
    <RaisedButton type="submit" className="search-btn" label="Search" primary />
    <SortSectionContainer />
  </form>
);

const filterForm = reduxForm({ form: 'filter' })(FilterForm);

export default connect(store => ({
  initialValues: store.mainPage.productList.filter,
}))(filterForm);
