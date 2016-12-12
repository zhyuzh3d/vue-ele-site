import $ from 'jquery';
var com = {};
export default com;

var vc; //vueComponent对象
var jo; //对应的jquery对象,mounted函数内设定



com.components = {};

com.props = {
    bgColor: { //背景颜色
        type: String,
        default: ''
    },
};

com.data = function data() {
    vc = this;
    return {
        conf: this.$store.state.conf,
        myProfile: {},
    };
};

com.mounted = function () {
    jo = $(this.$el);
    getMyInfo();


    this.$store.registerModule('blocks_TopBar', {
        state: vc.$data,
        getters: {
            getMyProfile: state => {
                return state.myProfile;
            }
        },
        mutations: {
            test: state => {
                console.log('>>>mutation:topbar get a mutation!')
            }
        },
    });
};


com.methods = {};
com.methods.handleSelect = function (key, keyPath) {
    console.log(key, keyPath);
};

//读取用户信息，填充到profile
function getMyInfo() {
    $.ajax({
        type: "POST",
        url: vc.$data.conf.apis.getMyInfo,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            if (res.code == 1) {
                vc.$set(vc, 'myProfile', res.data);
            };
        },
        error: function (err) {},
    });
};


//注销账号
function logout() {
    $.ajax({
        type: "POST",
        url: vc.$data.conf.apis.logout,
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function (res) {
            if (res.code == 1) {
                vc.$set(vc, 'myProfile', {});
            };
        },
        error: function (err) {},
    });
};
