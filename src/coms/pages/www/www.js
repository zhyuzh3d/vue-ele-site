import temp from '../../blocks/temp/temp.html';

var com = {};
com.data = function data() {
    return {
        msg: 'Hello from blocks/www/www.js'
    };
};
com.components = {
    temp:temp
};

//导出组件
export default com;
