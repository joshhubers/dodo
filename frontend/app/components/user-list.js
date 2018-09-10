import Component from '@ember/component';
import { ComponentQueryManager } from "ember-apollo-client";
import gql from "graphql-tag";
import { computed } from '@ember/object';

export default Component.extend(ComponentQueryManager, {
  users: Object.freeze([]),
  projectId: null,

  init() {
    this._super(...arguments);
    this.loadUsersAndInvites();
  },

  userList: computed('users.@each.invited', function() {
    return this.users.map(u => {
      return { id: u.id, invited: u.invited, firstName: u.firstName, lastName: u.lastName }
    });
  }),

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

          const newUserList = this.users.map(u => {
            if(u.id === user.id) {
              u.invited = true;
            }
            return u;
          });

          this.set('users', newUserList);

        });
    }
  }
});
