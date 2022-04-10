import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { DateTime } from 'luxon';

export default class SlicerFormComponent extends Component {
  @service store;

  @tracked _slice = undefined;
  @tracked errors = {
    name: undefined,
    date: undefined,
    startTime: undefined,
    endTime: undefined,
    maxGuests: undefined,
  };
  @tracked showError = false;

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

  setEditSlice() {
    if (this.args.setEditSlice) {
      this.args.setEditSlice(undefined);
    }
    console.log('Forgot to pass me a way to set edit slice');
  }

  @action
  createSlice() {
    this.showError = false;
    this.slice = this.store.createRecord('slice', {
      date: DateTime.now().toFormat('yyyy-LL-dd'),
    });
  }

  @action
  save() {
    if (this.validateSlice()) {
      this.showError = false;
      this.slice.save();
      this.slice = undefined;
      this.setEditSlice();
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
    this.showError = false;
    this.setEditSlice();
  }
}
