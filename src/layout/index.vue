<template>
    <div class="app-wrapper">
        <app-main/>
    </div>
</template>

<script>
    import {AppMain} from './components'

    export default {
        name: 'Layout',
        components: {
            AppMain
        }
    }
</script>

<style>
    .app-wrapper {
        width: 100%;
        height: 100%;
    }
</style>
