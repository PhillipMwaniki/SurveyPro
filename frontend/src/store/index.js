import { createStore } from "vuex";
import axiosClient from "../axios.js";

const store = createStore({
  state: {
    user: {
      data: sessionStorage.getItem('USER'),
      token: sessionStorage.getItem('TOKEN')
    }
  },
  getters: {},
  actions: {
    register({commit}, user) {
      return axiosClient.post('/register', user)
        .then(({data}) => {
          commit("setUser", data);
          return data;
        });
    },
    login({commit}, user) {
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit("setUser", data);
          return data;
        });
    },
    logout({commit}) {
      return axiosClient.post('/logout')
        .then(() => {
          commit("logout");
        });
    },
  },
  mutations: {
    logout: state => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem('TOKEN');
      sessionStorage.removeItem('USER');
    },

    setUser: (state, userData) => {
      state.user.data = userData.user;
      state.user.token = userData.token;
      sessionStorage.setItem('TOKEN', userData.token);
      sessionStorage.setItem('USER', userData.user);
    }
  },
  modules: {},
});

export default store;
