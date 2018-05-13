import { testSaga } from 'redux-saga-test-plan';

import { handleUpdate, checkCategories } from '../../src/sagas/CategoryList';
import categoryListActions from '../../src/actions/CategoryList';
import productListActions from '../../src/actions/ProductList';
import { categoriesSelector } from '../../src/selectors/CategoryList';

describe('categoryListSaga', () => {
  it('checkCategories done immediately without arg', () => {
    testSaga(checkCategories, undefined, {})
      .next()
      .isDone();
  });

  it('checkCategories with string arg and null data', () => {
    testSaga(checkCategories, 'sample', null)
      .next()
      .select(categoriesSelector)
      .next([{ name: 'sample', active: false }])
      .put(categoryListActions.categoriesUpdated([{ name: 'sample', active: true }]))
      .next()
      .isDone();
  });

  it('checkCategories with string arg and data', () => {
    testSaga(checkCategories, 'sample', [{ name: 'sample', active: false }])
      .next()
      .put(categoryListActions.categoriesUpdated([{ name: 'sample', active: true }]))
      .next()
      .isDone();
  });

  it('checkCategories correct updated with array type of arg', () => {
    testSaga(checkCategories, ['sample'], null)
      .next()
      .select(categoriesSelector)
      .next([{ name: 'sample', active: false }])
      .put(categoryListActions.categoriesUpdated([{ name: 'sample', active: true }]))
      .next()
      .isDone();
  });

  it('checkCategories correct updated with non matching arg', () => {
    testSaga(checkCategories, 'sample2', null)
      .next()
      .select(categoriesSelector)
      .next([{ name: 'sample', active: false }])
      .put(categoryListActions.categoriesUpdated([{ name: 'sample', active: false }]))
      .next()
      .isDone();
  });

  it('handleUpdate should change active', () => {
    testSaga(handleUpdate, { category: 'some' })
      .next()
      .select(categoriesSelector)
      .next([{ name: 'some', active: false }])
      .put(productListActions.filter({ category: 'some' }))
      .next()
      .put(categoryListActions.categoriesUpdated([{ name: 'some', active: true }]))
      .next()
      .isDone();
  });
});
