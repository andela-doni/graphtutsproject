import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import Button from './Button'
import {getAuthorsQuery} from '../queries/queries'



class AddBook extends Component {

  loadAuthors(data) {
    if (data.loading) {
      return (<option>loading data</option>)
    }
    else {
      return (data.authors.map((author) => {
        return (<option key={author.id} value={author.id}>{author.name}</option>)
      }))
    }
  }
  render() {
    let data = this.props.data
    let title = 'Submit'
    return (
      <div>
        <form id="form">

          <div className="field">
            <label>Book name</label>
            <input type="text" />
          </div>
          <div className="field">
            <label>Genre</label>
            <input type="text" />
          </div>
          <div className="field">
            <label>Author</label>
            <select>
              <option>Select Author</option>
              {this.loadAuthors(data)}
            </select>
          </div>
          <div><Button title="Submit"/></div>

        </form>
      </div>
    )
  }
}

export default graphql(getAuthorsQuery)(AddBook);