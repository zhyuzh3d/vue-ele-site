import $ from 'jquery';

let com = {};
export default com;
let vc; //此元素vueComponent对象
let jo; //此元素对应的jquery对象,mounted函数内设定

//所有直接用到的组件在这里导入
import NavBar from '../../blocks/NavBar/NavBar.html';
import JmnHome from '../../pages/JmnHome/JmnHome.html';
import XmgcHome from '../../pages/XmgcHome/XmgcHome.html';
import WwwHome from '../../pages/WwwHome/WwwHome.html';
com.components = {
    NavBar,
    JmnHome,
    XmgcHome,
    WwwHome,
};

//所有数据写在这里
com.data = function data() {
    vc = this;
    return {
        mainView: '',
        barBg: '', //inherit 透明
        urls: this.$xglobal.conf.urls,
        apis: this.$xglobal.conf.apis,
    };
};

//所有直接使用的方法写在这里
com.methods = {
    getMyProfile,
};

//加载到页面前执行的函数
com.beforeMount = function () {
    jo = $(this.$el);
};

com.mounted = function () {
    //初次自动载入xmgc首页，后续依赖xrestore自动切换
    if (!vc.xrestored) {
        vc.$xrouter.go('App', {
            mainView: 'xmgc-home'
        });
    };
};

//-------所有函数写在下面,可以直接使用vc，jo；禁止在下面直接运行--------

/**
 * 从顶部导航栏获取用户档案
 * @returns {object} 用户档案对象
 */

function getMyProfile() {
    let vcom = vc.$xglobal.coms.TopBar;
    return vcom ? vcom.$data.myProfile : {};
};
