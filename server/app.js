const express = require('express');
const graphqlHTTP = require('express-graphql')
const app = express()
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')


  
  //mongoose setup

// const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://debbie:debbiePass@cluster0-n9rov.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri)
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log('error', err)
//   // perform actions on the collection object
//   client.close();
// });

app.use(cors())

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true}))




app.listen(4000, () => {
  console.log('now listening on port 4000')
})