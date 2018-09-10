import Component from '@ember/component';
import { ComponentQueryManager } from "ember-apollo-client";
import gql from "graphql-tag";

export default Component.extend(ComponentQueryManager, {

  // Local Variables
  invites: null,
  isLoading: true,

  init() {
    this._super(...arguments);
    this.loadInvites();
  },

  async loadInvites() {
    this.set('isLoading', true);
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

    const invites = await this.apollo.query({ query: inviteQuery }, 'toInvites');

    this.setProperties({
      invites,
      isLoading: false
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
