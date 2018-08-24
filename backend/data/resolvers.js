'use strict';

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { User, Project } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define resolvers
const resolvers = {
    Query: {
        // Fetch all users
        async allUsers() {
           return await User.all();
        },

        // Get a user by it ID
        async fetchUser(_, { id }) {
            return await User.findById(id);
        },

        // Fetch all posts
        async allProjects() {
            return await Project.all();
        },

        // Get a post by it ID
        async fetchProject(_, { id }) {
            return await Project.findById(id);
        },
    },

    Mutation: {
        // Handles user login
        async login(_, { email, password }) {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                throw new Error('No user with that email');
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                throw new Error('Incorrect password');
            }

            // Return json web token
            return jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.JWT_SECRET, { expiresIn: '1y' });
        },

        // Create new user
        async createUser(_, { firstName, lastName, email, password }) {
            return await User.create({
                firstName,
                lastName,
                email,
                password: await bcrypt.hash(password, 10)
            });
        },

        // Update a particular user
        async updateUser(_, { id, firstName, lastName, email, password }, { authUser }) {
            // Make sure user is logged in
            if (!authUser) {
                throw new Error('You must log in to continue!')
            }

            // fetch the user by it ID
            const user = await User.findById(id);

            // Update the user
            await user.update({
                firstName,
                lastName,
                email,
                password: await bcrypt.hash(password, 10)
            });

            return user;
        },

        // Add a new post
        async addProject(_, { title, description, status }, { authUser }) {
            // Make sure user is logged in
            //if (!authUser) {
                //throw new Error('You must log in to continue!')
            //}

            //const user = await User.findOne({ where: { id: authUser.id } });

            const project = await Project.create({
                //userId: user.id,
                userId: 1,
                title,
                description,
                status
            });

            return project;
        },

        // Update a particular post
        async updateProject(_, { id, title, description, status }, { authUser }) {
            // Make sure user is logged in
            //if (!authUser) {
                //throw new Error('You must log in to continue!')
            //}

            // fetch the post by it ID
            const project = await Project.findById(id);

            // Update the post
            await project.update({
                title,
                description,
                status
            });

            return project;
        },

        // Delete a specified post
        async deleteProject(_, { id }, { authUser }) {
            // Make sure user is logged in
            //if (!authUser) {
                //throw new Error('You must log in to continue!')
            //}

            // fetch the post by it ID
            const project = await Project.findById(id);

            return await project.destroy();
        },
    },

    User: {
        // Fetch all posts created by a user
        async projects(user) {
            return await user.getProjects();
        }
    },

    Project: {
        // Fetch the author of a particular post
        async user(project) {
            return await project.getUser();
        },
    },

    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'DateTime type',

        parseValue(value) {
            // value from the client
            return new Date(value);
        },

        serialize(value) {
            const date = new Date(value);

            // value sent to the client
            return date.toISOString();
        },

        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                // ast value is always in string format
                return parseInt(ast.value, 10);
            }

            return null;
        }
    })
};

module.exports = resolvers;
