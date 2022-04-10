import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SlicerFormComponent extends Component {
  @service store;

  @tracked _showForm = false;
  @tracked _slice = undefined;

  get showForm() {
    return this._showForm || this.args.showForm;
  }
  set showForm(val) {
    this._showForm = val;
  }

  get slice() {
    return this._slice || this.args.slice;
  }
  set slice(val) {
    this._slice = val;
  }

  @action
  createSlice() {
    this.slice = this.store.createRecord('slice');
    this.showForm = !this.showForm;
  }

  @action
  save() {
    this.slice.save();
    this.showForm = !this.showForm;
  }

  @action
  cancel() {
    // TODO if its a new slice delete it.
    this.slice = undefined;
    this.showForm = false;
  }
}
