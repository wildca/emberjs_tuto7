import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import sinon from 'sinon';

const { stub } = sinon;

module('Unit | Route | admin/seeder', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.model = {
      authors: 'authors',
      books: 'books',
      libraries: 'libraries',
    };
    const findAll = stub()
      .onFirstCall()
      .returns('libraries')
      .onSecondCall()
      .returns('books')
      .onThirdCall()
      .returns('authors');
    this.route = this.owner.factoryFor('route:admin/seeder').create({
      store: {
        findAll,
      },
    });
  });

  test('model hook', async function (assert) {
    const { model, route } = this;
    assert.expect(4);
    assert.deepEqual(await route.model(), model);
    assert.ok(route.store.findAll.calledWith('library'));
    assert.ok(route.store.findAll.calledWith('book'));
    assert.ok(route.store.findAll.calledWith('author'));
  });
});
