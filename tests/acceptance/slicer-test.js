import { module, test } from 'qunit';
import { visit, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | slicer', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('adding multiple slices show in slice list', async function (assert) {
    await visit('/');
    await click('#add-slice');
    await fillIn('#edit-slice-name', 'Tour');
    await fillIn('#edit-slice-date', '2022-01-01');
    await fillIn('#edit-slice-start-time', '01:00');
    await fillIn('#edit-slice-end-time', '03:00');
    await fillIn('#edit-slice-max-guests', '10');
    await click('#save');
    await click('#add-slice');
    await fillIn('#edit-slice-name', 'Demo');
    await fillIn('#edit-slice-date', '2022-01-01');
    await fillIn('#edit-slice-start-time', '04:00');
    await fillIn('#edit-slice-end-time', '06:00');
    await fillIn('#edit-slice-max-guests', '5');
    await click('#save');
    assert.dom('#slice-0').hasText('Tour 2022-01-01 01:00 03:00 10');
    assert.dom('#slice-1').hasText('Demo 2022-01-01 04:00 06:00 5');
  });

  test('adding slice prior to existing puts new slice before existing', async function (assert) {
    server.create('slice', {
      date: '2022-01-01',
      startTime: '02:00',
      endTime: '03:00',
    });
    await visit('/');
    await click('#add-slice');
    await fillIn('#edit-slice-name', 'Tour');
    await fillIn('#edit-slice-date', '2022-01-01');
    await fillIn('#edit-slice-start-time', '01:00');
    await fillIn('#edit-slice-end-time', '02:00');
    await fillIn('#edit-slice-max-guests', '10');
    await click('#save');
    assert.dom('#slice-0').includesText('2022-01-01 01:00 02:00');
    assert.dom('#slice-1').includesText('2022-01-01 02:00 03:00');
  });

  test('adding slice after existing puts new slice after existing', async function (assert) {
    server.create('slice', {
      date: '2022-01-01',
      startTime: '01:00',
      endTime: '02:00',
    });
    await visit('/');
    await click('#add-slice');
    await fillIn('#edit-slice-name', 'Tour');
    await fillIn('#edit-slice-date', '2022-01-01');
    await fillIn('#edit-slice-start-time', '03:00');
    await fillIn('#edit-slice-end-time', '04:00');
    await fillIn('#edit-slice-max-guests', '10');
    await click('#save');
    assert.dom('#slice-0').includesText('2022-01-01 01:00 02:00');
    assert.dom('#slice-1').includesText('2022-01-01 03:00 04:00');
  });
});
