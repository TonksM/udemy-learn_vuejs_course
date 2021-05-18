<template>
    <header>
        <nav>
            <h1><router-link to="/">Find a Coach</router-link></h1>
            <ul>
                <li><router-link to="/coaches">All Coaches</router-link></li>
                <li v-if="isLoggedIn"><router-link to="/requests-received">Requests</router-link></li>
                <li v-else><router-link to="/auth">Login</router-link></li>
                <li v-if="isLoggedIn"><base-button @click="logoutAndRedirect">Logout</base-button></li>
            </ul>
        </nav>
    </header>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    computed: {
        isLoggedIn() {
            console.log(this.$store.getters.isAuth);
            return this.$store.getters.isAuth;
        }
    },
    methods: {
        ...mapActions({
            logout: 'logout'
        }),
        logoutAndRedirect(){
            this.logout();
            this.$router.replace('/coaches');
        }
    }

}
</script>

<style scoped lang="css" src="../../styles/header.css"/>