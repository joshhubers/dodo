import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('project', function() {
    this.route('show', { path: 'show/:id' });
  });

  this.route('thread', function() {
    this.route('show');
  });
});

export default Router;
