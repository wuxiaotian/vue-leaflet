import Vue from 'vue'

const RC = require.context('./modules', false, /\.js$/);

RC.keys().forEach(key => {
    Vue.prototype["$" + key.replace(/(\.\/|\.js)/g, '')] = RC(key).default;
});