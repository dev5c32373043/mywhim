import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import ProductListReducer from './MainPage/ProductList';
import CategoryListReducer from './MainPage/CategoryList';
import LocationSelectReducer from './MainPage/LocationSelect';
import authReducer from './auth';

export default combineReducers({
  form: formReducer,
  router: routerReducer,
  auth: authReducer,
  mainPage: combineReducers({
    productList: ProductListReducer,
    categoryList: CategoryListReducer,
    locationSelect: LocationSelectReducer,
  }),
});
