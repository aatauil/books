import Model, { attr, belongsTo } from '@ember-data/model';


export default class BookModel extends Model {
  @attr('string') headline;
  @attr('number') isbn;
  @belongsTo() author;
}
