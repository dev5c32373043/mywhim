import { call, put, takeEvery, select } from 'redux-saga/effects';
import { change } from 'redux-form';
import { push } from 'react-router-redux';
import queryString from 'query-string';

import { GET_PRODUCTS, FILTER } from '../constants/ProductList';
import actions from '../actions/ProductList';
import categoryListActions from '../actions/CategoryList';
import locationSelectActions from '../actions/LocationSelect';
import { checkCategories } from './CategoryList';
import { categoriesSelector } from '../selectors/CategoryList';
import { getProducts, filter } from '../api/ProductList';

export function updateQuery(params) {
  const oldQuery = queryString.parse(window.location.search, { arrayFormat: 'bracket' });
  if (params.category) {
    oldQuery.categories = oldQuery.categories || [];
    if (oldQuery.categories.includes(params.category)) {
      oldQuery.categories = oldQuery.categories.filter(c => c !== params.category);
    } else {
      Object.assign(oldQuery, {
        categories: [params.category, ...oldQuery.categories],
      });
    }
    Object.assign(params, {
      category: undefined,
    });
  }
  ['title', 'location'].forEach((attr) => {
    if (!params[attr] || (attr === 'location' && params[attr] === 'all')) {
      Object.assign(params, { [attr]: undefined });
    }
  });
  const result = {};
  const q = Object.assign({}, oldQuery, params);
  Object.keys(q).forEach((attr) => {
    if (q[attr] && q[attr].length) result[attr] = q[attr];
  });
  return result;
}

export function* applyFilter(query, initState = false) {
  const stringifyQuery = queryString.stringify(query, { arrayFormat: 'bracket' });
  const url = `/?${stringifyQuery}`;
  const result = yield call(filter, url);
  yield call(checkCategories, query.categories, result.data.categories);
  if (initState) {
    if (query.title) {
      yield put(change('filter', 'title', query.title));
    }
    if (query.location) {
      yield put(change('filter', 'location', query.location));
    }
    return result;
  }
  yield put(push(url));
  yield put(actions.filterDone(result.data.products));
}

export function* handleFilter(action) {
  const query = yield updateQuery(Object.assign({}, action.params));
  yield applyFilter(query);
}

export function* distributeData(result) {
  const { products, categories, locations } = result.data;
  const storedCategories = yield select(categoriesSelector);
  if (!storedCategories.length) {
    const categoriesWithState = categories.map(c => Object.assign(c, { active: false }));
    yield put(categoryListActions.categoriesReceived(categoriesWithState));
  }
  yield put(locationSelectActions.locationsReceived(locations));
  yield put(actions.productsReceived(products));
}

export function* handleGetProducts() {
  let result;
  if (window.location.search.length) {
    const query = queryString.parse(window.location.search, { arrayFormat: 'bracket' });
    result = yield call(applyFilter, query, true);
  } else {
    result = yield call(getProducts);
  }
  yield call(distributeData, result);
}

export default function* productSaga() {
  yield takeEvery(GET_PRODUCTS, handleGetProducts);
  yield takeEvery(FILTER, handleFilter);
}
