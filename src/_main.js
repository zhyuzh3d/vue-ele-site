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

//vuex组件之间共享
const store = new Vuex.Store({
    state: {
        msg: 'I am the _main.js store!',
        conf: conf,
    },
    modules: {},
    mutations: {},
});


import xrouter from './plugins/xrouter.js'
Vue.use(xrouter,xglobal);



//创建顶级路由对象
//App = require('./coms/blocks/Temp/Temp.html');
//import JmnHome from './coms/blocks/JmnHome/JmnHome.html';
//import Temp from './coms/blocks/Temp/Temp.html';

var router = new VueRouter({});

/*
router.beforeEach((to, from, next) => {
    console.log('>>>>xxxxx', to.path);
    next();
})
*/

Vue.conf = conf;

//初始化
window.app = new Vue({
    el: '#app', //挂载点
    store, //将$store属性注入到所有组件
    router, //将router注入到所有组件
    conf,
    render: function (h) {
        return h(App);
    }
});

router = new VueRouter({
    routes: [{
        path: '/blocks_JmnHome',
        component: JmnHome,
    }]
});

//router.options.routes.push();

router.push('/blocks_JmnHome');
console.log('>>', router);
