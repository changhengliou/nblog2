import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import ArticleList from './src/ArticleList';
import ArticleDeatil from './src/ArticleDetail';
import EditArticlePage from './src/EditArticlePage';
import { Provider } from './src/store';

const prefix = '/static/dist';
const client = new ApolloClient({
  uri: 'http://0.0.0.0:3000/gql',
});

const App = () => (
  <Switch>
    <Route exact path={`${prefix}/`} component={EditArticlePage} />
    <Route exact path={`${prefix}/article`} component={ArticleList} />
    <Route exact path={`${prefix}/article/:id`} component={ArticleDeatil} />
  </Switch>
);
const Root = () => (
  <ApolloProvider client={client}>
    <Router>
      <Provider>
        <App />
      </Provider>
    </Router>
  </ApolloProvider>
);
ReactDOM.render(<Root />, document.getElementById('react-app'));
