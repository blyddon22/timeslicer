import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SlicerListComponent extends Component {
  @service store;

  @tracked slices = this.store.findAll('slice');
}
