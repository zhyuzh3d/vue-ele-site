//主战入口文件，将自动载入子站并完成vue和插件的初始化
import $ from 'jquery';
import Vue from 'vue';

//elements ui主题库
import '../theme/index.css';
import './_main.css'; //自定义样式
import ElementUI from 'element-ui';
Vue.use(ElementUI);

//xglobal全局插件及载入设置
import conf from './xglobal/conf.js';
import fns from './xglobal/fns.js';
import xglobal from './plugins/xglobal.js';
Vue.use(xglobal, {
    xglobal: {
        //将通过beforCreate附着到组件的this，任意字段
        conf: conf,
        fns: fns,
    },
    xcomponent: {
        //将附着到每个组件，可以使用data，methods等字段
    },
});

//xrouter路由插件
import xrouter from './plugins/xrouter.js';
Vue.use(xrouter);

//根据子域名动态加载不同子站，只能require括号内只能string不能变量
var App;
switch (window.location.host) {
    case 'www.xmgc360.com':
        App = require('./coms/pages/App/App.html');
        break;
    case 'jmnkt.xmgc360.com':
        App = require('./coms/pages/App/App.html');
        break;
    default:
        App = require('./coms/pages/App/App.html');
        break;
};


//初始化vue
var app = new Vue({
    el: '#App', //挂载点
    render: function (h) {
        return h(App);
    }
});
