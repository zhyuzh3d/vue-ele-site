#Vue-ele-site front-end framework
最初版v0.16.1214 

基于xmgc2016项目框架创建 

基于vuejs创建，http://cn.vuejs.org/ 

基于element-ui创建，http://element.eleme.io/

##功能描述
好的前端框架应该是怎么样的？**模版化且足够灵活**，我的看法具体是： 

1. **实现真正的模块化网站构建，最大限度的重复利用UI组件**
1. **页面组件从大到小分为四级：页面Page，Block区块，symbol元件，单元unit**
1. **可以自由的切换组件内部包含的模版，借此实现路由功能**
1. **每个组件可以自动恢复到上一次离开时候的状态，保持用户体验的连续性**
1. **统一的参数设定和通用的自定义函数可以穿越所有组件被使用**
1. **便于本机测试以及服务器远程测试**

下面来介绍这个站点框架的设计思路


##使用方法
这个框架已经运行在我的测试服务器上，[点这里查看效果](http://temp.xmgc360.com/); 

首先，安装最新版本的NodeJs（和npm）,我使用的是node v7.2.0,npm v3.10.9，

然后，通过git获取此项目，或者直接下载压缩包然后解压，命令行进入解压后的文件夹，**npm install**命令将自动安装所需的全部插件；

接下来你就可以用编辑器编辑src文件夹内的文件（我使用的是brackets），修改coms文件夹下的组件，或者创建自己的元件文件夹及html,js文件（是的，这里并没有使用.vue文件格式，而是把它拆解为html和js两个文件）；

你可以在项目文件夹目录内执行**npm run dev**，然后打开浏览器http://localhost:8080 实时查看你保存的结果。

编辑完成之后请在文件夹目录内运行**npm run build**，这样实现webpack打包，把你最新编写的代码打包到dist文件夹。是的，你需要的就是把index.html和dist文件夹内容放到你的服务器上，然后使它们可以被你的域名访问（推荐安装nginx软件服务，把root根目录指向index.html）。

**如果你希望能在编辑文件的同时看到你的代码运怎么办？**比如你的代码中使用了Ajax请求了服务器上的数据接口，本地就无法看到最终效果了。解决方法是访问你的域名首页然后加上?dev字样(比如http://temp.xmgc360.com/index.html?dev)，这时候你看到的页面是你本机的代码（只有index.html自身是服务器上的真实文件；注意必须本机npm run dev在正常运作），和你最终build并推送到服务器上的效果是一样的。


##模块化
所有的页面元素不论大小都作为vue的component组件存在（它们都放在了src／coms文件夹下），我们规定： 

1. **Page页面，覆盖全部屏幕范围，顶部导航栏可以浮在它的上面。页面仅用于实现多个blocks的布局而不提供实质性的功能内容。**
1. **Blocks区块，覆盖部分屏幕范围，实现一组功能如成员卡片列表，留言列表或显示整个文章标题和内容等，功能上自成体系**
1. **Symbol元件，组成blocks的部件单元，比如一个成员卡片，一条留言或文章的标题导航等，一般不能单独实现功能**
1. **Units单元，最小UI单元，比如element提供的按钮button，开关switch等，不可再分割。unit和symbol并没有明显界限，简单理解就是unit组成symbol而不能相反。** 

这些组件都应该遵守vue自定义组件的开发和使用规则；每个组件应该都对应同名（大写首字母）文件夹及文件夹下面的同名html和js文件。[Vuejs快速入门点这里](http://cn.vuejs.org/v2/guide/index.html#Vue-js-是什么)

##xrouter穿越路由
源码文件在src/plugins/xrouter.js，总共不到200行代码，还包括了大量的注释。强烈推荐你认真看一下，顺便给些指正。 

**它的设计初衷是实现完全自由的路由管理和组件状态自动化恢复的功能 ** 

它的设计思路是这样的，父层组件(必须具有xid属性，比如&lt;div xid='App'&gt;&lt;/div&gt;)通过$data.mainView来切换子组件（比如 &lt;component :is='mainView'&gt;这样的模版);  

xrouter插件实现穿越所有组件的路由函数 **$xrouter.go('App',{mainView:'comName'})**，每次跳转都会同步地址栏的hash变化（模拟锚点跳转），并且将这些变化存储到localstorage； 

xrouter插件还为每个组件实现了加载mounted时自动运行的**$xrouter.restore(xid)**函数，自动从localstorage中恢复用户上次访问之前的状态；（在我的[示例站点](http://temp.xmgc360.com/)中你如果点击顶部切换到了【视频课】，那么下次再访问这个站点时候会自动为您restore恢复为【视频课】页面）

xrouter的核心方法【穿越设定】是**$xrouter.xset('App',{mainView:'comName'})**方法(这个代码和上面go方法代码效果一样，只是不会同步地址栏hash)，go是调用xset实现跳转的，xset也可以用于任何需要控制其他组件的情况（项目里面的coms/pages文件夹下面的...Home都使用这个方法来切换顶部导航栏NavBar的activeMenu当前活动菜单以及App的barBg导航栏是否透明）

xrouter还提供了一个用于测试当前哪些父层元素可以用于路由的函数**$xrouter.showComs()**;因为你要进行路由跳转时候必须先关注它的父层组件是否已经真的挂载完毕

xrouter需要引用xrouter.js文件并Vue.use(xrouter)使用它，请参照_main.js.

##xglobal穿越全局
怎么让所有组件都能共享一个设置文件呢？怎样把自定义函数传送到每个组件之中呢？也许这种想法不符合规范的编程设计理念，但是，它们真的太好用了！ 

xglobal可以让你向每个组件注入一个$xglobal 对象，你可以在这个对象上放置任何需要的东西，config，functions都可以；如果你需要在模版html中使用，那么只需要把它们添加到$data里面，比如 **conf:this.$xglobal.conf**.

xglobal需要引用xglobal.js文件并且**Vue.use(xglobal,{conf:myConfigObj,fns:myFunctionsObj})**使用它，请参照_main.js.

##远程实时测试
这个项目框架并不能自动提供web文件访问服务，推荐你使用nginx来做，大多数情况这都比Nodejs写文件服务更好。 

推荐专业开发者使用更多的在线测试，首先这更接近真实环境而且也不会产生麻烦的跨域问题，其次目前云服务器的确价格不高。 

我在这个框架的开发阶段就是通过这个链接测试的 http://temp.xmgc360.com/index2.html?dev 是的，我后来删掉了index2.html文件，你可以复制index.html重命名得到它然后就可以随意更改了。

**?dev** 这个小标志表示使用本机上webpack的实时打包结果而不是真的使用服务器上dist文件夹的文件；当然你需要本机上先运行npm run dev以确保实时打包正在运行。

这个方法不是完美的，但真的好用，有兴趣可以参考 [我的这个文章](https://mp.weixin.qq.com/s/5xnxoMsQ24cTgX8XObUSHg)






##目录结构
####bak文件夹
只是用来临时备用使用的，请忽略此文件夹
####dist文件夹
这个项目是基于webpack的，npm run build生成的文件放在这里。网站最终访问的页面也完全在这里（除index.html之外）。
####element-variables.css
element自定义主题的变量配置文件，这个文件已经被我修改了内容，新的颜色配置以及去掉了几乎所有矩形的圆角。请参照 [element-ui自定义主题](http://element.eleme.io/#/zh-CN/component/custom-theme)
####index.html
整个站点的主页入口文件，不会被webpack编译（你需要手工更新这个文件）；这个文件会加载dist/build.js文件 
####package.json
项目配置文件，npm命令依赖于这个文件进行install安装插件和dev，build等
 ####src文件夹
 这里才是真正的代码文件，一般你只需编辑这个文件夹内的文件，请认真阅读每个文件夹内的README文件
 ####src/_main.js
webpack打包(npm run build)的入口文件，webpack是从这个文件开始打包，把它关联到的其他文件收集起来，把这些文件也关联到的其他文件也收集起来，以此类推，最终把所有文件收集起来，打包到dist文件夹最为最终文件
####src/_main.css
全站的样式style补充文件，对所有页面有效
####src/assets文件夹
素材图片文件夹
####src/coms文件夹
全站所有的UI组件（components）都在这里，被分为pages，block，symbol，unit四个级别。你可以直接编辑这些文件夹内的文件，或仿制新的组件。
####plugins文件夹
自己编写的vue的插件放在这里，已经放入了我自己编写的xglobal（穿越全局）和xrouter（穿越路由）两个插件，它们在整个站点中起到了重要作用。
####theme文件夹
element-ui的所有样式都在这里，你可以修改index.css调整所有样式，也可单独修改每个样式文件。


##附注
####为什么没有使用vue官方的vue-router？
vue-router需要把所有的路由都规划好，提前写在配置文件中；而大家看到，我的网站刚刚开始，自己都不清楚会有哪些路由；好吧，我需要的不是规划严禁的设计规范，更需要可以自由变通的万能工具。更何况，我还需要一种能够自动restore组件状态的机制，所以就想到了xrouter这个么设定，希望你能喜欢，也希望多多指正。

####为什么没有使用vuex？
首先，vuex是个好东西，否则我也不会把自己的插件叫做xglobal，xrouter了。 

没有用vuex是个偶然，最初xglobal是要做路由的（现在xglobal也提供了支援子对象init()函数初始化），后来发觉xrouter应该单独拉出来，接下来发觉傻傻的xglobal已经够用了，虽然vue更强大更严谨，但似乎并不是必须，然后，就拿掉了。希望你能喜欢xglobal这样的傻大粗型的设定，也希望多多指正.


我们的QQ群（10knet）571956473，欢迎任何喜欢web全栈开发的朋友一起交流。



 
 
