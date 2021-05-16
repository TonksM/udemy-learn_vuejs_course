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

export default {
    components: {
        'the-header': TheHeader
    }
}
</script>

<style>
@import './styles/app.css';
</style>