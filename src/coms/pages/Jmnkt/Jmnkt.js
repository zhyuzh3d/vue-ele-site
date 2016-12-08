import $ from 'jquery';

import FullScreen from '../../symbols/FullScreen/FullScreen.html';
import TopBar from '../../blocks/TopBar/TopBar.html';

let com = {};
export default com;

let vc; //vueComponent对象
let jo; //对应的jquery对象,mounted函数内设定

com.components = {
    FullScreen,
    TopBar,
};

com.data = function data() {
    vc = this;
    return {
        conf: this.$store.state.conf,
    };
};

com.methods = {
    getMyProfile,
};

com.beforeCreate = function () {};

com.mounted = function () {
    jo = $(this.$el);
    this.$store.registerModule('pages_jmnkt', {
        state: vc.$data
    });
};


/**
 * 从顶部导航栏获取用户档案
 * @returns {object} 用户档案对象
 */

function getMyProfile() {
    let store = vc.$store.state.blocks_TopBar;
    return store ? store.myProfile : {};
};
