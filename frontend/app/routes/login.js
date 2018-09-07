import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  auth: service(),

  beforeModel() {
    if(this.auth.isLoggedIn) {
      this.transitionTo('auth.project');
    }
  }
});
