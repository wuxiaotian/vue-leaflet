const {defineConfig} = require('@vue/cli-service')

const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack: {
        name: 'leaflet基础项目(vue2+js)',
        plugins: []
    },
    chainWebpack: config => {
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve("src/icons")) //svg目录
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]"
            });
        config.module
            .rule("svg")
            .exclude.add(resolve("src/icons"))
            .end();
    },
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "~@/styles/index.scss";`
            }
        }
    }
})
