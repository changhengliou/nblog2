import React from 'react';
import { RichUtils } from 'draft-js';
import { actions } from './store';

const controls = [
  { class: 'fa fa-heading', style: 'header-one', type: 'block' },
  { class: 'fa fa-bold', style: 'BOLD', type: 'inline' },
  { class: 'fa fa-italic', style: 'ITALIC', type: 'inline' },
  { class: 'fa fa-underline', style: 'UNDERLINE', type: 'inline' },
  { class: 'fa fa-strikethrough', style: 'STRIKETHROUGH', type: 'inline' },
  { class: 'fa fa-text-height', style: 'LINEHEIGHT', type: 'inline' },
  { class: 'fa fa-font', style: 'FONT', type: 'inline' },
  { class: 'fa fa-adjust', style: 'ADJUST', type: 'inline' }, // ?
  { class: 'fa fa-eraser', style: 'ERASER', type: 'inline' }, // ?
  { class: 'fa fa-align-left', style: 'align-left', type: 'block' }, // ?
  { class: 'fa fa-list-ul', style: 'unordered-list-item', type: 'block' },
  { class: 'fa fa-link', style: 'LINK', type: 'inline' },
  { class: 'far fa-surprise', style: 'surprise', type: 'inline' }, // ?
  { class: 'fa fa-undo', style: 'undo', type: 'none' }, // ?
  { class: 'fa fa-redo', style: 'redo', type: 'none' }, // ?
];

const isSelect = (style, blockType, inlineType) => {
  if (blockType === style) {
    return true;
  }
  if (inlineType) {
    return inlineType.has(style);
  }
  return false;
};
const onToggle = (event, e, { editorState, id }) => {
  event.preventDefault();
  if (!editorState) {
    return;
  }
  if (e.type === 'inline') {
    actions.onEditorStateChange({
      editorState: RichUtils.toggleInlineStyle(editorState, e.style),
      id,
    });
  } else if (e.type === 'block') {
    actions.onEditorStateChange({
      editorState: RichUtils.toggleBlockType(editorState, e.style),
      id,
    });
  } else {
    console.log(e.style);
  }
};

// add class active
const EditorControl = (props) => {
  const { editorState, currentEditor } = props;
  const selection = editorState ? editorState.getSelection() : null;
  const inlineType = editorState ? editorState.getCurrentInlineStyle() : null;
  const blockType = editorState ? editorState.getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType() : null;
  return (
    <div className="editor-control">
      { controls.map(e => (
        <span
          role="button"
          className="control-btn"
          onMouseDown={event => onToggle(event, e, { editorState, id: currentEditor })}
          key={e.style}
          style={isSelect(e.style, blockType, inlineType) ? { color: '#488cfc', borderColor: '#488cfc' } : null}
        >
          <i className={e.class} />
        </span>
      ))
    }
    </div>
  );
};

export default EditorControl;
