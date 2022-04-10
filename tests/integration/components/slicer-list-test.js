import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';
import cases from 'qunit-parameterize';
import { DateTime } from 'luxon';

module('Integration | Component | slicer-list', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it shows provided slices', async function (assert) {
    let slice = server.create('slice');
    let store = this.owner.lookup('service:store');
    this.set('model', await store.findAll('slice'));
    await render(hbs`<SlicerList @slices={{this.model}}/>`);
    assert
      .dom('#slice-list .bg-blue-200')
      .includesText(`${slice.name} ${slice.startTime} - ${slice.endTime}`);
  });

  cases([
    { startTime: '00:00', row: '1' },
    { startTime: '00:30', row: '2' },
    { startTime: '01:00', row: '3' },
    { startTime: '01:30', row: '4' },
    { startTime: '02:00', row: '5' },
    { startTime: '02:30', row: '6' },
    { startTime: '03:00', row: '7' },
    { startTime: '03:30', row: '8' },
    { startTime: '04:00', row: '9' },
    { startTime: '04:30', row: '10' },
    { startTime: '05:00', row: '11' },
    { startTime: '05:30', row: '12' },
    { startTime: '06:00', row: '13' },
    { startTime: '06:30', row: '14' },
    { startTime: '07:00', row: '15' },
    { startTime: '07:30', row: '16' },
    { startTime: '08:00', row: '17' },
    { startTime: '08:30', row: '18' },
    { startTime: '09:00', row: '19' },
    { startTime: '09:30', row: '20' },
    { startTime: '10:00', row: '21' },
    { startTime: '10:30', row: '22' },
    { startTime: '11:00', row: '23' },
    { startTime: '11:30', row: '24' },
    { startTime: '12:00', row: '25' },
    { startTime: '12:30', row: '26' },
    { startTime: '13:00', row: '27' },
    { startTime: '13:30', row: '28' },
    { startTime: '14:00', row: '29' },
    { startTime: '14:30', row: '30' },
    { startTime: '15:00', row: '31' },
    { startTime: '15:30', row: '32' },
    { startTime: '16:00', row: '33' },
    { startTime: '16:30', row: '34' },
    { startTime: '17:00', row: '35' },
    { startTime: '17:30', row: '36' },
    { startTime: '18:00', row: '37' },
    { startTime: '18:30', row: '38' },
    { startTime: '19:00', row: '39' },
    { startTime: '19:30', row: '40' },
    { startTime: '20:00', row: '41' },
    { startTime: '20:30', row: '42' },
    { startTime: '21:00', row: '43' },
    { startTime: '21:30', row: '44' },
    { startTime: '22:00', row: '45' },
    { startTime: '22:30', row: '46' },
    { startTime: '23:00', row: '47' },
    { startTime: '23:30', row: '48' },
  ]).test(
    'it assigns correct row based on start time',
    async function (params, assert) {
      server.create('slice', {
        date: DateTime.now().toFormat('yyyy-LL-dd'),
        startTime: params.startTime,
      });
      let store = this.owner.lookup('service:store');
      this.set('model', await store.findAll('slice'));
      await render(hbs`<SlicerList @slices={{this.model}}/>`);
      assert.dom('#slice-1').hasClass(`row-start-[${params.row}]`);
    }
  );

  cases([
    { endTime: '00:00', span: '0' },
    { endTime: '00:30', span: '1' },
    { endTime: '01:00', span: '2' },
    { endTime: '01:30', span: '3' },
    { endTime: '02:00', span: '4' },
    { endTime: '02:30', span: '5' },
    { endTime: '03:00', span: '6' },
    { endTime: '03:30', span: '7' },
    { endTime: '04:00', span: '8' },
    { endTime: '04:30', span: '9' },
    { endTime: '05:00', span: '10' },
    { endTime: '05:30', span: '11' },
    { endTime: '06:00', span: '12' },
    { endTime: '06:30', span: '13' },
    { endTime: '07:00', span: '14' },
    { endTime: '07:30', span: '15' },
    { endTime: '08:00', span: '16' },
    { endTime: '08:30', span: '17' },
    { endTime: '09:00', span: '18' },
    { endTime: '09:30', span: '19' },
    { endTime: '10:00', span: '20' },
    { endTime: '10:30', span: '21' },
    { endTime: '11:00', span: '22' },
    { endTime: '11:30', span: '23' },
    { endTime: '12:00', span: '24' },
    { endTime: '12:30', span: '25' },
    { endTime: '13:00', span: '26' },
    { endTime: '13:30', span: '27' },
    { endTime: '14:00', span: '28' },
    { endTime: '14:30', span: '29' },
    { endTime: '15:00', span: '30' },
    { endTime: '15:30', span: '31' },
    { endTime: '16:00', span: '32' },
    { endTime: '16:30', span: '33' },
    { endTime: '17:00', span: '34' },
    { endTime: '17:30', span: '35' },
    { endTime: '18:00', span: '36' },
    { endTime: '18:30', span: '37' },
    { endTime: '19:00', span: '38' },
    { endTime: '19:30', span: '39' },
    { endTime: '20:00', span: '40' },
    { endTime: '20:30', span: '41' },
    { endTime: '21:00', span: '42' },
    { endTime: '21:30', span: '43' },
    { endTime: '22:00', span: '44' },
    { endTime: '22:30', span: '45' },
    { endTime: '23:00', span: '46' },
    { endTime: '23:30', span: '47' },
  ]).test(
    'it assigns correct span based on start time and end time difference',
    async function (params, assert) {
      server.create('slice', {
        date: DateTime.now().toFormat('yyyy-LL-dd'),
        startTime: '00:00',
        endTime: params.endTime,
      });
      let store = this.owner.lookup('service:store');
      this.set('model', await store.findAll('slice'));
      await render(hbs`<SlicerList @slices={{this.model}}/>`);
      assert.dom('#slice-1').hasClass(`row-span-${params.span}`);
    }
  );

  test('it can view a slice', async function (assert) {
    let slice = server.create('slice');
    let store = this.owner.lookup('service:store');
    this.set('model', await store.findAll('slice'));
    await render(hbs`<SlicerList @slices={{this.model}}/>`);
    await click('#slice-1');
    assert
      .dom('#viewing-slice')
      .hasText(
        `${slice.name} ${slice.startTime} - ${slice.endTime} Max Guests: ${slice.maxGuests}`
      );
  });

  test('it can close viewing slice', async function (assert) {
    let slice = server.create('slice');
    let store = this.owner.lookup('service:store');
    this.set('model', await store.findAll('slice'));
    await render(hbs`<SlicerList @slices={{this.model}}/>`);
    await click('#slice-1');
    assert.dom('#viewing-slice').exists();
    await click('#close');
    assert.dom('#viewing-slice').doesNotExist();
  });

  test('it can cancel a slice', async function (assert) {
    let slice = server.create('slice');
    let store = this.owner.lookup('service:store');
    this.set('model', await store.findAll('slice'));
    await render(hbs`<SlicerList @slices={{this.model}}/>`);
    await click('#slice-1');
    await click('#cancel-slice');
    assert.dom('#slice-1 .font-bold').includesText(`Canceled`);
  });

  test('it can edit a slice', async function (assert) {
    let slice = server.create('slice');
    let store = this.owner.lookup('service:store');
    this.set('model', await store.findAll('slice'));
    this.set('edit', () => {
      assert.step('EDIT');
    });
    await render(hbs`<SlicerList @slices={{this.model}} @edit={{this.edit}}/>`);
    await click('#slice-1');
    await click('#slice-edit');
    assert.verifySteps(['EDIT']);
  });
});
