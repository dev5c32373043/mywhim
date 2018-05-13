/* eslint-disable react/forbid-prop-types */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import SettingsForm from '../forms/Settings';

const Cabinet = props => (
  <Fragment>
    <AppBar
      title="MyWhim"
      className="app-bar"
      showMenuIconButton={false}
      iconElementRight={<FlatButton label="Back" onClick={() => props.history.push('/')} />}
    />
    <SettingsForm />
  </Fragment>
);

Cabinet.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Cabinet;
