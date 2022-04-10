import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { DateTime } from 'luxon';

module('Integration | Component | slicer-form', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it can create a slice', async function (assert) {
    await render(hbs`<SlicerForm />`);
    await click('#add-slice');
    await fillIn('#edit-slice-name', 'Tour');
    await fillIn('#edit-slice-date', '2022-01-01');
    await fillIn('#edit-slice-start-time', '01:00');
    await fillIn('#edit-slice-end-time', '03:00');
    await fillIn('#edit-slice-max-guests', '10');
    await click('#save');
    assert.equal(server.schema.slices.first().name, 'Tour');
    assert.equal(server.schema.slices.first().date, '2022-01-01');
    assert.equal(server.schema.slices.first().startTime, '01:00');
    assert.equal(server.schema.slices.first().endTime, '03:00');
    assert.equal(server.schema.slices.first().maxGuests, '10');
  });

  test('it can show provided slice in form', async function (assert) {
    let slice = server.create('slice');
    let store = this.owner.lookup('service:store');
    this.set('slice', await store.findRecord('slice', slice.id));
    this.set('showForm', true);
    await render(
      hbs`<SlicerForm @showForm={{this.showForm}} @slice={{this.slice}}/>`
    );
    assert.dom('#edit-slice-name').hasValue(slice.name);
    assert.dom('#edit-slice-date').hasValue(slice.date);
    assert.dom('#edit-slice-start-time').hasValue(slice.startTime);
    assert.dom('#edit-slice-end-time').hasValue(slice.endTime);
    assert.dom('#edit-slice-max-guests').hasValue(slice.maxGuests.toString());
  });

  test('it can update a provided slice', async function (assert) {
    let slice = server.create('slice');
    let store = this.owner.lookup('service:store');
    this.set('slice', await store.findRecord('slice', slice.id));
    this.set('showForm', true);
    await render(
      hbs`<SlicerForm @showForm={{this.showForm}} @slice={{this.slice}}/>`
    );
    await fillIn('#edit-slice-name', 'Tour');
    await fillIn('#edit-slice-date', '2022-01-01');
    await fillIn('#edit-slice-start-time', '01:00');
    await fillIn('#edit-slice-end-time', '03:00');
    await fillIn('#edit-slice-max-guests', '10');
    await click('#save');
    assert.equal(server.schema.slices.first().name, 'Tour');
    assert.equal(server.schema.slices.first().date, '2022-01-01');
    assert.equal(server.schema.slices.first().startTime, '01:00');
    assert.equal(server.schema.slices.first().endTime, '03:00');
    assert.equal(server.schema.slices.first().maxGuests, '10');
  });

  test('it can cancel creating slice', async function (assert) {
    await render(hbs`<SlicerForm/>`);
    await click('#add-slice');
    assert.dom('#edit-slice-name').exists();
    await click('#cancel');
    assert.dom('#edit-slice-name').doesNotExist();
  });

  test('it can cancel editing existing slice', async function (assert) {
    this.set(
      'slice',
      await this.owner
        .lookup('service:store')
        .findRecord('slice', server.create('slice').id)
    );
    this.set('showForm', true);
    this.set('setEditSlice', () => {
      this.set('slice', undefined);
    });
    await render(
      hbs`<SlicerForm @showForm={{this.showForm}} @slice={{this.slice}} @setEditSlice={{this.setEditSlice}}/>`
    );
    await click('#cancel');
    assert.dom('#edit-slice-name').doesNotExist();
  });

  test('it shows message when form is invalid', async function (assert) {
    await render(hbs`<SlicerForm/>`);
    await click('#add-slice');
    await fillIn('#edit-slice-date', '');
    await click('#save');
    assert.dom('#error-msg').exists();
    assert.dom('#edit-slice-name.bg-red-200').exists();
    assert.dom('#edit-slice-max-guests.bg-red-200').exists();
    assert.dom('#edit-slice-date.bg-red-200').exists();
    assert.dom('#edit-slice-start-time.bg-red-200').exists();
    assert.dom('#edit-slice-end-time.bg-red-200').exists();
  });

  test('it defaults the date to today', async function (assert) {
    await render(hbs`<SlicerForm />`);
    await click('#add-slice');
    assert
      .dom('#edit-slice-date')
      .hasValue(DateTime.now().toFormat('yyyy-LL-dd'));
  });
});
