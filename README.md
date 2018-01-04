# elm
# 安装和搭建环境
## 1. 安装nodejs，npm 等版本最好最新的
## 2. 安装vue 
 > $ npm install vue -g

    # 全局安装 vue-cli
    $ npm install --global vue-cli
    ## 创建一个基于 webpack 模板的新项目
    $ vue init webpack my-project
    ##初始化项目时需要安装eslint es6语法检查，其他的选项不需要了
    ## 安装依赖，走你
    $ cd my-project
    $ npm install
    $ npm run dev

# 项目文件简介
* static/ 静态文件目录
* babelrc        balel配置
* editorcofig     编辑器代码风格配置
* .eslintignore   es6检查忽略目录配置
*  .eslintrc.js    eslint检查规则
* .gitignore      git忽略规则，一行一个目录名
* index.html      入口文件
* package.json    项目配置文件

# webstorm配置
1. 在File->language>javascript 配置Es6
2. 在pluging 搜索Vue并安装
3. 在Editer->file type,添加Vue 文件
4. 在tools -> file watch ,添加文件监视scss等

# 二、项目开始
## 1、项目入口说明
1. 字体图标制作，上传.svg矢量图，生成字体 地址[icomoon](https://icomoon.io/app/#/select)
2. 项目入口
* index.html是项目的入口文件，通过绑定的 <div id="app"></div> 使用vue
* 因为webpack会把这些Vue相关的文件打包成一个js文件，所以其他文件最终会在一个app.js文件中
  打包后：生成一个html文件并且引入app.js,
3.  main.js文件：在生成app.js 文件前，src/main.js就是定义和使用Vue对象的入口文件
4. app.vue 文件就是引入的一个组件，其他所有的组件文件都是在app.vue中分开引入的
## 2、项目目录结构src

# .vue组件使用

## 1、标签注意在模板中有
1. script 标签如果使用es6必须加上type 
```
<script type="text/ecmascript-6">
```
2. style  标签如果使用scss或者其他预处理语言，必须使用lang 和rel属性声明
``` 
<style lang="scss" rel="stylesheet/scss">
```
3. template标签下只能有一个子标签
``` 
<template>
  <div class="ratingselect">
   //所有的内容只能在这个子标签中
    ... ....
  </div>
</template>
```

## 2、app.vue组件中引入其他组件
  1. 引入其他组件 
  ``` import header from './components/header/header ```;
  2. 注册该组件
 ```export default {
      components:{
          //可以给组件起个名字v-header
          'v-header': header
      }
    }
 ```
  3. 使用组件就是，使用标签
  ``` 
  <v-header :seller="seller"></v-header>
  ```
## 3、 .vue组件的生命周期方法回调
1.  create()方法在创建组件时回调,在此方法中可初始化数据，包括获取外部ajax数据
```
created(){
        this.classMap=['decrease','discount','special','invoice','guarantee']
    }
```
2. ready()方法，dom已经渲染完成
## 4、组件中es部分
#### es部分使用 export default {} 导出
1. props：定义父级传人组件的属性
``` 
props: {
      ratings: {
        type: Array,
        //如果组件属性是数组或者对象，则默认值必须是一个方法 return 一个对象或者[]
        default(){
          return [];
        }
      },
      //默认选中那个区块
      selectType: {
        type: Number,
        default: All,
      },
 desc: {
        type: Object,
        default(){
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }      

```
2.computed:计算者属性，定义数据的修饰方法，从外部或者内部产生的数据需要修饰则在其中定义方法
``` 
//过滤数组
positives(){
          return this.ratings.filter((rating) => {
              return rating.rateType===POSITIVE;
          });
      },

```
3.methods:方法属性，定义组件内产生的事件，click等
``` 
//定义组件内的事件
 toggleOnlyContent(){
            this.onlyContent=!this.onlyContent;
            //将事件暴露给外部
             this.$emit('toggleOnlyContent');
      }

```
4.data() ：属性，在组件中的data必须是一个方法,data用于定义内部使用的变量
``` 
   //从外部传入的属性，如果在组件中有修改，则需要先将其保存到data属性中
    data(){
        return{
            selectType:this.defaultType
        }
    },


```
5. watch:属性，用于监视组件中的变量 
>变量:function(){}
``` 
 watch:{
        //当数据被获取到后有执行一次初始化scroll方法
      seller:function(){
//          this._initScroll();
      }
    },
```
5.以上组件中的属性中的方法或者变量都可以使用this. 获取




## 5、scss使用
1. 混合器,定义一个混合器文件mixin.scss ，专门用于处理css函数
例如：当项目中手机屏幕dip改变后，要对应改变图片，或者像素处理等
```
//图片处理
 @mixin bg-img($url){
   background-image: url($url +"@2x.png");
   @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
     background-image: url($url +"@3x.png");
   }
 }
 //使用
 @import "../../common/style/mixin";//在最开始引入
  @include bg-img('decrease_1');//在代码中使用
 ```
 2. 定义一个common.scss来修饰mixin中的一些css函数
 
 3. scss中css细节处理
 * 大图片使用img，小图片使用background
 * 去除父盒子中图片和文字之间的空白字符，可以把父盒子font-size:0
 * background图和文字在一行，居中对齐使用vertical-align:top
 * 滤镜效果 filter:blur(10px),给父盒子添加则看上去模糊
 * 省略...
 ``` 
      //文字缩略
       white-space:nowrap;//不换行
       overflow: hidden;
       text-overflow: ellipsis;
 ```
 
 4. sticky footer 粘性底部close实现
 ```
 //这个盒子主要是为了设置min-height:100%,当没有内容时也能撑起高度
 <div class="detail-wapper ">
    //这个盒子用来填写内容，主要是设置paddind:64px
        <div class="detail-main ">
     </div>
 </div>
 
 //当上面的margin:-64px 
 <div class="detail-close">
      <i class="icon-close"></i>
 </div>
 ```
 5. vue-loader打包时会将css有兼容性的属性检查，并添加兼容性代码postcss
 
 6. 
 ``` 
 @media mediatype and|not|only (media feature) {
     CSS-Code;
 }
 ```
  ### 移动端布局
  1. 移动端布局方案：
  * 固定一边，另一边自适应
  * 固定中间部分，两端自适应
  * 实现上述布局的方案是使用flex布局
 
 # 常用布局块封装成组件、整个区块封装成组件
 ### 1. star块封装成组件，方便多次使用
 ```
 //组件的属性定义
  props:{
           score:{
               type:Number
           },
           size:{
               type:Number
           }
       },
//使用组件及属性
<star :size="48" :score="seller.score"></star>
```
 
1. 组件之间使用相同的数据对象时，对象是地址引用，所以改变对象属性，会影响
 对应的组件DOM变化
 ``` 
 //在添加购物车组件中
  addCount(){
   if (!this.food.count) {
      //通过vue.set()添加新属性，能被监视
           Vue.set(this.food, 'count', 1);
     } else {
           this.food.count++;
      }
    },
   decrease(){
     this.food.count--;
  }
 
 ```
 2. 在外层goods组件中使用商品的对象，就可以判断
 ``` 
 selectFoods(){
        let foods = [];
        //遍历所有类型的商品
        this.goods.forEach((good) => {
            //在每个类型下的所有商品
          good.foods.forEach((food) => {
          //判断count属性，因为cartcontrol组件中已经添加了该属性
            if (food.count) {
              foods.push(food);
            }
          })
        });
        return foods;
      } 
 ```
 3. vue的动画使用，每一transition标签的和v-if 、v-show配合触发动画
 
 
 
# vue-resource 和vue-router库使用
 ## 1、vue-router 是vue的路由库
 1.需要在vue的入口js文件main.js中引入并使用
 ```
 //引入vue的路由库，使用路由并创建对象
 import VueRouter from 'vue-router'
  //在vue中使用
 Vue.use(VueRouter);
 
 ``` 
 2.具体使用
 ``` 
 //每个路由的配置时path 和组件
 const routes=[
   {path:'/goods',component:goods},
   {path:'/seller',component:seller},
   {path:'/ratings',component:ratings},
   {path:'/foo',component:Foo},
   ]
 
 const router=new VueRouter({
   routes,
   base:'/goods',//默认路由，访问页面
   linkActiveClass:'active',//路由被选中时，class类名配置
   });
 
 Vue.config.debug=true;
 //创建vue，并将router 路由注入vue中
 const app=new Vue({
   router: router,
   render:h=>h(App)
 
 }).$mount('#app');

```
## 3.在模板中使用
1 链接的使用
``` 
 <!--使用route-link 标签进行导航默认渲染成a标签 to属性表示路由path-->
      <div class="tab-item"> <router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"> <router-link to="/seller">商家</router-link></div>

```
2 模板内容的替换
``` 
 <!--路由匹配到的内容将被渲染到route-view内 -->
    <keep-alive>
      <router-view :seller="seller" ></router-view>
    </keep-alive>

```
3 路由传参数
在路由path中使用name属性进行传递参数
``` 
{path:'/',component:goods,name:'{id:123,a:brand}'},

```
4 router-link 点击传参数
``` 

```
 ## 2、vue-resource是vue的网络请求封装库，内置了很多网络请求方法
 ``` 
 //引入
 import VueResource from 'vue-resource'
 //在vue中使用
 Vue.use(VueResource);
 //使用提供的http方法
 this.$http.get('/api/seller').then((response) => {
       if(response.body.status===DATA_OK){
         this.seller=response.body.data;
         console.log(this.seller)
       }
     },response => {
         console.log('error')
     })
 ```
 

 
 # better-scroll插件使用，给超出固定高度的地方增加滚动效果
 > npm install better-scroll
 1. 实际是给被包裹的元素，唯一子标签增加一段属性
 >1.被包裹的元素是有固定高度的，而且是overflow:hidden ,如果不是唯一子标签，则无法滚动
 ``` 
 <template>
 //类选择器命名和组件名相同，当给这层增加一层better-scroll时候，内层会增加一段属性
 <div class="seller" ref=seller>
 //该层会增加属性，其内部的内容高度超过外层高度时，就会滚动
   <div class="seller-content">
   // 这里才是所有代码区域
   ... ...
     
 
     </div>
   </div>
 </div>
 </template>
 
 ```
 2.使用,纵向滚动
 ```
  //引入插件
 import BScroll from 'better-scroll';
 #
 #使用插件，必须在vue的Dom加载完成后才能使用，应用要计算dom的高度
  this.$nextTick(() => {
             if(!this.scroll){
               console.log('bscroll lai le')
               //参数1：包裹dom元素 参数2:一些条件{ 包括可以被点击}
               this.scroll=new BScroll(this.$refs.foodtpl,{ click:true } );
             }else{
               console.log('bscroll refresh')
                 this.scroll.refresh();
             }
         })
 ```
 3.横向滚动
 ``` 
 this.picScroll = new BScroll(this.$refs.picsBox, {
                     scrollX:true,
                     eventPassthrough: 'vertical' });
 ```


 
# webpack 打包
1.打包命令
 >npm run build
 
  

 


