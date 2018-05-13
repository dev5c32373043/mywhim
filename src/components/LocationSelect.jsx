import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const LocationSelect = props => (
  <SelectField
    value={props.value}
    onChange={props.onChange}
    floatingLabelText="Location"
    style={{ margin: '0 3% 3% 3%' }}
  >
    <MenuItem key={0} value="all" primaryText="all" />
    {props.locations.map(loc => <MenuItem key={loc.id} value={loc.name} primaryText={loc.name} />)}
  </SelectField>
);

LocationSelect.defaultProps = {
  value: '',
};

LocationSelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LocationSelect;
