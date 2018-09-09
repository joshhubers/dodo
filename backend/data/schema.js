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
        organization: Organization!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Organization {
        id: Int!
        name: String!
    }
    type ProjectInvite {
        id: Int!
        from: User!
        to: User!
        project: Project!
    }
    type Project {
        id: Int!
        title: String!
        description: String!
        status: String!
        owner: User!
        members: [User]
        threads: [Thread]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Thread {
        id: Int!
        title: String!
        project: Project!
        posts: [Post]
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type Post {
        id: Int!
        content: String!
        user: User!
        thread: Thread!
        createdAt: DateTime! # will be generated
        updatedAt: DateTime! # will be generated
    }
    type JwtLogin {
      token: String!
      user: User!
    }
    type Query {
        allUsers(excludeIds: [Int]): [User]
        fetchUser(id: Int!): User
        allProjects: [Project]
        fromInvites(projectId: Int): [ProjectInvite]
        toInvites: [ProjectInvite]
        fetchProject(id: Int!): Project
        fetchThread(id: Int!): Thread
    }
    type Mutation {
        login (
            email: String!,
            password: String!
        ): JwtLogin
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
        addProjectInvite(
          toUserId: Int!,
          projectId: Int!
        ): ProjectInvite
        addThread (
            title: String!,
            projectId: Int!,
        ): Thread
        updateThread (
            id: Int!,
            title: String!,
        ): Thread
        deleteThread (id: Int!): Boolean
        addPost (
            content: String!,
            threadId: Int!,
            userId: Int!,
        ): Post
        updatePost (
            id: Int!,
            content: String!,
        ): Post
        deletePost (id: Int!): Boolean
    }
`;
module.exports = makeExecutableSchema({ typeDefs, resolvers });
