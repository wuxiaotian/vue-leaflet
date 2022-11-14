<template>
    <div class="app-main">
        <router-view :key="key"/>
    </div>
</template>

<script>
    export default {
        name: 'AppMain',
        computed: {
            key() {
                return this.$route.path
            }
        }
    }
</script>

<style scoped>
    .app-main {
        height: 100%;
        width: 100%;
    }
</style>

