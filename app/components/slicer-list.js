import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { DateTime } from 'luxon';

export default class SlicerListComponent extends Component {
  @tracked slice = false;
  @tracked dateOffset = 0;

  get date() {
    return DateTime.now().plus({ days: this.dateOffset });
  }

  get formattedDate() {
    return this.date.toFormat('DDD');
  }

  get slices() {
    return this.args.slices
      .filterBy('date', this.date.toFormat('yyyy-LL-dd'))
      .map((slice) => {
        let ceil = Math.ceil(slice.startTimeInMinutes / 30);
        let row = slice.startTimeInMinutes % 30 === 0 ? ceil + 1 : ceil;
        let span = (slice.endTimeInMinutes - slice.startTimeInMinutes) / 30;

        return { slice: slice, row: row, span: span };
      });
  }

  @action
  cancel(slice) {
    slice.canceled = true;
    this.slice = false;
    slice.save();
  }

  @action
  edit(slice) {
    this.slice = false;
    if (this.args.edit) {
      return this.args.edit(slice);
    }
    console.log('Forgot to pass me a function');
  }

  @action
  view(slice) {
    this.slice = slice;
  }

  @action
  updateDateOffset(val) {
    this.dateOffset += val;
  }
}
