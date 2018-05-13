import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

const Category = (props) => {
  const style = {
    backgroundColor: props.active ? '#0098d0' : '',
    labelColor: props.active ? '#ffffff' : '',
  };
  return (
    <Chip style={{ margin: 5, cursor: 'pointer' }} {...style} onClick={props.onClick}>
      {props.name}
    </Chip>
  );
};

Category.defaultProps = {
  onClick: null,
};
Category.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default Category;
