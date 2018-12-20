import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyCIioLmoqbOi8zitXQgvjlb8dKpavYF4NI",
    authDomain: "unknown-75c62.firebaseapp.com",
    databaseURL: "https://unknown-75c62.firebaseio.com",
    projectId: "unknown-75c62",
    storageBucket: "unknown-75c62.appspot.com",
    messagingSenderId: "845929882971"
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
};
db.settings(settings);

// firebase collections
const usersCollection = db.collection('users');
const postsCollection = db.collection('posts');
const commentsCollection = db.collection('comments');
const likesCollection = db.collection('likes');

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}
