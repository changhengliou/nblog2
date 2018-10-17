import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from './store';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
  height: '100vh',
});

const renderList = items => items.map((e, i) => (
  <Draggable key={e.id} draggableId={e.id} index={i}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(
          snapshot.isDragging,
          provided.draggableProps.style,
        )}
      >
        {e.content}
      </div>
    )}
  </Draggable>
));

const ArticleEditor = (props) => {
  const { editorContent } = props;
  return (
    <Droppable droppableId="editor-drop">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {renderList(editorContent)}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default connect(({ editorContent }) => ({ editorContent }))(ArticleEditor);
