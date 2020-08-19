import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class BooksController extends Controller {

    // Form input data
    @tracked newHeadline;
    @tracked newIsbn;
    @tracked newAutho;

    @tracked modModal = false;

    @tracked modHeadline;
    @tracked modIsbn;
    @tracked modAuthor;
    @tracked modId;
    @tracked modBook;

    // popup if author does not exist
    @tracked modalOpen = false;

    //store for ember-data
    @service store;

    // Confirm if author exists first ====================================
    @action
    async checkAuthor(event) {
        event.preventDefault();


        // lookup author
        const authors = await this.store.query('author', {
            filter: {
                familyname: this.newAuthor
            }
        })

        if (authors.firstObject){
            // if author exists, save the book
            this.saveBook(false)

        } else {
            // if author does not exists yet, open modal and ask if the user want to add
            this.modalOpen = true

        }


    }
    
    // Remove book
    @action
    removeBook( book, event ) {
        event.preventDefault();
        book.destroyRecord();
    }

    @action
    editBook(book){
        this.modBook = book
        this.modModal = true
        this.modHeadline = book.headline
        this.modIsbn = book.isbn
        this.modId = book.id
        this.modAuthor = book.author.get("familyname")
    }

    @action
    closeMod(){
        this.modModal = false
    }
    @action 
    async updateBook(event){
        event.preventDefault();
 
        const record = await this.store.findRecord('book', this.modId)

        // ...after the record has loaded
        record.headline = this.modHeadline;
        record.isbn = this.modIsbn;

        // Not working =( sad
        record.author.familyname = this.modAuthor;

        this.modModal = false

    }
    


    // Save Book without adding new author===========================
    @action 
    async saveBook(){
    
        const authors = await this.store.query('author', {
            filter: {
                familyname: this.newAuthor
            }
        })
        
        const bookData = await this.store.createRecord('book', {
            "headline": this.newHeadline,
            "isbn": this.newIsbn,
            "author": authors.firstObject
        });

        bookData.save()

        this.modalOpen = false

    }


    // Save book & add new author====================================
    @action
    async saveAuthorAndBook(){

        // Save Author
        const author = await this.store.createRecord('author', {
            familyname: this.newAuthor,
        
        });

        author.save()


        // get Author
        const authors = await this.store.query('author', {
            filter: {
                familyname: this.newAuthor
            }
        })

        // save Book
        const bookData = await this.store.createRecord('book', {
            "headline": this.newHeadline,
            "isbn": this.newIsbn,
            "author": authors.firstObject
        });

        bookData.save()

        this.modalOpen = false
    }
};