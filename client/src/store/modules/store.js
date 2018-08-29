/* eslint-disable */
import { createAction, handleActions } from 'redux-actions';
import { Record, List } from 'immutable';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

// action types
const GET_STAMP_INFO = 'store/GET_STAMP_INFO';
const GET_ITEM_IMG = 'store/GET_ITEM_IMG';
const SET_STAMP = 'store/SET_STAMP';
const SHOW_ITEM_IMG = 'store/SHOW_ITEM_IMG';
const HIDE_ITEM_IMG = 'store/HIDE_ITEM_IMG';
const CHANGE_INPUT = 'store/CHANGE_INPUT';
const TAB_SELECT = 'store/TAB_SELECT';
const IMG_SELECT = 'store/IMG_SELECT';
const COUPON_SELECT = 'store/COUPON_SELECT';
const COUPON_ITEM_NAME = 'store/COUPON_ITEM_NAME';
const CURRENT_COUPON_INIT = 'store/CURRENT_COUPON_INIT';
const SET_COUPON_ITEM = 'store/SET_COUPON_ITEM';
const UPDATE_COUPON_ITEM = 'store/UPDATE_COUPON_ITEM';
const SORT_COUPON_ITEM = 'store/SORT_COUPON_ITEM';
const DEL_COUPON_ITEM = 'store/DEL_COUPON_ITEM';
const COUPON_CONFIG_INIT = 'store/COUPON_CONFIG_INIT';

// action creators
export const getStampInfo = createAction(GET_STAMP_INFO, api.getStampInfo);
export const getItemImg = createAction(GET_ITEM_IMG, api.getItemImg);
export const setStamp = createAction(SET_STAMP, api.setStamp);
export const showItemImg = createAction(SHOW_ITEM_IMG);
export const hideItemImg = createAction(HIDE_ITEM_IMG);
export const changeInput = createAction(CHANGE_INPUT);
export const tabSelect = createAction(TAB_SELECT);
export const couponSelect = createAction(COUPON_SELECT);
export const couponItemName = createAction(COUPON_ITEM_NAME);
export const imgSelect = createAction(IMG_SELECT);
export const currentCouponInit = createAction(CURRENT_COUPON_INIT);
export const setCouponItem = createAction(SET_COUPON_ITEM);
export const updateCouponItem = createAction(UPDATE_COUPON_ITEM);
export const sortCouponItem = createAction(SORT_COUPON_ITEM);
export const delCouponItem = createAction(DEL_COUPON_ITEM);
export const couponConfigInit = createAction(COUPON_CONFIG_INIT);

// initial state
const initialState = Record({
  tabSelected: 'Stamp',
  stampList: List([]),
  itemImgList: List([]),
  makeStampForm: Record({
    stampTerm: '',
    stampMaximum: 10,
    currentCoupon: Record({
      couponPublishTerm: null,
      couponItemName: '',
      itemImgId: null,
      itemImg: '',
    })(),
    couponConfig: List([]),
    itemImgView: false,
  })(),
})();

// reducer
export default handleActions(
  {
    ...pender({
      type: GET_STAMP_INFO,
      onSuccess: (state, action) => {
        return state.set('stampList', action.payload.data.data);
      },
    }),
    ...pender({
      type: GET_ITEM_IMG,
      onSuccess: (state, action) => {
        return state.set('itemImgList', action.payload.data.data);
      },
    }),
    ...pender({
      type: SET_STAMP,
      onSuccess: state => state,
    }),
    [SHOW_ITEM_IMG]: state => {
      return state.setIn(['makeStampForm', 'itemImgView'], true);
    },
    [HIDE_ITEM_IMG]: state => {
      return state.setIn(['makeStampForm', 'itemImgView'], false);
    },
    [CHANGE_INPUT]: (state, action) => {
      const { name, value } = action.payload;
      return state.setIn(['makeStampForm', name], value);
    },
    [TAB_SELECT]: (state, action) => {
      return state.set('tabSelected', action.payload);
    },
    [IMG_SELECT]: (state, action) => {
      return state
        .setIn(
          ['makeStampForm', 'currentCoupon', 'itemImgId'],
          action.payload.itemImgId
        )
        .setIn(
          ['makeStampForm', 'currentCoupon', 'itemImg'],
          action.payload.itemImg
        );
    },
    [CURRENT_COUPON_INIT]: state => {
      return state.setIn(
        ['makeStampForm', 'currentCoupon'],
        initialState.getIn(['makeStampForm', 'currentCoupon'])
      );
    },
    [COUPON_SELECT]: (state, action) => {
      return state.setIn(
        ['makeStampForm', 'currentCoupon', 'couponPublishTerm'],
        action.payload
      );
    },
    [COUPON_ITEM_NAME]: (state, action) => {
      return state.setIn(
        ['makeStampForm', 'currentCoupon', 'couponItemName'],
        action.payload
      );
    },
    [SET_COUPON_ITEM]: (state, action) => {
      const couponConfig = Record({
        couponPublishTerm: action.payload.couponPublishTerm,
        couponItemName: action.payload.couponItemName,
        itemImgId: action.payload.itemImgId,
        itemImg: action.payload.itemImg,
      })();
      return state.updateIn(['makeStampForm', 'couponConfig'], coupon =>
        coupon.push(couponConfig)
      );
    },
    [UPDATE_COUPON_ITEM]: (state, action) => {
      const couponConfig = Record({
        couponPublishTerm: action.payload.couponPublishTerm,
        couponItemName: action.payload.couponItemName,
        itemImgId: action.payload.itemImgId,
        itemImg: action.payload.itemImg,
      })();
      return state.updateIn(['makeStampForm', 'couponConfig'], coupon =>
        coupon.set(action.payload.couponIndex, couponConfig)
      );
    },
    [SORT_COUPON_ITEM]: (state, action) => {
      return state.setIn(['makeStampForm', 'couponConfig'], action.payload);
    },
    [DEL_COUPON_ITEM]: (state, action) => {
      return state.updateIn(['makeStampForm', 'couponConfig'], coupon =>
        coupon.delete(action.payload)
      );
    },
    [COUPON_CONFIG_INIT]: state => {
      return state.set('makeStampForm', initialState.get('makeStampForm'));
    },
  },
  initialState
);
