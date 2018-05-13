import { PRODUCTS_RECEIVED, FILTER_DONE } from '../../constants/ProductList';

const initState = {
  products: [],
  isLoading: true,
};

export default (state = initState, action) => {
  switch (action.type) {
    case PRODUCTS_RECEIVED:
      return Object.assign({}, state, {
        products: action.products,
        isLoading: false,
      });
    case FILTER_DONE:
      return Object.assign({}, state, {
        products: action.products,
        isLoading: false,
      });
    default:
      return state;
  }
};
