import React from 'react';

const CodeEditor = (props) => {
  const { isVisible } = props;
  return (
    <React.Fragment>
      <div className="code-editor-wrap">
        <textarea className="code-editor-text" />
        <button type="button" className="code-editor-btn">OK</button>
      </div>
      <div
        style={{ zIndex: 100, display: `${isVisible ? 'block' : 'none'}` }}
        className="overlay"
      />
    </React.Fragment>
  );
};

export default CodeEditor;
