import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '@/api/firebase';
// const fb = require('./api/firebase');

Vue.use(Vuex);

// page reload
fb.auth.onAuthStateChanged(user => {
    if ( user ) {
        store.commit('setCurrentUser', user);
        store.dispatch('fetchUserProfile');
    }
});

// export default new Vuex.Store({
export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {}
    },
    actions: {
        clearData( {commit} ) {
            commit('setCurrentUser', null);
            commit('setUserProfile', {})
        },
        fetchUserProfile( {commit, state} ) {
            fb.usersCollection.doc(state.currentUser.uid)
                .get()
                .then(res => {
                    commit('setUserProfile', res.data())
                }).catch(err => {
                console.log(err)
            })
        }
    },
    mutations: {
        setCurrentUser( state, val ) {
            state.currentUser = val
        },
        setUserProfile( state, val ) {
            state.userProfile = val
        }
    }
});
