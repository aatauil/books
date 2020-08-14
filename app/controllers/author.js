import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class AuthorController extends Controller {
 @tracked newFamilyName = '';
 
 @service store;
 @action
 createBook(event) {
     event.preventDefault();
     // create the new book
     const author = this.store.createRecord('author', {
     familyname: this.newFamilyName,

     });
     author.save()
     // clear the input fields
     this.newFamilyName = '';
 }
 
 @action
 removeAuthor(author , event ) {
     event.preventDefault();
     author.destroyRecord();
 }
}
