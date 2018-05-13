import {
  TOGGLE_DIALOG,
  LOGIN,
  REGISTER,
  AUTHENTICATE,
  AUTHENTICATED,
  AUTHENTICATE_FAILED,
} from '../constants/auth';

export default {
  toggleDialog: dialogActive => ({
    type: TOGGLE_DIALOG,
    dialogActive,
  }),
  login: data => ({ type: LOGIN, data }),
  register: data => ({ type: REGISTER, data }),
  authenticate: () => ({ type: AUTHENTICATE }),
  authenticated: user => ({
    type: AUTHENTICATED,
    user,
  }),
  authenticateFailed: () => ({ type: AUTHENTICATE_FAILED }),
};
