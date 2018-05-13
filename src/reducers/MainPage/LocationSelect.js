import { LOCATIONS_RECEIVED } from '../../constants/LocationSelect';

const initState = {
  locations: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOCATIONS_RECEIVED:
      return Object.assign({}, state, { locations: action.locations });
    default:
      return state;
  }
};
