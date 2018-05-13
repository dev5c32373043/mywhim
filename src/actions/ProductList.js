import { GET_PRODUCTS, PRODUCTS_RECEIVED, FILTER, FILTER_DONE } from '../constants/ProductList';

export default {
  getProducts: () => ({
    type: GET_PRODUCTS,
  }),
  productsReceived: products => ({
    type: PRODUCTS_RECEIVED,
    products,
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
