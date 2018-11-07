import React from 'react';
import { Editor } from 'slate-react';
import { actions } from './store';
import { renderNode, renderMark } from './richeditor/tags';

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
    this.editor = React.createRef();
    this.state = {
      showControl: false,
    };
  }

  render() {
    const {
      style: draggableStyle, innerRef, provided, snapshot, id, value,
    } = this.props;
    const { showControl } = this.state;
    return (
      <div
        ref={innerRef}
        style={{ ...draggableStyle }}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div style={getStyle(snapshot)}>
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
          <Editor
            ref={this.editor}
            style={{ minHeight: 'inherit', cursor: 'text' }}
            value={value}
            renderNode={renderNode}
            renderMark={renderMark}
            onBlur={(e, editor) => {
              e.preventDefault();
              this.setState({ showControl: false }, () => {
                editor.blur();
              });
            }}
            onClick={(e, editor) => {
              e.preventDefault();
              this.setState({ showControl: true }, () => {
                editor.focus();
                actions.onCurrentEditorChange(id);
              });
            }}
            onChange={(change) => {
              actions.onEditorStateChange({
                value: change.value,
                id,
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default EditorBlock;
