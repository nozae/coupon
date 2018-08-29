/* eslint-disable */
import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const LOGIN = 'base/LOGIN';
const LOGOUT = 'base/LOGOUT';
const TEMP_LOGIN = 'base/TEMP_LOGIN';
const CHECK_LOGIN = 'base/CHECK_LOGIN';
const CHANGE_INPUT = 'base/CHANGE_INPUT';
const SET_USER = 'base/SET_USER';

// tab visiblity 액션
const HIDE_TAB = 'base/HIDE_TAB';
const SHOW_TAB = 'base/SHOW_TAB';

// action creators
export const login = createAction(LOGIN, api.login);
export const logout = createAction(LOGOUT, api.logout);
export const checkLogin = createAction(CHECK_LOGIN, api.checkLogin);
export const tempLogin = createAction(TEMP_LOGIN);
export const changeInput = createAction(CHANGE_INPUT);
export const setUser = createAction(SET_USER);

export const hideTab = createAction(HIDE_TAB);
export const showTab = createAction(SHOW_TAB);

// initial state
const initialState = Record({
  email: '',
  password: '',
  logged: false,
  tab: true,
  data: {},
  storeInfo: {},
})();

// reducer
export default handleActions(
  {
    ...pender({
      type: LOGIN,
      onSuccess: (state, action) => {
        const { logged } = action.payload.data;
        return state.set('logged', logged);
      },
    }),
    ...pender({
      type: CHECK_LOGIN,
      onSuccess: (state, action) => {
        const { logged } = action.payload.data;
        return state.set('logged', logged);
      },
    }),
    ...pender({
      type: LOGOUT,
      onSuccess: state => {
        return initialState;
      },
    }),
    [TEMP_LOGIN]: (state, action) => {
      return state.set('logged', true);
    },
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.set(name, value);
    },
    [SET_USER]: (state, action) => {
      const { userId, userType, email, name, barcode } = action.payload.data;
      const newData = {
        userId,
        userType,
        email,
        name,
        barcode,
      };
      const newStore = action.payload.data.storeInfo;
      return state
        .set('email', initialState.email)
        .set('password', initialState.password)
        .set('data', newData)
        .set('storeInfo', newStore);
    },
    [HIDE_TAB]: state => {
      return state.set('tab', false);
    },
    [SHOW_TAB]: state => {
      return state.set('tab', true);
    },
  },
  initialState
);
