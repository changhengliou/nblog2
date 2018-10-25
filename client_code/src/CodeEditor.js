import React from 'react';
import { actions } from './store';

const CodeEditor = (props) => {
  const { isVisible } = props;
  return (
    <React.Fragment>
      <div
        style={{ display: `${isVisible ? 'block' : 'none'}` }}
        className="code-editor-wrap"
      >
        <textarea className="code-editor-text" />
        <button type="button" className="code-editor-btn">OK</button>
      </div>
      <div
        style={{ zIndex: 1000, display: `${isVisible ? 'block' : 'none'}` }}
        className="overlay"
        onClick={() => actions.setCodeEditorVisibility(false)}
      />
    </React.Fragment>
  );
};

export default CodeEditor;
