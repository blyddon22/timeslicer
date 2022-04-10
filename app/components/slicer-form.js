import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SlicerFormComponent extends Component {
  @service store;

  @tracked _showForm = this.args.showForm;
  @tracked _slice = undefined;
  @tracked errors = {
    name: undefined,
    date: undefined,
    startTime: undefined,
    endTime: undefined,
    maxGuests: undefined,
  };
  @tracked showError = false;

  get showForm() {
    return this._showForm;
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

  validateSlice() {
    this.errors = Object.fromEntries(
      Object.keys(this.errors).map((x) => [x, !this.slice[x]])
    );

    return Object.keys(this.errors).every((key) => this.slice[key]);
  }

  @action
  createSlice() {
    this.showError = false;
    this.slice = this.store.createRecord('slice');
    this.showForm = !this.showForm;
  }

  @action
  save() {
    if (this.validateSlice()) {
      this.showError = false;
      this.slice.save();
      this.showForm = !this.showForm;
    }

    this.showError = true;
  }

  @action
  cancel() {
    if (this.slice.isNew) {
      this.store.deleteRecord(this.slice);
    } else {
      this.slice.rollbackAttributes();
    }

    this.slice = undefined;
    this.showForm = false;
    this.showError = false;
  }
}
