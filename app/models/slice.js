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

  toMinutes(timeStr) {
    if (timeStr) {
      let splitTime = timeStr.split(':');
      let hours = splitTime[0];
      let minutes = splitTime[1];
      return parseInt(hours) * 60 + parseInt(minutes);
    }
    return 0;
  }

  get startTimeInMinutes() {
    return this.toMinutes(this.startTime);
  }

  get endTimeInMinutes() {
    return this.toMinutes(this.endTime);
  }
}
