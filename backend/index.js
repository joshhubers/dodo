'use strict';

//const express = require('express');
import express from 'express';
import bodyParser from 'body-parser';
//const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
import {
    graphqlExpress,
    graphiqlExpress,
} from 'apollo-server-express';
const schema = require('./data/schema');
const jwt = require('express-jwt');
const PORT = 3000;

// Create our express app
const app = express();

// Graphiql for testing the API out
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Graphql endpoint
app.use('/api', bodyParser.json(), jwt({
        secret: 'supersecrettokensecret',
        credentialsRequired: false,
    }), graphqlExpress( req => ({
        schema,
        context: {
            authUser: req.user
        }
})));

app.listen(PORT, () => {
    console.log(`GraphiQL is running on http://localhost:${PORT}/graphiql`);
});
