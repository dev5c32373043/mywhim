import React from 'react';
import PropTypes from 'prop-types';

const List = ({ component: Component, ...props }) => (
  <section className={props.className}>
    {props.items.map(item => <Component key={item.id} {...item} onClick={props.onClick} />)}
  </section>
);

List.defaultProps = {
  className: '',
  onClick: null,
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  component: PropTypes.func.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
export default List;
