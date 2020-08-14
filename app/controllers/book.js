import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class BooksController extends Controller {
    @tracked newHeadline = '';
    @tracked newIsbn = '';
    @tracked newAuthor='';

    @service store;
    @action
    async createBook(event) {
        event.preventDefault();
        const authors = await this.store.findAll('author')
        // create the new book
        const book = this.store.createRecord('book', {
        "headline": this.newHeadline,
        "isbn": this.newIsbn,
        "author": authors.firstObject
            

        });
        console.log(book)
        book.save()
        // clear the input fields
        this.newHeadline = '';
        this.newIsbn = '';
        this.newAuthor = '';
    }
    
    @action
    removeBook( book, event ) {
        event.preventDefault();
        book.destroyRecord();
    }
};