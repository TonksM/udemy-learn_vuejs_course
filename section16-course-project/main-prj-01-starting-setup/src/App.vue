<template>
    <the-header/>
    <router-view/>
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