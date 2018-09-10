import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  auth: service(),
  router: service(),
  isShowingInvites: false,

  // Computed Properties
  userEmail: readOnly('auth.authJson.email'),
  isLoggedIn: readOnly('auth.isLoggedIn'),

  actions: {
    logout() {
      this.auth.logout().then(() => {
        this.router.transitionTo('login');
      });
    },

    openInvites() {
      this.set('isShowingInvites', true);
    },

    closeInvites() {
      this.set('isShowingInvites', false);
    },
  }
});
