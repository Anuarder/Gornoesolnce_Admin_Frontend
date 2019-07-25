import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        token: null,
        tokenEXP: null
    },
    plugins: [createPersistedState()],
    mutations: {
        login(state, payload) {
            state.token = payload.token;
            state.user = payload.user;
            state.tokenEXP = jwt.decode(payload.token).exp;
        },
        logout(state){
            state.user = null;
            state.token = null;
            state.exp = null;
        }
    },
    actions: {
        login({commit}, payload){
            commit('login', payload);
        },
        logout({commit}){
            commit('logout');
        }
    }
})