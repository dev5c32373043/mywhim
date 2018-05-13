import { TOGGLE_DIALOG, AUTHENTICATED, AUTHENTICATE_FAILED } from '../constants/auth';

const initState = {
  user: {
    id: null,
    email: null,
  },
  isAuthenticated: false,
  dialogActive: false,
  isLoading: true,
};

export default (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_DIALOG:
      return Object.assign({}, state, {
        dialogActive: action.dialogActive,
      });
    case AUTHENTICATED:
      return Object.assign({}, state, {
        user: action.user,
        isAuthenticated: true,
        isLoading: false,
      });
    case AUTHENTICATE_FAILED:
      return Object.assign({}, state, { isLoading: false });
    default:
      return state;
  }
};
