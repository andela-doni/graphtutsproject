import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { graphql } from 'react-apollo'
import {getBooksQuery} from '../queries/queries'
class BookList extends Component {



  isLoading(data) {
      if(data.loading) { return (<h3>loading</h3>) } 
      else{
        return (data.books.map((book => {
        return (<li key={book.id}>{book.name}</li>)
      })))

      } 
  }
  render() {
    let data = this.props.data
    return (
      <div className="book-list">
        <h1>Book List</h1>
          {this.isLoading(this.props.data)}
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
