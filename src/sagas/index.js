import { all } from 'redux-saga/effects';

import productListSaga from './ProductList';
import categoryListSaga from './CategoryList';
import authSaga from './auth';

export default function* rootSaga() {
  yield all([productListSaga(), categoryListSaga(), authSaga()]);
}
