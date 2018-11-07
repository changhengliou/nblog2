import Html from 'slate-html-serializer';
import React from 'react';

const BLOCK_TAGS = {
  p: 'paragraph',
  blockquote: 'quote',
  pre: 'code',
  h1: 'header-one',
  h2: 'header-two',
  h3: 'header-three',
  h4: 'header-four',
  h5: 'header-five',
  h6: 'header-six',
};

const MARK_TAGS = {
  strong: 'bold',
  em: 'italic',
  u: 'underline',
  a: 'anchor',
};

const getAttributes = (el) => {
  const value = {};
  for (let i = 0; el.attributes && i < el.attributes.length; ++i) {
    value[el.attributes[i].name] = el.attributes[i].value;
  }
  return value;
};

export const renderNode = (props, editor, next) => {
  const { children, node } = props;
  switch (node.type) {
    // block type
    case 'paragraph':
      return <p>{children}</p>;
    case 'quote':
      return <blockquote>{children}</blockquote>;
    case 'code':
      return <pre><code>{children}</code></pre>;
    case 'header-one':
      return <h1>{children}</h1>;
    case 'header-two':
      return <h2>{children}</h2>;
    case 'header-three':
      return <h3>{children}</h3>;
    case 'header-four':
      return <h4>{children}</h4>;
    case 'header-five':
      return <h5>{children}</h5>;
    case 'header-six':
      return <h6>{children}</h6>;
    default:
      return next();
  }
};

export const renderMark = (props, editor, next) => {
  const { children, mark } = props;
  const { data, type } = mark;
  switch (type) {
    case 'bold':
      return <strong>{children}</strong>;
    case 'italic':
      return <em>{children}</em>;
    case 'undreline':
      return <u>{children}</u>;
    case 'anchor':
      return <a href={data.get('href')} style={{ cursor: 'pointer' }}>{children}</a>;
    default:
      return next();
  }
};
const rules = [
  {
    // Switch deserialize to handle more blocks...
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'block',
          type,
          props: getAttributes(el),
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>;
          case 'quote':
            return <blockquote>{children}</blockquote>;
          case 'code':
            return <pre><code>{children}</code></pre>;
          case 'header-one':
            return <h1>{children}</h1>;
          default:
        }
      }
    },
  },
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: 'mark',
          type,
          nodes: next(el.childNodes),
          data: { ...getAttributes(el) },
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>;
          case 'italic':
            return <em>{children}</em>;
          case 'underline':
            return <u>{children}</u>;
          case 'anchor':
            return <a href={obj.data.get('href')}>{children}</a>;
          default:
        }
      }
    },
  },
];

export const htmlConverter = new Html({ rules });
