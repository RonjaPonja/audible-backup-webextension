import browser from 'webextension-polyfill';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaCheck, FaTimes } from 'react-icons/fa';

import Queue from './Queue';

function Library({ loggedIn, backupComplete, showQueue }) {
  return (
    <div className="view">
      {!loggedIn && (
        <h1 className="view-content">
          <a
            href="#"
            onClick={() => browser.tabs.create({
              url: 'https://www.audible.de/library',
            })}
          >
            <FaTimes className="fa fa-red" />
            Sorry, please login to Audible
          </a>
        </h1>
      )}
      {backupComplete && (
        <h1 className="view-content">
          <FaCheck className="fa fa-green" />
          Your library was backed up successfully ^_^
        </h1>
      )}
      {showQueue && <Queue />}
    </div>
  );
}

Library.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  showQueue: PropTypes.bool.isRequired,
  backupComplete: PropTypes.bool.isRequired,
};

function mapStateToProps({ loggedIn, libraryLoading, requested }) {
  return {
    loggedIn,
    showQueue: loggedIn && (libraryLoading || requested.length > 0),
    backupComplete: loggedIn && (!libraryLoading && requested.length === 0),
  };
}

export default connect(mapStateToProps)(Library);
