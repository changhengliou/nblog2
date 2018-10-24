import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from '@/store';
import EditorBlock from '@/EditorBlock';
import CodeEditor from '@/CodeEditor';

const grid = 8;
// snapshot.isDraggingOver
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  ...draggableStyle,
});

const getListStyle = {
  padding: grid,
  width: '80%',
  minHeight: '600px',
  margin: '65px 10% 20px 10%',
  border: '1px solid #ccc',
};

const renderList = items => items.map((e, i) => (
  <Draggable key={e.id} draggableId={e.id} index={i}>
    {(provided, snapshot) => (
      <EditorBlock
        id={e.id}
        innerRef={provided.innerRef}
        provided={provided}
        snapshot={snapshot}
        style={getItemStyle(
          snapshot.isDragging,
          provided.draggableProps.style,
        )}
      >
        {e.content}
      </EditorBlock>
    )}
  </Draggable>
));

const ArticleEditor = (props) => {
  const { editorContent, articleEditorStyle } = props;
  return (
    <React.Fragment>
      <Droppable droppableId="editor-drop">
        {provided => (
          <div
            ref={provided.innerRef}
            style={getListStyle}
          >
            {renderList(editorContent)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <CodeEditor isVisible={articleEditorStyle.showCodeEditor} />
    </React.Fragment>
  );
};

export default connect(({ editorContent, articleEditorStyle }) => ({
  editorContent,
  articleEditorStyle,
}))(ArticleEditor);
