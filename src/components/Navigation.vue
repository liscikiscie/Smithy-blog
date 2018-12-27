<template>
    <header>
        <section>
            <div class="col1">
                <router-link to="dashboard">
                    <h3>Smithy Blog</h3>
                </router-link>
                <ul class="inline">
                    <li>
                        <router-link to="dashboard">Dashboard</router-link>
                    </li>
                    <li>
                        <router-link to="settings">Settings</router-link>
                    </li>
                    <li>
                        <a @click="logout">Logout</a>
                    </li>
                </ul>
            </div>
        </section>
    </header>
</template>

<script>
    import * as fb from '@/api/firebase'

    export default {
        name: 'Navigation',
        methods: {
            logout() {
                fb.auth.signOut()
                    .then(() => {
                        this.$store.dispatch('clearData');
                        this.$router.push('/login');
                    }).catch(error => {
                    console.log(error);
                })
            }
        }
    }
</script>

<style scoped>

</style>
