import React from 'react';

const Loading = ({ text = "Loading JobHub..." }) => {
  return (
    <div className="loading-center">
      <div className="spinner"></div>
      <p className="form-label">{text}</p>
    </div>
  );
};

export default Loading;
