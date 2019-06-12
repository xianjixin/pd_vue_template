import { SET_USER_INFO } from './vuex.const.name';

export default {
  [SET_USER_INFO](state, user) {
    if (user) {
      try {
        localStorage.setItem(SET_USER_INFO, JSON.stringify(user));
      } catch (error) {
        localStorage.setItem(SET_USER_INFO, user);
      }
    } else {
      localStorage.removeItem(SET_USER_INFO);
    }
    state.userInfo = user;
  }
};
