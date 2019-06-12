import { SET_USER_INFO } from './vuex.const.name';
export default {
  userInfo: localStorage.getItem(SET_USER_INFO)
    ? JSON.parse(localStorage.getItem(SET_USER_INFO))
    : null
};
