import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  auth: service(),
  router: service(),
  isShowingInvites: false,

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
