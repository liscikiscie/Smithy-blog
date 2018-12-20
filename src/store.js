import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '@/firebase/firebaseConfig';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {}
    },
    actions: {
        fetchUserProfile( {commit, state} ) {
            fb.usersCollection.doc(state.currentUser.uid)
                .get()
                .then(response => {
                    commit('setUserProfile', response.data())
                }).catch(error => {
                console.log(error);
            })
        }
    },
    mutations: {
        setCurrentUser( state, val ) {
            state.currentUser = val;
        },
        setCurrentProfile( state, val ) {
            state.userProfile = val;
        }
    }
});
