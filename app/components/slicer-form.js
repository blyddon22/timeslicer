import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SlicerFormComponent extends Component {
  @service store;

  @tracked showForm = false;
  @tracked slice = this.store.createRecord('slice');

  @action
  createSlice() {
    this.showForm = !this.showForm;
  }

  @action
  save() {
    this.slice.save();
    this.showForm = !this.showForm;
  }
}
