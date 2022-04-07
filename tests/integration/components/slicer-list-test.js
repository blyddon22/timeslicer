import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | slicer-list', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it show no slices when none exist', async function (assert) {
    await render(hbs`<SlicerList />`);
    assert.dom('p').hasText('No slices yet, chop chop');
  });

  test('it shows provided slices', async function (assert) {
    let slice = server.create('slice');
    let store = this.owner.lookup('service:store');
    this.set('model', await store.findAll('slice'));
    await render(hbs`<SlicerList @slices={{this.model}}/>`);
    assert
      .dom('tbody')
      .hasText(
        `${slice.name} ${slice.date} ${slice.startTime} ${slice.endTime} ${slice.maxGuests}`
      );
  });

  test('it orders slices correctly by default', async function (assert) {
    server.create('slice', {
      date: '1/1/2022',
      startTime: '01:00',
      endTime: '02:00',
    });
    server.create('slice', {
      date: '1/2/2022',
      startTime: '02:00',
      endTime: '03:00',
    });
    server.create('slice', {
      date: '1/1/2022',
      startTime: '04:00',
      endTime: '05:00',
    });
    server.create('slice', {
      date: '1/1/2022',
      startTime: '01:00',
      endTime: '01:30',
    });
    let store = this.owner.lookup('service:store');
    this.set('model', await store.findAll('slice'));
    await render(hbs`<SlicerList @slices={{this.model}}/>`);
    assert.dom('#slice-0').includesText('1/1/2022 01:00 01:30');
    assert.dom('#slice-1').includesText('1/1/2022 01:00 02:00');
    assert.dom('#slice-2').includesText('1/1/2022 04:00 05:00');
    assert.dom('#slice-3').includesText('1/2/2022 02:00 03:00');
  });
});
