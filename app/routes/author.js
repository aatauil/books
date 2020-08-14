import Route from '@ember/routing/route';

export default class BookRoute extends Route {
 model(){
   console.log(this.store.findAll('author'))
     return this.store.findAll('author');
     }
}
