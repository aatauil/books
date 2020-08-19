import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SearchController extends Controller {

    queryParams = ['category'];

    @tracked category = "Book"

    @tracked options = ['Book', 'Author']
    @action 
    changeCat(item){
        this.category = item
    }
}
