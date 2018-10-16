import React from 'react';
import PropTypes from 'prop-types';
import { getDateTimeString } from './util';

const renderComments = (comments) => {
  if (!Array.isArray(comments)) { return <div>No one lefts a comment yet.</div>; }
  return comments.map(c => <div key={new Date().getTime()}>{ `${c.commenter} [${getDateTimeString()}]: ${c.content}` }</div>);
};
const ArticleDetail = (props) => {
  const {
    title, detail, comments, author, time,
  } = props;
  return (
    <div>
      <h2>{ title }</h2>
      <div>{ detail }</div>
      <div>{ renderComments(comments) }</div>
      <div>{ `By ${author}, ${getDateTimeString(time)}` }</div>
    </div>
  );
};

ArticleDetail.propTypes = {
  title: PropTypes.string,
  detail: PropTypes.string,
  author: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.shape({
    commenter: PropTypes.string,
    content: PropTypes.string,
    time: PropTypes.number,
  })),
  time: PropTypes.number,
};
export default ArticleDetail;

// export default graphql(mutation)(
//   graphql(query) {
//     options: props => ({ variables: {id: props.params.id } })
//   } (ArticleList),
// );
