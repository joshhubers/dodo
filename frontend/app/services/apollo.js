import ApolloService from 'ember-apollo-client/services/apollo';
import { inject as service } from '@ember/service';
import { setContext } from "apollo-link-context";
import { computed } from '@ember/object';

// See https://www.howtographql.com/ember-apollo/5-authentication/

export default ApolloService.extend({
  auth: service(),

    link: computed(function() {
      let httpLink = this._super(...arguments);

      let authMiddleware = setContext(async request => {
        const token = this.auth.getAuthToken();
        if(token) {
          return {
            headers: {
              authorization: `Bearer ${token}`
            }
          };
        }
      });

      return authMiddleware.concat(httpLink);
    }),
});
