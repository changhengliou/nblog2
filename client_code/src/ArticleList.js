// import gql from 'graphql-tag';
// import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { getRandomString } from '@/util';
import { connect, actions } from '@/store';
// import { graphql } from 'react-apollo';

const renderArticle = (articles) => {
  if (!articles.length) return (<div>No article.</div>);
  return articles.map(a => (
    <li style={{ border: '1px solid #ccc', borderRadius: '4px', margin: '6px 12px' }} key={getRandomString()}>
      <h2>{a.title}</h2>
      <div>{a.excerpt}</div>
      <div>{a.author}</div>
      <div>{a.content}</div>
    </li>
  ));
};

const addArticle = () => {
  actions.addArticle({
    author: document.forms['edit-article'].author.value,
    content: document.forms['edit-article'].content.value,
  });
  document.forms['edit-article'].author.value = '';
  document.forms['edit-article'].content.value = '';
};

const ArticleList = (props) => {
  const { articles } = props;
  return (
    <div>
      <div><Link to="/static/dist/">index</Link></div>
      <ul>{ renderArticle(articles) }</ul>
      <div>
        <form id="edit-article">
          <input type="text" placeholder="author" name="author" />
          <input type="text" placeholder="content" name="content" />
          <button type="button" onClick={addArticle}>Add</button>
        </form>
      </div>
    </div>
  );
};

export default connect(props => props)(ArticleList);
// const query = gql`
//   {
//     article {
//       title
//     }
//   }
// `;
// const mutation = gql`
//   mutation addArticle($title: String){
//     addArticle(title: $title)
//   }
// `;

// class ArticleList extends Component {
//   onSubmit() {
//     this.props.mutate({
//       variables: {
//         title: '',
//       },
//       refetchQueries: [{ query }],
//     });
//   }

//   render() {
//     const { id } = this.state;
//     const { loading } = this.props.data;
//     console.log(this.props);
//     return loading
//       ? <div>loading...</div> : (
//         <div>
//         Just an another article
//           { ` ${id}` }
//         </div>
//       );
//   }
// }
// ArticleList.propTypes = {
//   data: PropTypes.any,
// };


// export default graphql(mutation)(
//   graphql(query)(ArticleList),
// );
