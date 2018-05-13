import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import reducers from './reducers';

const history = createHistory();

const routerM = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware, routerM));
sagaMiddleware.run(rootSaga);

exports.history = history;

export default store;
