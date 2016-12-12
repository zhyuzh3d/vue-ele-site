var com = {};
com.data = function data() {
    return {
        msg: 'Hello from blocks/temp/temp.js'
    };
};
com.components = {};

com.mounted = function () {
    console.log('>>>>>push appXXXX',this.$conf);
    //this.$router.push('App');

    console.log('>>xid', this.$data.xid);

}

com.methods={};
com.methods.aa = function data() {
    console.log('aa');
};

//导出组件
export default com;
