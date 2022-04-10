import { module, test } from 'qunit';
import { visit, click, fillIn, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { DateTime } from 'luxon';

module('Acceptance | slicer', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('adding multiple slices show in slice list', async function (assert) {
    await visit('/');
    await click('#add-slice');
    await fillIn('#edit-slice-name', 'Tour');
    await fillIn('#edit-slice-date', DateTime.now().toFormat('yyyy-LL-dd'));
    await fillIn('#edit-slice-start-time', '01:00');
    await fillIn('#edit-slice-end-time', '03:00');
    await fillIn('#edit-slice-max-guests', '10');
    await click('#save');
    await click('#add-slice');
    await fillIn('#edit-slice-name', 'Demo');
    await fillIn('#edit-slice-date', DateTime.now().toFormat('yyyy-LL-dd'));
    await fillIn('#edit-slice-start-time', '04:00');
    await fillIn('#edit-slice-end-time', '06:00');
    await fillIn('#edit-slice-max-guests', '5');
    await click('#save');
    assert.dom('#slice-list .bg-blue-200').exists({ count: 2 });
  });

  test('editing a slice shows changes', async function (assert) {
    let slice = server.create('slice', { startTime: '00:00' });
    await visit('/');
    assert
      .dom('#slice-list .bg-blue-200')
      .hasText(`${slice.name} ${slice.startTime} - ${slice.endTime}`);
    await click('#slice-1');
    await click('#slice-edit');
    await fillIn('#edit-slice-name', 'Tour');
    await fillIn('#edit-slice-date', DateTime.now().toFormat('yyyy-LL-dd'));
    await fillIn('#edit-slice-start-time', '01:00');
    await fillIn('#edit-slice-end-time', '02:00');
    await fillIn('#edit-slice-max-guests', '10');
    await click('#save');
    assert.dom('#slice-list .bg-blue-200').hasText('Tour 01:00 - 02:00');
  });

  test('canceling new slice removes from store', async function (assert) {
    await visit('/');
    assert.dom('#slice-').doesNotExist();
    await click('#add-slice');
    await fillIn('#edit-slice-date', DateTime.now().toFormat('yyyy-LL-dd'));
    assert.dom('#slice-').exists();
    await click('#cancel');
    assert.dom('#slice-').doesNotExist();
  });

  test('canceling changes on existing slice reverts changes', async function (assert) {
    server.create('slice', { name: 'Other' });
    await visit('/');
    await click('#slice-1');
    await click('#slice-edit');
    await fillIn('#edit-slice-name', 'Tour');
    await click('#cancel');
    assert.dom('#slice-list .bg-blue-200 .text-sm').hasText('Other');
  });
});
