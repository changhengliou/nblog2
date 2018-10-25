import React from 'react';

const onToggle = (e) => {
  e.preventDefault();
};

const controls = ['fa fa-heading', 'fa fa-bold', 'fa fa-italic', 'fa fa-underline',
  'fa fa-strikethrough', 'fa fa-text-height', 'fa fa-font', 'fa fa-adjust', 'fa fa-eraser',
  'fa fa-align-left', 'fa fa-list-ul', 'fa fa-link', 'far fa-surprise', 'fa fa-undo', 'fa fa-redo'];
// add class active
const EditorControl = (props) => {
  const { editorState } = props;
  const selection = editorState ? editorState.getSelection() : null;
  const blockType = editorState ? editorState.getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType() : null;
  console.log(blockType);
  return (
    <div className="editor-control">
      {
      controls.map((e, i) => (
        <span className="control-btn" onMouseDown={onToggle} key={`key-${i + 1}`}>
          <i className={e} />
        </span>
      ))
    }
    </div>
  );
};

export default EditorControl;
