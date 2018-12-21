import Vue from 'vue';
import Vuex from 'vuex';
// import * as fb from '@/firebase/firebaseConfig';
const fb = require('./api/firebase');

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {}
    },
    actions: {
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
        setCurrentUser(state, val) {
            state.currentUser = val
        },
        setUserProfile(state, val) {
            state.userProfile = val
        }
    }
});
