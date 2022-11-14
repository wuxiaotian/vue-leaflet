<template>
    <div id="map-container"></div>
</template>

<script>
    export default {
        name: "LeafletMap",
        props: {
            zoom: {
                type: Number,
                default: 5,
            },
            center: {
                type: Array,
                default: () => [40.02404009136253, 116.50641060224784],
            }
        },
        mounted() {
            this.initMap()
        },
        methods: {
            initMap() {
                //百度地图必须加上crs
                const map = L.map('map-container', {
                    // crs: L.CRS.Baidu,
                    center: this.center,
                    zoom: this.zoom,
                    zoomControl: false,
                    doubleClickZoom: false,
                    attributionControl: false,
                    layers: [L.tileLayer.chinaProvider('Geoq.Normal.Map', {
                        maxZoom: 18,
                        minZoom: 3,
                        opacity: 1,
                        // colorize: function (pixel) {
                        //     pixel.r += 160;
                        //     pixel.g += 20;
                        //     pixel.b += 40;
                        //     return pixel;
                        // }
                    })]
                })
                this.$emit('getMap', map)
            }
        },
    }
</script>

<style scoped>

    #map-container {
        height: 100%;
        width: 100%;
    }

</style>

<style lang="scss">


</style>
