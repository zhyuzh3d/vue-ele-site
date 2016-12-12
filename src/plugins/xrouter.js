import Vue from 'vue';
let plg = {};

//全局存储函数




plg.install = function (Vue, options) {
    console.log('>>>>>>>>>>>', options);
    Vue.xrouter = function () {};

    Vue.mixin({
        data: function () {
            return {
                xid: 0,
                config: 'aaaa'
            };
        },
        created: function () {
            this.$data.xid = new Date().getTime() + '-' + String(Math.random()).substr(2);
        },
    })
};

export default plg;
