import { call, put, takeEvery } from 'redux-saga/effects';
import { stopSubmit } from 'redux-form';
import { push } from 'react-router-redux';
import actions from '../actions/auth';
import { LOGIN, REGISTER, AUTHENTICATE } from '../constants/auth';
import * as authApi from '../api/auth';

export function* handleAuthenticate() {
  const token = localStorage.getItem('auth_token');
  if (typeof token === 'string') {
    const result = yield call(authApi.authenticate, token);
    if (result.status === 200) {
      yield put(actions.authenticated(result.data));
    } else {
      yield put(actions.authenticateFailed());
    }
  } else {
    yield put(actions.authenticateFailed());
  }
}

export function* handleAuth(type, action) {
  const result = yield call(authApi[type], action.data);
  if (result.status === 200 || result.status === 201) {
    const { user } = result.data;
    localStorage.setItem('auth_token', result.data.token);
    yield put(actions.authenticated(user));
    yield put(push('/cabinet'));
  } else {
    const { errors } = result.response.data;
    if (errors) {
      yield put(stopSubmit('auth', errors));
    }
  }
}

export default function* authSaga() {
  yield takeEvery(AUTHENTICATE, handleAuthenticate);
  yield takeEvery(LOGIN, handleAuth, 'login');
  yield takeEvery(REGISTER, handleAuth, 'register');
}
