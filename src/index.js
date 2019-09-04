import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import 'index.scss';

// Components
import App from './App';

// Apollo Client Setup
const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
