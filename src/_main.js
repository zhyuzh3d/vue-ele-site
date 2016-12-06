import Vue from 'vue'
import Vuex from 'vuex'
import '../theme/index.css'
import ElementUI from 'element-ui'
import www from './coms/pages/www/www.html'

Vue.use(Vuex);
Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(www)
});

const store = new Vuex.Store({});
