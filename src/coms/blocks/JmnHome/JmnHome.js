import $ from 'jquery';
import FullScreen from '../../symbols/FullScreen/FullScreen.html';

let com = {};
export default com;

let vc; //vueComponent对象
let jo; //对应的jquery对象,mounted函数内设定

com.components = {
    FullScreen,
};

com.data = function data() {
    vc = this;
    return {
        conf: this.$store.state.conf,
    };
};

com.beforeCreate = function () {};

com.mounted = function () {
    jo = $(this.$el);
    this.$store.registerModule('pages_jmnkt', {
        state: vc.$data
    });
};
