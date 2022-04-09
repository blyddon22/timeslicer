import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SlicerListComponent extends Component {
  get slices() {
    let slices = this.args.slices.sortBy('filterDate', 'startTime', 'endTime');

    return slices.map((slice) => {
      let ceil = Math.ceil(slice.startTimeInMinutes / 30);
      let row = slice.startTimeInMinutes % 30 === 0 ? ceil + 1 : ceil;
      let span = (slice.endTimeInMinutes - slice.startTimeInMinutes) / 30 + 1;

      return { slice: slice, row: row, span: span };
    });
  }

  @action
  cancel(slice) {
    slice.canceled = true;
    slice.save();
  }

  @action
  edit(slice) {
    if (this.args.edit) {
      return this.args.edit(slice);
    }
    console.log('Forgot to pass me a function');
  }
}
