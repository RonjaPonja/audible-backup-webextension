import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import Nav from './Nav';
import Library from './Library';
import Settings from './Settings';

function App({ backupURL }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/library" component={Library} />
        <Route exact path="/settings" component={Settings} />
        <Route render={() => (backupURL
          ? <Redirect to="/library" />
          : <Redirect to="/settings" />
        )}
        />
      </Switch>
      <Nav />
    </Router>
  );
}

App.propTypes = {
  backupURL: PropTypes.string.isRequired,
};

function mapStateToProps({ backupURL }) {
  return {
    backupURL,
  };
}

export default connect(mapStateToProps)(App);
