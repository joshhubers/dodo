import Component from '@ember/component';
import { ComponentQueryManager } from "ember-apollo-client";
import gql from "graphql-tag";

export default Component.extend(ComponentQueryManager, {
  users: null,
  projectId: null,

  init() {
    this._super(...arguments);
    this.loadUsersAndInvites();
  },

  loadUsersAndInvites() {
    const usersQuery = gql`
    query getUsers($projectId: Int) {
      allUsers {
        id
        firstName
        lastName
      }

      fromInvites(projectId: $projectId) {
        to {
          id
        }
      }
    }
    `;

    this.apollo.watchQuery({ query: usersQuery, variables: { projectId: this.projectId } }).then(result => {
      const invited = result.fromInvites.map(i => i.to.id);
      //const invitable = result.allUsers.find(u => u.id === currentUserId).removeObject(u)...

      result.allUsers.forEach(user => {
        if(invited.includes(user.id)) {
          user.invited = true;
        }
      });


      this.set('users', result.allUsers);
    });
  },

  actions: {
    invite(user) {
      const inviteQuery = gql`
      mutation invite($toUserId: Int!, $projectId: Int!) {
        addProjectInvite(toUserId: $toUserId, projectId: $projectId) {
          id
        }
      }
      `;
      
      this.apollo.mutate({
        mutation: inviteQuery,
        variables: { toUserId: user.id, projectId: this.projectId }}).then(() => {
          debugger;
          user.invited = true;
        });
    }
  }
});
