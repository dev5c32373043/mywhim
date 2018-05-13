import { testSaga } from 'redux-saga-test-plan';
import sinon from 'sinon';
import { expect } from 'chai';
import { push } from 'react-router-redux';
import { change } from 'redux-form';
import * as productApi from '../../src/api/ProductList';
import productActions from '../../src/actions/ProductList';
import categoryListActions from '../../src/actions/CategoryList';
import { checkCategories } from '../../src/sagas/CategoryList';
import locationSelectActions from '../../src/actions/LocationSelect';
import { categoriesSelector } from '../../src/selectors/CategoryList';
import {
  handleGetProducts,
  distributeData,
  applyFilter,
  updateQuery,
} from '../../src/sagas/ProductList';

global.window = { location: { search: '' } };

describe('productListSaga', () => {
  it('handleGetProducts without query', () => {
    const apiStub = sinon.stub(productApi, 'getProducts').callsFake(() => {});
    const fakeResp = { data: { locations: [], categories: [], products: [] } };
    testSaga(handleGetProducts)
      .next()
      .call(productApi.getProducts)
      .next(fakeResp)
      .call(distributeData, fakeResp)
      .next()
      .isDone();
    apiStub.restore();
  });

  it('handleGetProducts with query', () => {
    const apiStub = sinon.stub(productApi, 'filter').callsFake(() => {});
    const fakeQuery = '?order_by=price&order_type=desc';
    window.location.search = fakeQuery;
    const fakeResp = { data: { locations: [], categories: [], products: [] } };
    testSaga(handleGetProducts)
      .next()
      .call(applyFilter, { order_by: 'price', order_type: 'desc' }, true)
      .next(fakeResp)
      .call(distributeData, fakeResp)
      .next()
      .isDone();
    apiStub.restore();
    window.location.search = '';
  });

  it('distributeData with empty categories', () => {
    const fakeResp = { data: { locations: [], categories: [{ name: 'some' }], products: [] } };
    testSaga(distributeData, fakeResp)
      .next()
      .select(categoriesSelector)
      .next([])
      .put(categoryListActions.categoriesReceived([{ name: 'some', active: false }]))
      .next()
      .put(locationSelectActions.locationsReceived([]))
      .next()
      .put(productActions.productsReceived([]))
      .next()
      .isDone();
  });

  it('distributeData with categories', () => {
    const fakeResp = { data: { locations: [], categories: [], products: [] } };
    testSaga(distributeData, fakeResp)
      .next()
      .select(categoriesSelector)
      .next([{ name: 'some2', active: 'false' }])
      .put(locationSelectActions.locationsReceived([]))
      .next()
      .put(productActions.productsReceived([]))
      .next()
      .isDone();
  });

  it('applyFilter with initState == false', () => {
    const apiStub = sinon.stub(productApi, 'filter').callsFake(() => {});
    const fakeResp = { data: { locations: [], categories: [], products: [] } };
    const fakeQuery = { order_by: 'price', order_type: 'desc' };
    testSaga(applyFilter, fakeQuery)
      .next()
      .call(productApi.filter, '/?order_by=price&order_type=desc')
      .next(fakeResp)
      .call(checkCategories, undefined, [])
      .next()
      .put(push('/?order_by=price&order_type=desc'))
      .next()
      .put(productActions.filterDone([]))
      .next()
      .isDone();
    apiStub.restore();
  });

  it('applyFilter with initState == true', () => {
    const apiStub = sinon.stub(productApi, 'filter').callsFake(() => {});
    const fakeResp = { data: { locations: [], categories: [], products: [] } };
    const fakeQuery = { order_by: 'price', order_type: 'desc' };
    testSaga(applyFilter, fakeQuery, true)
      .next()
      .call(productApi.filter, '/?order_by=price&order_type=desc')
      .next(fakeResp)
      .call(checkCategories, undefined, [])
      .next()
      .isDone();
    apiStub.restore();
  });

  it('applyFilter with initState == true, title and location', () => {
    const apiStub = sinon.stub(productApi, 'filter').callsFake(() => {});
    const fakeResp = { data: { locations: [], categories: [], products: [] } };
    const fakeQuery = { title: 'sample', location: 'test' };
    testSaga(applyFilter, fakeQuery, true)
      .next()
      .call(productApi.filter, '/?location=test&title=sample')
      .next(fakeResp)
      .call(checkCategories, undefined, [])
      .next()
      .put(change('filter', 'title', fakeQuery.title))
      .next()
      .put(change('filter', 'location', fakeQuery.location))
      .next()
      .isDone();
    apiStub.restore();
  });

  it('updateQuery with new category', (done) => {
    const obj = { updateQuery };
    const spy = sinon.spy(obj, 'updateQuery');
    const fakeParams = { category: 'new' };
    obj.updateQuery(fakeParams);
    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.returned({ categories: ['new'] });
    spy.restore();
    done();
  });

  it('updateQuery with old category', (done) => {
    const obj = { updateQuery };
    const spy = sinon.spy(obj, 'updateQuery');
    const fakeParams = { category: 'new' };
    window.location.search = '?categories[]=new';
    obj.updateQuery(fakeParams);
    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.returned({});
    window.location.select = '';
    spy.restore();
    done();
  });

  it('updateQuery with new location', (done) => {
    const obj = { updateQuery };
    const spy = sinon.spy(obj, 'updateQuery');
    const fakeParams = { location: 'some_new' };
    window.location.search = '?location=some';
    obj.updateQuery(fakeParams);
    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.returned({ location: 'some_new' });
    window.location.select = '';
    spy.restore();
    done();
  });

  it('updateQuery with location = all', (done) => {
    const obj = { updateQuery };
    const spy = sinon.spy(obj, 'updateQuery');
    const fakeParams = { location: 'all' };
    window.location.search = '?location=some';
    obj.updateQuery(fakeParams);
    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.returned({});
    window.location.select = '';
    spy.restore();
    done();
  });

  it('updateQuery without params', (done) => {
    const obj = { updateQuery };
    const spy = sinon.spy(obj, 'updateQuery');
    window.location.search = '?location=some&title=test';
    obj.updateQuery({});
    expect(spy).to.have.been.calledOnce;
    expect(spy).to.have.returned({});
    window.location.select = '';
    spy.restore();
    done();
  });
});
