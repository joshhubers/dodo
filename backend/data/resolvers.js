'use strict';

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { User, Project, ProjectUser, Thread, Post, ProjectInvite } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define resolvers
const resolvers = {
  Query: {
    // Fetch all users
    async allUsers(foo, bar, { authUser }) {
      // Make sure user is logged in
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      return await User.findAll({ where: { organizationId: authUser.organizationId } });
    },

    // Get a user by it ID
    async fetchUser(_, { id }) {
      // Make sure user is logged in
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      return await User.findById(id);
    },

    // Fetch all posts
    async allProjects(foo, bar, { authUser }) {
      // Make sure user is logged in
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      //TODO: optimize this. Could be moved into a manual SQL query
      // I'm just moving fast and don't care as long it workkksss

      const user = await User.find(
        { 
          where: { id: authUser.id },
          include: [ 
            { model: Project, as: 'ownedProjects' },
            { model: Project, as: 'memberProjects' },
          ] 
        });

      user.ownedProjects.forEach(op => op.owned = true);
      user.memberProjects.forEach(up => up.owned = false);

      return user.ownedProjects.concat(user.memberProjects);
    },

    // Fetch all project invites to a user
    async toInvites(foo , bar, { authUser }) {
      // Make sure user is logged in
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      return await ProjectInvite.findAll(
        { 
          where: { toUserId: authUser.id },
          include: [
            { model: Project, as: 'project' },
            { model: User, as:'to' },
            { model: User, as:'from' },
          ]
        }
      );
    },

    // Fetch all project invites from a user
    async fromInvites(foo, { projectId }, { authUser }) {
      // Make sure user is logged in
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      if(projectId) {
        return await ProjectInvite.findAll(
          { 
            where: { fromUserId: authUser.id, projectId },
            include: [
              { model: User, as:'to' },
              { model: User, as:'from' },
            ]
          }
        );
      }

      return await ProjectInvite.findAll(
        { 
          where: { fromUserId: authUser.id },
          include: [
            { model: User, as:'to' },
            { model: User, as:'from' },
          ]
        }
      );
    },

    // Get a post by it ID
    async fetchProject(_, { id }, { authUser }) {
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      //TODO: Add auth to check the authUser belongs to or owns the project

      const project = await Project.find(
        { 
          where: { id }, 
          include: [
            { model: Thread, as:'threads' }, 
            { model: User, as:'owner' },
            { model: User, as:'members' }
          ]
        }
      );

      //Make sure they belong to the project if they don't own it.
      if(project.userId !== authUser.id) {
        const projectUser = await ProjectUser.find({ where: { userId: authUser.id, projectId: id } });
        if(!projectUser) {
          throw new Error('You do not have access to this project');
        }
      } 

      return project;
    },

    async fetchThread(_, { id }) {
      return await Thread.find({ where: { id }, include: [{ model: Post, as:'posts', include: [{ model: User, as:'user' }] }]});
    },
  },

  Mutation: {

    async acceptInvite(_, { id }, { authUser }) {
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      const invite = await ProjectInvite.find({ where: { id, toUserId: authUser.id }});

      if(!invite) {
        throw new Error('Invite not found!');
      }

      await ProjectUser.create({
        userId: authUser.id,
        projectId: invite.projectId
      });

      return await invite.destroy();
    },

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

      const token = jwt.sign({
        id: user.id,
        email: user.email,
        organizationId: user.organizationId,
      }, 'supersecrettokensecret', { expiresIn: '1y' });

      return { token, user, }
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
    async addProjectInvite(_, { toUserId, projectId }, { authUser }) {
      // Make sure user is logged in
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      const user = await User.findById(authUser.id);

      //TODO: Verify an invite doesn't already exist

      const projectInvite = await ProjectInvite.create({
        fromUserId: user.id,
        toUserId: toUserId,
        projectId: projectId
      });

      return projectInvite;
    },

    // Add a new post
    async addProject(_, { title, description, status }, { authUser }) {
      // Make sure user is logged in
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      const user = await User.findById(authUser.id);

      const project = await Project.create({
        userId: user.id,
        title,
        description,
        status
      });

      return project;
    },

    // Update a particular post
    async updateProject(_, { id, title, description, status }, { authUser }) {
      // Make sure user is logged in
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      // fetch the post by it ID
      const project = await Project.findById(id);

      if (project.userId !== authUser.id) {
        throw new Error('You are not authorized to edit this project!')
      }

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
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      // fetch the post by it ID
      const project = await Project.findById(id);

      if (project.userId !== authUser.id) {
        throw new Error('You are not authorized to edit this project!')
      }

      return await project.destroy();
    },

    // Add a new thread
    async addThread(_, { title, projectId }, { authUser }) {
      // Make sure user is logged in
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      //TODO: Add auth to create thread for project

      const thread = await Thread.create({
        title,
        projectId
      });

      return thread;
    },

    // Update a particular thread
    async updateThread(_, { id, title }, { authUser }) {
      // Make sure user is logged in
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }
      

      //TODO: Add auth to update thread for project

      // fetch the post by it ID
      const thread = await Thread.findById(id);

      // Update the post
      await thread.update({
        title,
      });

      return thread;
    },

    // Delete a specified thread
    async deleteThread(_, { id }, { authUser }) {
      // Make sure user is logged in

      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      //TODO: Add auth to delete thread for project
      

      // fetch the thread by it ID
      const thread = await Thread.findById(id);

      return await thread.destroy();
    },

    // Add a new thread
    async addPost(_, { content, userId, threadId }, { authUser }) {
      // Make sure user is logged in
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      const user = await User.findOne({ where: { id: authUser.id } });

      const post = await Post.create({
        content,
        userId: user.id,
        threadId
      });

      return await Post.find({where: { id: post.id }, include: [{ model: User, as: 'user' }]});
    },

    // Update a particular thread
    async updatePost(_, { id, content }, { authUser }) {
      // Make sure user is logged in
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      // fetch the post by it ID
      const post = await Post.findById(id);

      if(post.userId !== authUser.id) {
        throw new Error('You do not have permission to update this post')
      }

      // Update the post
      await post.update({
        content,
      });

      return post;
    },

    // Delete a specified post
    async deletePost(_, { id }, { authUser }) {
      // Make sure user is logged in
      if (!authUser) {
        throw new Error('You must log in to continue!')
      }

      // fetch the post by it ID
      const post = await Post.findById(id);

      if(post.userId !== authUser.id) {
        throw new Error('You do not have permission to delete this post')
      }

      return await post.destroy();
    },
  },

  User: {
    // Fetch all posts created by a user
    //async projects(user) {
      //return await user.getProjects();
    //}
  },

  Project: {
    // Fetch the author of a particular post
    //async user(project) {
      //return await project.getUser();
    //},
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
