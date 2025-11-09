import React from 'react';

const Loader = ({ size = 'medium', fullScreen = false, text = '' }) => {
  const loaderClass = ['loader', `loader--${size}`].filter(Boolean).join(' ');

  const content = (
    <div className={loaderClass}>
      <div className="loader__spinner"></div>
      {text && <p className="loader__text">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="loader-container loader-container--fullscreen">{content}</div>;
  }

  return content;
};

export default Loader;
