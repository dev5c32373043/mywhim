import {
  GET_PRODUCTS,
  PRODUCTS_RECEIVED,
  CATEGORIES_RECEIVED,
  UPDATE_CATEGORY,
  CATEGORY_UPDATED,
  LOCATIONS_RECEIVED,
  FILTER,
  FILTER_DONE,
} from '../constants/MainPage';

export default {
  getProducts: () => ({
    type: GET_PRODUCTS,
  }),
  productsReceived: products => ({
    type: PRODUCTS_RECEIVED,
    products,
  }),
  categoriesReceived: categories => ({
    type: CATEGORIES_RECEIVED,
    categories,
  }),
  updateCategory: category => ({
    type: UPDATE_CATEGORY,
    category,
  }),
  categoryUpdated: categories => ({
    type: CATEGORY_UPDATED,
    categories,
  }),
  locationsReceived: locations => ({
    type: LOCATIONS_RECEIVED,
    locations,
  }),
  filter: params => ({
    type: FILTER,
    params,
  }),
  filterDone: products => ({
    type: FILTER_DONE,
    products,
  }),
};
