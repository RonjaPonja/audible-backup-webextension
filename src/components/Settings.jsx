import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaQuestion } from 'react-icons/fa';
import { setBackupURL } from '../actions/backupURL';

class Settings extends Component {
  constructor(props) {
    super(props);

    const { backupURL } = this.props;
    this.state = {
      backupURL,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState(() => ({
      [name]: value,
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { backupURL } = this.state;
    dispatch(setBackupURL(backupURL));
  }

  render() {
    const { backupURL } = this.state;

    return (
      <form className="view view-content" onSubmit={this.handleSubmit}>
        <h1>
          <label className="label" htmlFor="backupURL">
            <FaQuestion className="fa fa-blue" />
            Where do you want to backup your books to:
          </label>
        </h1>
        <input
          placeholder="http://example.com/backup"
          value={backupURL}
          onChange={this.handleChange}
          name="backupURL"
          className="input"
          id="backupURL"
          type="text"
        />

        <button type="submit">Save</button>
      </form>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  backupURL: PropTypes.string.isRequired,
};

function mapStateToProps({ backupURL }) {
  return {
    backupURL,
  };
}

export default connect(mapStateToProps)(Settings);
