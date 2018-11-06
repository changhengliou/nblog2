import React from 'react';

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


// add class active
const EditorControl = () => (
  <div className="editor-control">
    { controls.map(e => (
      <span
        role="button"
        className="control-btn"
        onMouseDown={event => console.log(event)}
        key={e.style}
        style={{ color: '#488cfc', borderColor: '#488cfc' }}
      >
        <i className={e.class} />
      </span>
    ))
    }
  </div>
);

export default EditorControl;
