import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { notEmpty } from '@ember/object/computed';

export default Controller.extend({

  // Local Variables
  email: '',
  password: '',
  auth: service(),
  router: service(),
  errors: null,

  // Computed Properties
  hasErrors: notEmpty('errors'),

  actions: {
    login() {
      this.setProperties({
        isLoading: true,
        errors: null
      });

      console.log("Start Login");
      this.auth.login(this.email, this.password).then(() => {
        this.router.transitionTo('auth.project');
      }).catch(err => {
        this.set('errors', err.errors);
      }).finally(() => {
        this.set('isLoading', false);
      });
    }
  }
});
