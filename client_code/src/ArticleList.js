import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { graphql } from 'react-apollo';

const query = gql`
  {
    article {
      title
    }
  }
`;
const mutation = gql`
  mutation addArticle($title: String){
    addArticle(title: $title)
  }
`;

class ArticleList extends Component {
  onSubmit() {
    this.props.mutate({
      variables: {
        title: '',
      },
      refetchQueries: [{ query }],
    });
  }

  render() {
    const { id } = this.state;
    const { loading } = this.props.data;
    console.log(this.props);
    return loading
      ? <div>loading...</div> : (
        <div>
        Just an another article
          { ` ${id}` }
        </div>
      );
  }
}
ArticleList.propTypes = {
  data: PropTypes.any,
};


export default graphql(mutation)(
  graphql(query)(ArticleList),
);
