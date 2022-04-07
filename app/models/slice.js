import Model, { attr } from '@ember-data/model';
import { DateTime } from 'luxon';

export default class SliceModel extends Model {
  @attr('string') name;
  @attr('string') date;
  @attr('string') startTime;
  @attr('string') endTime;
  @attr('string') maxGuests;
  @attr('boolean', { defaultValue: false }) canceled;

  get filterDate() {
    return this.date
      ? DateTime.fromFormat(this.date, 'yyyy-LL-dd').toJSDate()
      : '';
  }
}
