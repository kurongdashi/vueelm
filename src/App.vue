<!--第一个使用的组件（这里面引入其他组件）-->
<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <!--使用route-link 标签进行导航默认渲染成a标签 to属性表示路由path-->
      <div class="tab-item"> <router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"> <router-link to="/seller">商家</router-link></div>
    </div>
    <!--路由匹配到的内容将被渲染到route-view内 -->
    <keep-alive>
      <router-view :seller="seller" ></router-view>
    </keep-alive>

  </div>
</template>

<script type="text/ecmascript-6">
  const DATA_OK=0;
// app组件中引入header文件
import header from './components/header/header';
import urlParse from './common/js/utils';
// 并且要使用该组件需要注册组件

export default {

  data(){
    return {
      seller:{

      }
    }
  },
  created(){
    this.$http.get('/api/seller').then((response) => {
      if(response.body.status===DATA_OK){
        this.seller=response.body.data;
        let obj=urlParse();
        this.seller=Object.assign({},this.seller,{id:obj.id})
//        console.log(this.seller.id);
      }
    },response => {
        console.log('error')
    })
  },
  components:{
    'v-header': header
  },
}
</script>

<!--里面使用scss 必须添lang 和rel 属性-->
<style lang="scss" rel="stylesheet/scss">

#app {
  .tab {
    //使用混合器
    @import "./common/style/mixin";
    @include border-1px(rgba(0,17,27,0.1));

    display: flex;
    width: 100%;
    height: 40px;
    line-height:40px;
  /*弹性盒模型，父级设置display:flex ; 子级根据flex:number;来均分*/
    .tab-item{
      flex: 1;
      text-align: center;
      a{
        display: block;
        color: #4d555d;
        &.active{
           color: #f01414;
         }
      }
    }
  }

}
</style>
