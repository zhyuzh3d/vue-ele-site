import $ from 'jquery'

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import '../theme/index.css'
import './_main.css'
import ElementUI from 'element-ui'

import conf from './_conf.js' //全局设置

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);

//根据子域名动态加载不同子站
var App;
switch (window.location.host) {
    case 'www.xmgc360.com':
        App = require('./coms/pages/Www/Www.html');
        break;
    case 'jmnkt.xmgc360.com':
        App = require('./coms/pages/Jmnkt/Jmnkt.html');
        break;
    default:
        App = require('./coms/pages/Www/Www.html');
        break;
};

//组件之间共享
const store = new Vuex.Store({
    state: {
        msg: 'I am the top store!',
        conf: conf,
    },
    modules: {},
    mutations: {},
});

//初始化
new Vue({
    el: '#app',
    store, //将$store属性注入到所有组件
    render: function (h) {
        return h(App);
    }
});
