/*全局设置文件，将被xglobal插件载入到每个component的this.$xglobal.conf备用
 */

var conf = {};
export default conf;

//所有尚未统一的原有页面，原则上元素内不使用任何字符串格式的url地址
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

conf.imgs = {
    xmgc80bai: '//editor.xmgc360.com/imgs/xmgc80bai.png',
    xmgc80lan: '//editor.xmgc360.com/imgs/xmgc80lan.png',
    jmnhead24bai: '//editor.xmgc360.com/imgs/jmnhead24bai.png',
    jmnhead24lan: '//editor.xmgc360.com/imgs/jmnhead24lan.png',
    jmnhead24lv: '//editor.xmgc360.com/imgs/jmnhead24lv.png',
    avatarDefault: '//www.xmgc360.com/_imgs/thumtemp.jpg',
}

//所有接口，原则上元素内不使用任何字符串格式的接口url地址
conf.apis = {
    getMyInfo: '//www.xmgc360.com/project/index.php/api/user/getinfo',
    logout: '//www.xmgc360.com/project/index.php/api/user/logout',
};
