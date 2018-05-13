import { CATEGORIES_UPDATED, CATEGORIES_RECEIVED } from '../../constants/CategoryList';

const initState = {
  categories: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case CATEGORIES_RECEIVED:
      return Object.assign({}, state, { categories: action.categories });
    case CATEGORIES_UPDATED:
      return Object.assign({}, state, { categories: action.categories });
    default:
      return state;
  }
};
