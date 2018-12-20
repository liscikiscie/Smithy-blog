<template>
    <div id="login">
        <section>
            <div class="col1">
                <h1>Smithy blog</h1>
                <p>Welcome to the <a href="https://smithy.pl" target="_blank">Smithy</a> social media
                    web app powered by Vue.js and Firebase.</p>
            </div>
            <div class="col2">
                <form @submit.prevent>
                    <h1>Welcome Back</h1>

                    <label for="email1">Email</label>
                    <input
                            v-model.trim="loginForm.email"
                            type="email"
                            placeholder="you@email.com"
                            id="email1"/>

                    <label for="password1">Password</label>
                    <input
                            v-model.trim="loginForm.password"
                            type="password"
                            placeholder="******"
                            id="password1"/>

                    <button class="button" @click="login">Log In</button>

                    <div class="extras">
                        <a>Forgot Password</a>
                        <a>Create an Account</a>
                    </div>
                </form>
                <form @submit.prevent>
                    <h1>Get Started</h1>

                    <label for="name">Name</label>
                    <input
                            v-model.trim="signUpForm.name"
                            type="text"
                            placeholder="Savvy Apps"
                            id="name"/>

                    <label for="title">Title</label>
                    <input
                            v-model.trim="signUpForm.title"
                            type="text"
                            placeholder="Company"
                            id="title"/>

                    <label for="email2">Email</label>
                    <input
                            v-model.trim="signUpForm.email"
                            type="email"
                            placeholder="you@email.com"
                            id="email2"/>

                    <label for="password2">Password</label>
                    <input
                            v-model.trim="signUpForm.password"
                            type="password"
                            placeholder="min 6 characters"
                            id="password2"/>

                    <button @click="signup" class="button">Sign Up</button>

                    <div class="extras">
                        <a>Back to Log In</a>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
    import * as fb from '@/firebase/firebaseConfig'

    export default {
        name: 'Login',
        data() {
            return {
                loginForm: {
                    email: '',
                    password: ''
                },
                signUpForm: {
                    name: '',
                    title: '',
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            login() {
                fb.auth.signInWithEmailAndPassword(
                    this.loginForm.email,
                    this.loginForm.password)
                    .then(user => {
                        this.$store.commit('setCurrentUser', user);
                        this.$store.dispatch('fetchUserProfile');
                        this.$router.push('/dashboard');
                    }).catch(error => {
                    console.log(error);
                })
            },
            signup() {
                fb.auth.createUserWithEmailAndPassword(
                    this.signUpForm.email,
                    this.signUpForm.password
                ).then(user => {
                    this.$store.commit(('setCurrentUser', user))
                })
            }
        }
    }
</script>

<style scoped>

</style>
