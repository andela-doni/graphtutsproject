const graphql = require('graphql');

const dummy = require('./dummy');
// const _ = require('lodash');

const Book = require('../models/bookModel');
const Author = require('../models/authorModel');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql

//list of books associated with an author
const BookType = new GraphQLObjectType(
  {
    name: 'Book',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
        type: AuthorType,
        resolve(parent, args) {
          return Author.findById(parent.authorId)
        }
      }
    })
  }
)

//list of authors with books associated with them

const AuthorType = new GraphQLObjectType(
  {
    name: 'Author',
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
          // return _.filter(dummy.books, {authorId: parent.id})
          return Book.find({ authorId: parent.id })
        }
      }
    })
  }
)

const RootQuery = new GraphQLObjectType(
  {
    name: 'RootTypeQuery',
    fields: {
      book: {
        type: BookType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          //code to get data from db
          // return _.find(dummy.books,{id: args.id})
          return Book.findById(args.id)
        }
      },
      author: {
        type: AuthorType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          // return _.find(dummy.authors,{id: args.id})
          return Author.findById(args.id)
        }
      },
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {

          return Book.find()
        }
      },
      authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args) {
          // return dummy.authors
          return Author.find()
        }
      }
    }
  }
)

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        })

        return author.save()
      }
    },
    deleteAuthor: {
      type: AuthorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        console.log(Author)
        return Author.findByIdAndRemove(args.id)
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save()
      }
    },
    updateBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent,args){
        return Book.findByIdAndUpdate(args,id,args)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})