import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '@/api/firebase';

Vue.use(Vuex);

// page reload
fb.auth.onAuthStateChanged(user => {
    if ( user ) {
        store.commit('setCurrentUser', user);
        store.dispatch('fetchUserProfile');

        //realtime updates from our post collection
        fb.postsCollection.orderBy('createdOn', 'desc')
            .onSnapshot(querySnapshot => {
                let postsArray = [];

                querySnapshot.forEach(doc => {
                    let post = doc.data();
                    post.id = doc.id;
                    postsArray.push(post)
                });
                store.commit('setPosts', postsArray)
            })
    }
});

// export default new Vuex.Store({
export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {},
        posts: []
    },
    actions: {
        clearData( {commit} ) {
            commit('setCurrentUser', null);
            commit('setUserProfile', {});
            commit('setPosts', null);
            // commit('setHiddenPosts', null);
        },
        fetchUserProfile( {commit, state} ) {
            fb.usersCollection.doc(state.currentUser.uid)
                .get()
                .then(res => {
                    console.log(state.userProfile);
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
        },
        setPosts( state, val ) {
            state.posts = val
        }
    }
});
