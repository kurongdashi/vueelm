// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//用于vue发起交互的库
import VueResource from 'vue-resource'
//引入css特殊样式入口文件
import indexcss from './common/style/index.css'
//引入vue的路由库，使用路由并创建对象
import VueRouter from 'vue-router'

Vue.use(VueRouter);
Vue.use(VueResource);

//路由中要使用的组件，可以是定义或者是引入
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'
const Foo = { template: '<div>foo</div>' }



//使用import进来的组件当作路由模块
const routes=[
  {path:'/goods',component:goods,
    //子路由配置
    children:[
      {path:'/price',template:`<div>price子路由</div>`,name:'goods-price'},
      {path:'/count',template:`<div>count子路由</div>`},
    ]
  },
  {path:'/',component:goods,name:'{id:123,a:brand}'},
  {path:'/seller',component:seller,name:'seller'},
  {path:'/ratings',component:ratings},
  {path:'/foo',component:Foo},
  ]

const router=new VueRouter({
  routes,
  base:__dirname,//默认路径
  linkActiveClass:'active',//路由被选中时，class类名配置
  });

Vue.config.debug=true;
//创建vue，并将router 路由注入vue中
const app=new Vue({
  router: router,
  //vue挂载的模板
  render:h=>h(App)

}).$mount('#app');

