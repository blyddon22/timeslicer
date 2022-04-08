import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SlicerListComponent extends Component {
  // slices = new Array(1440);

  get slices() {
    let base = new Array(1440).fill({
      occupied: false,
      occupants: [],
    });

    if (this.args.slices) {
      let sortedSlices = this.args.slices.sortBy(
        'filterDate',
        'startTime',
        'endTime'
      );

      return base.map((slice, idx) => {
        let matches = sortedSlices.filter((slice) => {
          return (
            slice.startTimeInMinutes <= idx && idx <= slice.endTimeInMinutes
          );
        });

        if (matches.length) {
          return {
            occupied: true,
            occupants: matches,
          };
        }

        return slice;
      });
    }
    return base;
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
