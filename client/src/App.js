import React, { Component } from 'react';
import './index.css';

//Apollo

import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'

//components
import AuthorList from './components/AuthorList'
import BookList from './components/BookList'
import AddBook from './components/AddBook'

//apollo setup

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
<ApolloProvider client={client}>
        <div className="App">
        <BookList/>
        <AuthorList/>
        <AddBook/>
        
      </div>
</ApolloProvider>
    );
  }
}

export default App;
