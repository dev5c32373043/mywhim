import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LocationSelect from '../components/LocationSelect';

const LocationSelectContainer = props => <LocationSelect {...props} />;

LocationSelectContainer.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = store => ({
  locations: store.mainPage.locationSelect.locations,
});

export default connect(mapStateToProps)(LocationSelectContainer);
