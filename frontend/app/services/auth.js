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
    this.getAuthToken();
  },

  apollo: service(),

  authToken: null,

  getAuthToken() {
    const token = localStorage.getItem(AUTH_TOKEN);
    if(token) {
      this.setAuthToken(token);
    }
    return token;
  },

  getAuthTokenContents() {
    const token = this.getAuthToken();
    const parts = token.split('.');
    return atob(parts[1]);
  }

  isLoggedIn: Ember.computed('userId', function() {
    return this.authToken;
  }),

  login(email, password) {
    return new RSVP.Promise((resolve, reject) => {
      const variables = { email, password };

      const loginQuery = gql`
      mutation Login($email: String!, $password: String!) 
      {
        login(email: $email, password: $password) {
          token,
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

        this.setAuthToken(result.token);
        resolve();
      })
        .catch(error => reject(error));
    });
  },

  logout() {
    return new RSVP.Promise(resolve => {
      this.removeAuthToken();
      resolve();
    });
  },

  removeAuthToken() {
    localStorage.removeItem(AUTH_TOKEN);
    this.set('authToken', null);
  },

  setAuthToken(token) {
    localStorage.setItem(AUTH_TOKEN, token);
    this.set('authToken', token);
  },

  getUserId() {
    return this.getAuthTokenContents().userId;
  }
});
