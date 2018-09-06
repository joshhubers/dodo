import Component from '@ember/component';
import { inject as service } from '@ember/service';
import gql from "graphql-tag";

export default Component.extend({
  apollo: service(),
  auth: service(),

  actions: {
    login() {
      this.auth.login('john@doe.email.com', 'abc123');
    },
    logout() {
      this.auth.logout();
    },
  }
});
