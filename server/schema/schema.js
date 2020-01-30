const graphql = require('graphql');

const dummy = require('./dummy') 
const _ = require('lodash')

const {
  GraphQLObjectType,
  GraphQLString,  
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql

const BookType = new GraphQLObjectType(
  {
    name: 'Book',
    fields: () => ({
      id: {type: GraphQLID},
      name:{type: GraphQLString},
      genre:{type: GraphQLString},
      author:{
        type: AuthorType,
        resolve(parent, args){
          // console.log('parent',parent)
          return _.find(dummy.authors, {id: parent.authorId})
        }
      }
    })
  }
)


const AuthorType = new GraphQLObjectType(
  {
    name: 'Author',
    fields: () => ({
      id: {type: GraphQLID},
      name:{type: GraphQLString},
      age:{type: GraphQLInt},
      books:{
        type: new GraphQLList(BookType),
        resolve(parent, args){
          return _.filter(dummy.books, {authorId: parent.id})
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
        args:{id: {type: GraphQLID}},
        resolve(parent, args){
          //code to get data from db
          return _.find(dummy.books,{id: args.id})
        }
      },
      author:{
        type: AuthorType,
        args:{id:{type: GraphQLID}},
        resolve(parent, args){
          return _.find(dummy.authors,{id: args.id})
        }
      },
      books:{
        type: new GraphQLList(BookType),
        resolve(parent,args){
          return dummy.books
        }
      },
      authors:{
        type: new GraphQLList(AuthorType),
        resolve(parent, args){
          console.log('authors',dummy.authors)
          return dummy.authors
        }
      }
    }
  }
)

module.exports = new GraphQLSchema({
  query: RootQuery
})