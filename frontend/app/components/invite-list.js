import Component from '@ember/component';
import { ComponentQueryManager } from "ember-apollo-client";
import gql from "graphql-tag";

export default Component.extend(ComponentQueryManager, {
  invites: null,

  init() {
    this._super(...arguments);
    this.loadInvites();
  },

  loadInvites() {
    const inviteQuery = gql`
      query {
        toInvites {
          id
          from {
            firstName
            lastName
          }
          project {
            title
          }
        }
      }
    `;

    this.apollo.query({ query: inviteQuery }, 'toInvites').then(invites => {
      this.set('invites', invites);
    });
  },

  actions: {
    acceptInvite(inviteId) {
      const acceptInviteQuery = gql`
        mutation AcceptInvite($inviteId: Int!) {
          acceptInvite(id: $inviteId)
        }
      `;

      this.apollo.mutate({ mutation: acceptInviteQuery, variables: { inviteId }});
    },
  }

});
