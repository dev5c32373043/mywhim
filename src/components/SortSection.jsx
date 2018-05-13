import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';

const SortSection = props => (
  <Fragment>
    <FlatButton
      onClick={() => props.sort({ order_by: 'createdAt', order_type: 'asc' })}
      className="order-btn"
      label="the newest"
      primary
    />
    <FlatButton
      onClick={() => props.sort({ order_by: 'price', order_type: 'asc' })}
      className="order-btn"
      label="the cheapest"
      primary
    />
    <FlatButton
      onClick={() => props.sort({ order_by: 'price', order_type: 'desc' })}
      className="order-btn"
      label="the most expensive"
      primary
    />
  </Fragment>
);

SortSection.propTypes = {
  sort: PropTypes.func.isRequired,
};

export default SortSection;
