import { createStore } from 'vuex'

const vuex: any = createStore({
  state: {
    token: 'test token'
  },
  getters: {
    getToken(state){
      return state.token;
    }
  },
  mutations: {
    setToken(state, data){
      state.token = data;
    }
  },
  actions: {
  },
  modules: {
  }
})

export default vuex