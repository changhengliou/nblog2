import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://0.0.0.0:3000/gql',
});
const Root = () => (
  <ApolloProvider client={client}>
    <Router>
      <Route exact path="/">
        <div>
          Hello there
          <Link to="/s">Navigate to s</Link>
        </div>
      </Route>
    </Router>
  </ApolloProvider>
);
ReactDOM.render(<Root />, document.getElementById('react-app'));
