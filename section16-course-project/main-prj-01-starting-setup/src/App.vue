<template>
    <the-header/>
    <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
            <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
import {mapGetters} from 'vuex'


export default {
    components: {
        'the-header': TheHeader
    },
    computed: {
        ...mapGetters({
            didAutoLogout: 'didAutoLogout'
        })
    },
    created() {
        this.$store.dispatch('tryLogin');
    },
    watch: {
        didAutoLogout(current, old) {
            if(current && current !== old){
                this.$router.replace('/coaches');
            }
        }
    }
}
</script>

<style>
@import './styles/app.css';
</style>