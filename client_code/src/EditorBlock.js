import React from 'react';
import { Editor, EditorState } from 'draft-js';
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
    this.state = { editorState: EditorState.createEmpty(), showControl: false };
    this.editor = React.createRef();
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  render() {
    const {
      style: draggableStyle, innerRef, provided, snapshot, id,
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
                this.editor.current.focus();
                this.setState({ showControl: true });
              }
            }}
            onBlur={() => { this.setState({ showControl: false }); }}
          >
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              placeholder="Template..."
              ref={this.editor}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EditorBlock;
