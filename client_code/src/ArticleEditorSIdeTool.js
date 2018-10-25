import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect, actions } from '@/store';
import '@/style/articleEditor.css';

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
  height: '100%',
  overflow: 'auto',
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

const ArticleEditorSIdeTool = (props) => {
  const { toolboxContent, style } = props;
  return (
    <div
      className={`editor-sidebar ${style.showSideBar ? '' : 'hide'}`}
    >
      <div
        role="button"
        style={{
          position: 'absolute',
          top: '20px',
          left: '-30px',
          width: '30px',
          height: '60px',
          background: '#ccc',
          borderBottomLeftRadius: '60px',
          borderTopLeftRadius: '60px',
          lineHeight: '60px',
          cursor: 'pointer',
          zIndex: '100',
        }}
        onClick={actions.toggleSidebar}
      >
        <i style={{ transform: 'translateX(10px)', display: 'inline-block', color: '#888' }}>
          {style.showSideBar ? '>' : '<'}
        </i>
      </div>
      <Droppable droppableId="side-drop">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {renderList(toolboxContent)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};


export default connect(({ toolboxContent, articleEditorStyle }) => ({
  toolboxContent,
  style: articleEditorStyle,
}))(ArticleEditorSIdeTool);
