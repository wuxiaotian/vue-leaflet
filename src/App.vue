<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {}
    }
</script>

<style lang="scss">
    #app {
        width: $--screen-width;
        height: $--screen-height;
        overflow: hidden;
        perspective: 1000px;
    }
</style>
