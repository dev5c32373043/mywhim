import { LOCATIONS_RECEIVED } from '../constants/LocationSelect';

export default {
  locationsReceived: locations => ({
    type: LOCATIONS_RECEIVED,
    locations,
  }),
};
