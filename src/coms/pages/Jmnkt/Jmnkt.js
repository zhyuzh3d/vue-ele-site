import $ from 'jquery';
import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);


import TopBar from '../../blocks/TopBar/TopBar.html';
import JmnHome from '../../blocks/JmnHome/JmnHome.html';
import Temp from '../../blocks/Temp/Temp.html';

let com = {};
export default com;

let vc; //vueComponent对象
let jo; //对应的jquery对象,mounted函数内设定

com.components = {
    JmnHome,
    TopBar,
    Temp,
};

com.data = function data() {
    vc = this;
    return {
        curcom: 'jmn-home',
        conf: this.$store.state.conf,
    };
};

com.methods = {
    getMyProfile,
};

com.mounted = function () {
    jo = $(this.$el);
    this.$store.registerModule('pages_jmnkt', {
        state: vc.$data
    });


    setTimeout(function () {
        vc.$set(vc, 'curcom', 'top-bar')
    }, 3000)

    /*

    this.$router.options.routes.push({
        path: 'blocks_JmnHome',
        name: 'main',
        component: JmnHome
    });

    console.log('>>>>main', this.$router.options.routes);
    //this.$router.push('/blocks_Temp');
    this.$router.push('/blocks_JmnHome');

    */
    //rtr.push('/App/blocks_Temp');
    //this.$router.push('/blocks_JmnHome');
    //console.log('this-routr', this.$router.app);
    //window.app.router.push('/blocks_JmnHome');

};


//var rtr = window.app.router = new VueRouter({
//    routes: [{
//        path: '/blocks_Temp',
//        component: Temp,
//    }, {
//        path: '/blocks_JmnHome',
//        component: JmnHome,
//    }]
//});
//rtr.beforeEach((to, from, next) => {
//    console.log('>>>>22xxxxx', to.path);
//    next();
//})



/**
 * 从顶部导航栏获取用户档案
 * @returns {object} 用户档案对象
 */

function getMyProfile() {
    let store = vc.$store.state.blocks_TopBar;
    return store ? store.myProfile : {};
};
