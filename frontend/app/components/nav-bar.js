import Component from '@ember/component';
import { inject as service } from '@ember/service';
import gql from "graphql-tag";

export default Component.extend({
  apollo: service(),

  actions: {
    login() {
      const loginQuery = gql`
      mutation Login($email: String!, $password: String!) 
      {
        login(email: $email, password: $password)
      }
      `;

      this.apollo.mutate({
        mutation: loginQuery,
        variables: {
          email: "john@doe.email.com",
          password: "abc123",
        }
      }, "login").then(login => {
        debugger;
      });
    },
  }
});
