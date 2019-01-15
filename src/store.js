import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '@/api/firebase';

Vue.use(Vuex);

// page reload
fb.auth.onAuthStateChanged(user => {
    if ( user ) {
        store.commit('setCurrentUser', user);
        store.dispatch('fetchUserProfile');

        fb.usersCollection.doc(user.uid).onSnapshot(doc => {
            store.commit('setUserProfile', doc.data())
        });

        // realtime updates from our posts collection
        fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
            // check if created by currentUser
            let createdByCurrentUser;
            if ( querySnapshot.docs.length ) {
                console.log(querySnapshot.docChanges());
                console.log(querySnapshot.docChanges()[ 0 ]);
                createdByCurrentUser = store.state.currentUser.uid == querySnapshot.docChanges()[ 0 ].doc.data().userId ? true : false
            }

            // add new posts to hiddenPosts array after initial load
            if ( querySnapshot.docChanges().length !== querySnapshot.docs.length
                && querySnapshot.docChanges()[ 0 ].type == 'added' && !createdByCurrentUser ) {

                let post = querySnapshot.docChanges()[ 0 ].doc.data();
                post.id = querySnapshot.docChanges()[ 0 ].doc.id;

                store.commit('setHiddenPosts', post)
            } else {
                let postsArray = [];

                querySnapshot.forEach(doc => {
                    let post = doc.data();
                    post.id = doc.id;
                    postsArray.push(post);
                });

                store.commit('setPosts', postsArray)
            }
        })
    }
});

// export default new Vuex.Store({
export const store = new Vuex.Store({
    state: {
        currentUser: null,
        userProfile: {},
        posts: [],
        hiddenPosts: []
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
