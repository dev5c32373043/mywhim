import {
  CATEGORIES_RECEIVED,
  UPDATE_CATEGORY,
  CATEGORIES_UPDATED,
} from '../constants/CategoryList';

export default {
  categoriesReceived: categories => ({
    type: CATEGORIES_RECEIVED,
    categories,
  }),
  updateCategory: category => ({
    type: UPDATE_CATEGORY,
    category,
  }),
  categoriesUpdated: categories => ({
    type: CATEGORIES_UPDATED,
    categories,
  }),
};
