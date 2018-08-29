'use strict';
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
// Define our schema using the GraphQL schema language
const typeDefs = `
    scalar DateTime
    type User {
        id: Int!
        firstName: String!
        lastName: String
        email: String!
        projects: [Project]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Project {
        id: Int!
        title: String!
        description: String!
        status: String!
        user: User!
        threads: [Thread]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Thread {
        id: Int!
        title: String!
        projectId: Int!
        project: Project!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Query {
        allUsers: [User]
        fetchUser(id: Int!): User
        allProjects: [Project]
        fetchProject(id: Int!): Project
        fetchThreads(id: Int!): [Thread]
    }
    type Mutation {
        login (
            email: String!,
            password: String!
        ): String
        createUser (
            firstName: String!,
            lastName: String,
            email: String!,
            password: String!
        ): User
        updateUser (
            id: Int!,
            firstName: String!,
            lastName: String,
            email: String!,
            password: String!
        ): User
        addProject (
            title: String!,
            description: String!,
            status: String!,
        ): Project
        updateProject (
            id: Int!,
            title: String!,
            description: String!,
            status: String!,
        ): Project
        deleteProject (id: Int!): Boolean
        addThread (
            title: String!,
            projectId: Int!,
        ): Thread
        updateThread (
            id: Int!,
            title: String!,
        ): Thread
        deleteThread (id: Int!): Boolean
    }
`;
module.exports = makeExecutableSchema({ typeDefs, resolvers });
