<template>
    <section>
        <base-card>
            <h2>Page Not Found</h2>
            <p>This page could not be found</p>
            <p> 
                Go to:
                <router-link to="/coaches">Coaches</router-link>
            </p>
        </base-card>
    </section>
</template>

<style scoped>
    section {
        text-align: center;
    }
</style>