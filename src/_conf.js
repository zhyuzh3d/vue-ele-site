/*全局设置文件
 */

var conf = {};

//所有尚未统一的原有页面
conf.urls = {
    xmgc: '//xmgc360.com',
    www: '//www.xmgc360.com',
    jmnkt: '//jmnkt.xmgc360.com',
    editor: '//editor.xmgc360.com',
    jmnkt_tx: '//jmnkt.ke.qq.com',
    profilePage: '//www.xmgc360.com//_pages/views/settings.html',
    loginPage: '//www.xmgc360.com/_pages/views/login.html',
    regPage: '//www.xmgc360.com/_pages/views/register.html',
    profilePage: '//www.xmgc360.com/_pages/views/settings.html',
};

//所有接口
conf.apis = {
    getMyInfo: '//www.xmgc360.com/project/index.php/api/user/getinfo',
    logout: '//www.xmgc360.com/project/index.php/api/user/logout',
};


export default conf;
