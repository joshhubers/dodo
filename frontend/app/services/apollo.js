import ApolloService from 'ember-apollo-client/services/apollo';
import { inject as service } from '@ember/service';
import { setContext } from "apollo-link-context";
import { computed } from '@ember/object';

// See https://www.howtographql.com/ember-apollo/5-authentication/

export default ApolloService.extend({
  auth: service(),

  link: computed(function() {
    let httpLink = this._super(...arguments);

    let authLink = setContext((request, context) => {
      return this.authorize(request, context);
    });
    return authLink.concat(httpLink);
  }),


  authorize(req, next) {
    //if(!req.options) {
      //return;
    //}

    if (!req.options.headers) {
      req.options.headers = {};
    }
    const token = this.get('auth').getAuthToken();
    req.options.headers.authorization = token ? `Bearer ${token}` : null;
    next();
  }
});
