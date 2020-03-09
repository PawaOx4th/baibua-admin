import Vue from "vue";
import Vuex from "vuex";
// import router from "vue-router";
// import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: "Baibua Admin",
    refreshApi: false
  },
  mutations: {},
  actions: {
    autoSignIn({ commit }, payload) {
      commit("setUser", payload);
    }
  },
  modules: {},
  getters: {
    appTitle(state) {
      return state.appName;
    }
  }
});
