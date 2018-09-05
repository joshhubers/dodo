'use strict';

import 'babel-polyfill'
import express from 'express';
import bodyParser from 'body-parser';
const { graphqlExpress } = require('apollo-server-express');
import { ApolloServer } from 'apollo-server-express';
const schema = require('./data/schema');
const jwt = require('express-jwt');
const PORT = 3000;

// Create our express app
const app = express();

const auth = jwt({
  secret: 'foobar',
  credentialsRequired: false
});

// Graphiql for testing the API out
//app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

//// Graphql endpoint
app.use('/api', bodyParser.json(), auth);

const server = new ApolloServer({ 
  schema,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    if(token) {
      const data = token.split(' ')[1];
      const dataParts = data.split('.');
      const authUser = JSON.parse(Buffer.from(dataParts[1], 'base64').toString());

      return { authUser };
      
    } else {
      return null;
    }
  }
}); 
server.applyMiddleware({ app });

app.listen(PORT, () => {
    console.log(`Graphql is running on http://localhost:${PORT}/${server.graphqlPath}`);
});
