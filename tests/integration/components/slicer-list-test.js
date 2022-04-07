import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | slicer-list', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it show no slices when none exist', async function (assert) {
    await render(hbs`<SlicerList />`);
    assert.equal(this.element.textContent.trim(), 'No slices yet, chop chop');
  });

  test('it shows all created slices', async function (assert) {
    let slice = server.create('slice');
    await render(hbs`<SlicerList />`);
    assert.equal(
      this.element.textContent.trim(),
      `${slice.name} - ${slice.date} - ${slice.startTime} - ${slice.endTime}`
    );
  });
});
