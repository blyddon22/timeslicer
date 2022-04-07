import Model, { attr } from '@ember-data/model';

export default class SliceModel extends Model {
  @attr('string') name;
  @attr('string') date;
  @attr('string') startTime;
  @attr('string') endTime;
  @attr('string') maxGuests;
}
