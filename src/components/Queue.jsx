import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Book from './Book';

function Queue({ libraryLoading, library, requested }) {
  return (
    <React.Fragment>
      <div className="view-content">
        <h1>Backup Queue</h1>
      </div>
      <div className="book-list">
        {!libraryLoading ? requested.map((ASIN, idx) => (
          <Book
            key={ASIN}
            downloading={idx === 0}
            imageUrl={library[ASIN].imageUrl}
            title={library[ASIN].title}
            author={library[ASIN].author}
          />
        )) : [...Array(5).keys()].map((idx) => (
          <Book key={idx} isDummy={true} />
        ))}
      </div>
    </React.Fragment>
  );
}

Queue.propTypes = {
  libraryLoading: PropTypes.bool.isRequired,
  library: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.string.isRequired,
    ).isRequired,
  ).isRequired,
  requested: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};

function mapStateToProps({ libraryLoading, library, requested }) {
  return {
    libraryLoading,
    library: Object.keys(library).reduce((modLib, key) => ({
      ...modLib,
      [key]: {
        ...library[key],
        title: library[key].title.split(':')[0],
        author: library[key].author.split(':')[0],
      },
    }), {}),
    requested,
  };
}

export default connect(mapStateToProps)(Queue);
