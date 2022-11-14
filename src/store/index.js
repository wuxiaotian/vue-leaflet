import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const RC = require.context('./modules', false, /\.js$/);
const modules = {};
RC.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = RC(key).default
});
export default new Vuex.Store({
  modules:modules
})
