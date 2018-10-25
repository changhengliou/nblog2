import React from 'react';
import {
  Editor, RichUtils, getDefaultKeyBinding,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { actions } from '@/store';

const getStyle = ({ isDragging }) => ({
  minHeight: '120px',
  border: '2px dashed',
  borderColor: isDragging ? '#ccc' : 'transparent',
  borderRadius: '4px',
  position: 'relative',
});

const onMouseDown = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

class EditorBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showControl: false };
    this.editor = React.createRef();
    this.onChange = actions.onEditorStateChange;
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this.mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4, /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType,
      ),
    );
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle,
      ),
    );
  }

  render() {
    const {
      style: draggableStyle, innerRef, provided, snapshot, id, editorState,
    } = this.props;
    const { showControl } = this.state;
    return (
      <div
        ref={innerRef}
        style={{ ...draggableStyle }}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div className="RichEditor-editor" style={getStyle(snapshot)}>
          <div style={{ display: `${showControl ? 'block' : 'none'}` }}>
            <span
              className="editor-block-drag-tab move"
            >
              <i className="fa fa-arrows-alt" />
            </span>
            <span
              role="button"
              className="editor-block-drag-tab code"
              onClick={() => {
                actions.setCodeEditorVisibility(true);
              }}
              onMouseDown={onMouseDown}
            >
              <i className="fa fa-code" />
            </span>
            <span
              role="button"
              className="editor-block-drag-tab copy"
              onClick={() => actions.onEditorCopy(id)}
              onMouseDown={onMouseDown}
            >
              <i className="far fa-copy" />
            </span>
            <span
              role="button"
              className="editor-block-drag-tab delete"
              onClick={() => actions.onEditorDelete(id)}
              onMouseDown={onMouseDown}
            >
              <i className="far fa-trash-alt" />
            </span>
          </div>
          <div
            style={{ minHeight: 'inherit' }}
            onClick={() => {
              if (this.editor.current) {
                actions.onEditorBlockFocus(id);
                this.editor.current.focus();
                this.setState({ showControl: true });
              }
            }}
            onBlur={() => { this.setState({ showControl: false }); }}
          >
            <Editor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              onFocus={() => { console.log(id); }}
              placeholder="Template..."
              ref={this.editor}
              spellCheck
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EditorBlock;
