<template>
    <div class="header-container">
        <span>leaflet基础项目</span>
    </div>
</template>

<script>
    export default {
        name: "top-header",
    }
</script>

<style scoped lang="scss">
    .header-container {
        height: $--header-height;
        line-height: $--header-height;
        text-align: center;
        width: 100%;
        background: url("@/assets/images/header.png");
        background-size: 100% 100%;

        span {
            color: #ffffff;
            font-family: YSBTH;
            font-size: 28px;
            color: #ffffff;
            background: linear-gradient(0deg, #b6ffff 10%, #ffffff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
</style>
