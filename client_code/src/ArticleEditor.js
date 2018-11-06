import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from '@/store';
import EditorBlock from '@/EditorBlock';
import CodeEditor from '@/CodeEditor';

// snapshot.isDraggingOver
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 8 * 2,
  margin: '0 0 8px 0',
  ...draggableStyle,
});

const renderList = items => items.map((e, i) => (
  <Draggable key={e.get('id')} draggableId={e.get('id')} index={i}>
    {(provided, snapshot) => (
      <EditorBlock
        id={e.get('id')}
        innerRef={provided.innerRef}
        provided={provided}
        snapshot={snapshot}
        style={getItemStyle(
          snapshot.isDragging,
          provided.draggableProps.style,
        )}
        editorState={e.get('editorState')}
      />
    )}
  </Draggable>
));

class ArticleEditor extends React.Component {
  render() {
    const { editors, articleEditorStyle } = this.props;
    return (
      <React.Fragment>
        <Droppable droppableId="editor-drop">
          {provided => (
            <div
              ref={provided.innerRef}
              className="editor-wrap"
            >
              {renderList(editors)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <CodeEditor isVisible={articleEditorStyle.showCodeEditor} />
      </React.Fragment>
    );
  }
}

export default connect(({ editors, articleEditorStyle }) => ({
  editors,
  articleEditorStyle,
}))(ArticleEditor);
