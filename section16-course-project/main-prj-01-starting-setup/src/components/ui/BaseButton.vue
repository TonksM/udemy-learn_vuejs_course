<template>
    <button v-if="!link" :class="mode"><slot/></button>
    <router-link v-else :to="to" :class="mode"><slot/></router-link>
</template>

<script>
export default {
    props: {
        mode: {
            type: String,
            required: false,
            default: null
        },
        link: {
            type: Boolean,
            required: false,
            default: false,
        },
        to: {
            type: String,
            required: false,
            deafult: '/'
        }
    }
}
</script>

<style scoped lang="css" src="../../styles/base-button.css"/>

