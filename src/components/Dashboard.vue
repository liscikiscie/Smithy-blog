<template>
    <div id="dashboard">
        <section>
            <div class="col1">
                <div class="profile">
                    <h5>{{ userProfile.name }}</h5>
                    <p>{{ userProfile.title }}</p>
                    <div class="create-post">
                        <p>create a post</p>
                        <form @submit.prevent>
                            <textarea v-model.trim="post.content"></textarea>
                            <button @click="createPost" :disabled="post.content === ''" class="button">post</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col2">
                <transition name="fade">
                    <div v-if="hiddenPosts.length" @click="showNewPosts" class="hidden-posts">
                        <p>
                            Click to show <span class="new-posts">{{ hiddenPosts.length }}</span>
                            new <span v-if="hiddenPosts.length > 1">posts</span><span v-else>post</span>
                        </p>
                    </div>
                </transition>
                <div v-if="posts.length">
                    <div v-for="post in posts" class="post">
                        <h5>{{ post.userName }}</h5>
                        <span>{{ post.createdOn | formatDate }}</span>
                        <p>{{ post.content | trimLength }}</p>
                        <ul>
                            <li><a @click="openCommentModal(post)">comments {{ post.comments }}</a></li>
                            <li><a @click="likePost(post.id, post.likes)">likes {{ post.likes }}</a></li>
                            <li><a @click="viewPost(post)">view full post</a></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <p class="no-results">There are currently no posts</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import * as fb from '../api/firebase.js'
    import moment from 'moment'

    export default {
        name: 'Dashboard',
        data() {
            return {
                post: {
                    content: ''
                }
            };
        },
        filters: {
            formateData( val ) {
                if ( !val ) {
                    return '-'
                }
                let date = val.toDate();
                return moment(date).fromNow()
            },
            trimLength( val ) {
                if ( val.length < 200 ) {
                    return val;
                }
                return `${val.substring(0, 200)}...`
            }
        },
        computed: {
            ...mapState([ 'currentUser', 'userProfile', 'posts' ])
        },
        methods: {
            createPost() {
                console.log(this.currentUser);
                fb.postsCollection.add({
                    createdOn: new Date(),
                    content: this.post.content,
                    userId: this.currentUser.uid,
                    userName: this.userProfile.name,
                    comments: 0,
                    likes: 0
                }).then(ref => {
                    console.log(ref);
                    this.post.content = ''
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>

</style>
