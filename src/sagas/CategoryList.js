import { put, takeEvery, select } from 'redux-saga/effects';

import { UPDATE_CATEGORY } from '../constants/CategoryList';
import actions from '../actions/CategoryList';
import productListActions from '../actions/ProductList';
import { categoriesSelector } from '../selectors/CategoryList';

export function* checkCategories(arg, data) {
  if (arg) {
    const categories = data || (yield select(categoriesSelector));
    const updated = categories.map((c) => {
      if (typeof arg === 'string' && c.name === arg) {
        Object.assign(c, { active: true });
      } else if (arg instanceof Array && arg.includes(c.name)) {
        Object.assign(c, { active: true });
      } else {
        Object.assign(c, { active: false });
      }
      return c;
    });
    yield put(actions.categoriesUpdated(updated));
  }
}

export function* handleUpdate(action) {
  const categories = yield select(categoriesSelector);
  const updated = categories.map((category) => {
    if (category.name === action.category) {
      Object.assign(category, { active: !category.active });
    }
    return category;
  });
  yield put(productListActions.filter({ category: action.category }));
  yield put(actions.categoriesUpdated(updated));
}

export default function* categoryListSaga() {
  yield takeEvery(UPDATE_CATEGORY, handleUpdate);
}
