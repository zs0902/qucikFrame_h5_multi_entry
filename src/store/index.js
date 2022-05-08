import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginStatus: '',
    funcName: '',
  },
  mutations: {
    setLoginStatus(state,data) {
      state.loginStatus = data
    },
    setFuncName(state, data) {
      state.funcName = data
    }
  },
  actions: {},
  modules: {},
});
