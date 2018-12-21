<template>
    <div id="app">
        <Navigation v-if="currentUser"/>
        <router-view/>
    </div>
</template>

<script>
    import Navigation from '@/components/Navigation';
    import { mapState } from 'vuex';

    export default {
        components: {
            Navigation
        },
        computed: {
            ...mapState([ 'currentUser' ])
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
