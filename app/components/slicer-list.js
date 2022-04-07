import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
// import { tracked } from '@glimmer/tracking';

export default class SlicerListComponent extends Component {
  @service store;

  get slices() {
    if (this.args.slices) {
      return this.args.slices.sortBy('filterDate', 'startTime', 'endTime');
    }
    return [];
  }
}
