import { push } from 'react-router-redux';
import { stopSubmit } from 'redux-form';
import { testSaga } from 'redux-saga-test-plan';
import sinon from 'sinon';

import { handleAuthenticate, handleAuth } from '../../src/sagas/auth';
import * as authApi from '../../src/api/auth';
import authActions from '../../src/actions/auth';

global.localStorage = {
  getItem() {
    return null;
  },
  setItem() {},
};

describe('authSaga', () => {
  it('handleAuthenticate without token', () => {
    testSaga(handleAuthenticate)
      .next()
      .put(authActions.authenticateFailed())
      .next()
      .isDone();
  });

  it('handleAuthenticate with valid token', () => {
    const localStorageStub = sinon.stub(localStorage, 'getItem').callsFake(() => 'sometoken');
    const apiStub = sinon.stub(authApi, 'authenticate').callsFake(() => {});
    testSaga(handleAuthenticate)
      .next()
      .call(authApi.authenticate, 'sometoken')
      .next({ status: 200, data: [] })
      .put(authActions.authenticated([]))
      .next()
      .isDone();
    localStorageStub.restore();
    apiStub.restore();
  });

  it('handleAuthenticate with invalid token', () => {
    const localStorageStub = sinon.stub(localStorage, 'getItem').callsFake(() => 'invalidtoken');
    const apiStub = sinon.stub(authApi, 'authenticate').callsFake(() => {});
    testSaga(handleAuthenticate)
      .next()
      .call(authApi.authenticate, 'invalidtoken')
      .next({ status: 401, data: {} })
      .put(authActions.authenticateFailed())
      .next()
      .isDone();
    localStorageStub.restore();
    apiStub.restore();
  });

  it('handleAuth with type login', () => {
    const apiStub = sinon.stub(authApi, 'login').callsFake(() => {});
    testSaga(handleAuth, 'login', { data: {} })
      .next()
      .call(authApi.login, {})
      .next({ status: 200, data: { user: { email: 'some@mail.com' }, token: 'sometoken' } })
      .put(authActions.authenticated({ email: 'some@mail.com' }))
      .next()
      .put(push('/cabinet'))
      .next()
      .isDone();
    apiStub.restore();
  });

  it('handleAuth with type register', () => {
    const apiStub = sinon.stub(authApi, 'register').callsFake(() => {});
    testSaga(handleAuth, 'register', { data: {} })
      .next()
      .call(authApi.register, {})
      .next({ status: 201, data: { user: {}, token: 'sometoken' } })
      .put(authActions.authenticated({}))
      .next()
      .put(push('/cabinet'))
      .next()
      .isDone();
    apiStub.restore();
  });

  it('handleAuth with error response', () => {
    const apiStub = sinon.stub(authApi, 'register').callsFake(() => {});
    testSaga(handleAuth, 'register', { data: {} })
      .next()
      .call(authApi.register, {})
      .next({ status: 400, response: { data: { errors: {} } } })
      .put(stopSubmit('auth', {}))
      .next()
      .isDone();
    apiStub.restore();
  });
});
