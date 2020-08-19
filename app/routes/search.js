import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SearchRoute extends Route {

    queryParams = {
        category: {
          refreshModel: true
        }
      };


    model(params){
        return this.store.findAll(params.category)
    }
}
