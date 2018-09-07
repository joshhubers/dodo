import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  email: '',
  password: '',
  auth: service(),
  router: service(),

  actions: {
    login() {
      this.auth.login(this.email, this.password).then(() => {
        this.router.transitionTo('auth.project');
      });
    }
  }
});
