import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked sliceToEdit = null;
  @tracked showEdit = false;

  @action
  setEditSlice(slice) {
    this.sliceToEdit = slice;
    this.showEdit = true;
  }
}