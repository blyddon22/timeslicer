import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

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
});
