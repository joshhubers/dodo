import Ember from 'ember';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import gql from "graphql-tag";

const USER_ID = 'user-id';
const AUTH_TOKEN = 'auth-token';

// See: https://github.com/howtographql/ember-apollo/blob/master/app/services/auth.js
export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    this.getUserId();
    this.getAuthToken();
  },

  apollo: service(),

  authToken: null,

  getUserId() {
    const userId = localStorage.getItem(USER_ID);
    this.setUserId(userId);
    return userId;
  },

  getAuthToken() {
    const token = localStorage.getItem(AUTH_TOKEN);
    this.setAuthToken(token);
    return token;
  },

  isLoggedIn: Ember.computed('userId', function() {
    return this.userId;
  }),

  login(email, password) {
    return new RSVP.Promise((resolve, reject) => {
      const variables = { email, password };

      const loginQuery = gql`
      mutation Login($email: String!, $password: String!) 
      {
        login(email: $email, password: $password) {
          token,
          user {
            id
          }
        }
      }
      `;


      this.apollo.mutate({
        mutation: loginQuery,
        variables: {
          email,
          password
        }
      }, "login").then(result => {

        this.saveUserData(result.user.id, result.token);
        resolve();
      })
        .catch(error => reject(error));
    });
  },

  logout() {
    return new RSVP.Promise(resolve => {
      this.removeUserId();
      this.removeAuthToken();
      resolve();
    });
  },

  removeUserId() {
    localStorage.removeItem(USER_ID);
    this.set('userId', null);
  },

  removeAuthToken() {
    localStorage.removeItem(AUTH_TOKEN);
    this.set('authToken', null);
  },

  saveUserData(id, token) {
    this.setUserId(id);
    this.setAuthToken(token);
  },

  setUserId(id) {
    localStorage.setItem(USER_ID, id);
    this.set('userId', id);
  },

  setAuthToken(token) {
    localStorage.setItem(AUTH_TOKEN, token);
    this.set('authToken', token);
  },

  userId: null
});
