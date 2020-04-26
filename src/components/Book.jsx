import React from 'react';
import PropTypes from 'prop-types';

export default function Book({
  isDummy, downloading, title, author,
}) {
  return (
    <div className={`book ${downloading && 'progress-container'}`}>
      {downloading && <div className="progress-background" />}
      <div className={`line-long ${isDummy && 'loading-animation'}`}>
        { title }
      </div>
      <div className={`line-short ${isDummy && 'loading-animation'}`}>
        { author }
      </div>
    </div>
  );
}

Book.propTypes = {
  isDummy: PropTypes.bool,
  downloading: PropTypes.bool,
  title: PropTypes.string,
  author: PropTypes.string,
};

Book.defaultProps = {
  isDummy: false,
  downloading: false,
  title: '',
  author: '',
};
