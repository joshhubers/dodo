import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  apollo: service(),
  auth: service(),
  router: service(),

  actions: {
    logout() {
      this.auth.logout();
      this.router.transitionTo('login');
    },
  }
});
