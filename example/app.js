import React from 'react';
import PropTypes from 'prop-types';
import withOfflineState from 'react-offline-hoc';  // eslint-disable-line import/no-unresolved

const OnlineDetector = ({ isOnline }) => (
  <div>
    Connectivity is currently: {isOnline ? 'online' : 'offline'}
  </div>
);

OnlineDetector.propTypes = {
  isOnline: PropTypes.bool.isRequired,
};

export default withOfflineState(OnlineDetector);
