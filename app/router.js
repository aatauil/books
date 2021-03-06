import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('book',{path: "book"});
  this.route('author', {path: "author"});
  this.route('search');
  this.route('login');
  this.route('members');

});
