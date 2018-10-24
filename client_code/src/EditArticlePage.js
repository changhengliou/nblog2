import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import ArticleEditor from '@/ArticleEditor';
import ArticleEditorSideTool from '@/ArticleEditorSIdeTool';
import { actions } from '@/store';
import EditorControl from '@/EditorControl';

const onDragEnd = (result) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId === destination.droppableId) {
    if (source.droppableId === 'side-drop') return;
    actions.onEditorSwap({ src: source, dest: destination });
  } else {
    if (source.droppableId === 'editor-drop') return;
    actions.onEditorDrop({ src: source, dest: destination });
  }
};
const EditArticlePage = () => (
  <div style={{ position: 'relative' }}>
    <DragDropContext onDragEnd={onDragEnd}>
      <EditorControl />
      <ArticleEditor />
      <ArticleEditorSideTool />
    </DragDropContext>
  </div>
);

export default EditArticlePage;
