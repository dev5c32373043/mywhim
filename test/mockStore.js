import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';

import rootSaga from '../src/sagas';

const sagaMiddleware = createSagaMiddleware();

export default (initState = {}) => {
  const mockStore = configureStore([sagaMiddleware]);
  const store = mockStore(initState);
  sagaMiddleware.run(rootSaga);
  return store;
};
