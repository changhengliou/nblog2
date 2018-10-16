import createStore from 'react-waterfall';

const config = {
  initialState: { articles: [] },
  actionsCreators: {
    addArticle(props, actions, params) {
      const articles = JSON.parse(JSON.stringify(props.articles));
      articles.push(params);
      return { articles };
    },
  },
};

export const { Provider, connect, actions } = createStore(config);
