<template>
<div class="seller" ref="sell">
  <div class="seller-content">
    <div class="overview">
      <h1 class="title">{{seller.name}}</h1>
      <div class="desc">
        <star :size="36" :score="seller.score"></star>
        <span class="text">好评率{{seller.ratingCount}}%</span>
        <span class="text">月售{{seller.sellCount}}份</span>
      </div>
      <ul class="remark">
        <li class="block">
          <h2>起送价</h2>
          <div class="content">
            <div class="price">{{seller.minPrice}}元</div>
          </div>
        </li>
        <li class="block">
          <h2>商家配送</h2>
          <div class="content">
            <div class="price">{{seller.deliveryPrice}}元</div>
          </div>
        </li>
        <li class="block">
          <h2>平均配送时间</h2>
          <div class="content">
            <div class="price">{{seller.deliveryTime}}元</div>
          </div>
        </li>
      </ul>
      <div class="favorite" @click="toggleFavorite" >
        <span class="icon-favorite" :class="{active:favorite}"></span>
        <span class="text">{{favoriteText}}</span>
      </div>
    </div>
    <split></split>
    <div class="bulletin">
      <h2 class="title">公告与活动</h2>
      <div class="content-box">
        <div class="content">{{seller.bulletin}}</div>
      </div>
    </div>
    <ul v-if="seller.supports" class="support">
      <li class="support-item" v-for="(item,key) in seller.supports">
       <icon :imgType="item.type" :fileType="3"></icon>
        <span class="text">{{seller.supports[key].description}}</span>
      </li>
    </ul>
    <split></split>
    <div class="pics">
      <h2 class="title">商家图片</h2>
      <div class="pics-box" ref="picsBox">
        <ul class="pic-list" ref="picList">
          <li class="pic-item" v-for="pic in seller.pics">
            <img :src="pic" alt="" width="120px" height="90px">
          </li>
        </ul>
      </div>
    </div>
    <split></split>
    <div class="info">
      <h2 class="title">商家信息</h2>
      <ul>
        <li class="info-item" v-for="info in seller.infos">
          {{info}}
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
  import star from '../../components/star/star'
  import split from '../split/split'
  import icon from '../icon/icon'
  import formatDate from '../../common/js/date';
  import BScroll from 'better-scroll';
  import * as storage from '../../common/js/storage';
  const All = 2;
  const KEY='favorite';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star, split, icon
    },
    data(){
      return {
        ratings: [],
        onlyContent: false,
        //默认选择那个区块
        selectType: All,
        favorite:false,
      }
    },
    computed:{
      favoriteText(){
          return this.favorite?'已收藏':'收藏';
      }
    },
    watch:{
        //当数据被获取到后有执行一次初始化scroll方法
      seller:function(){
//          this._initScroll();
        this._initPic();
        let b=storage.getLocal(this.seller.id,KEY,false);
        this.favorite= b;
      }
    },
    //dom被渲染，就会回调,但是此时数据还没有获取到，所以dom不会被撑开
    created(){

      this.$nextTick(() => {
        this._initScroll();

      })
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {
      _initPic(){
            let margin=6;
            let imgWidth=120;
            let len=this.seller.pics.length;
            let width=(imgWidth+margin)*len  - margin;
            this.$refs.picList.style.width=width+'px';
            this.$nextTick(() => {
              if (!this.picScroll) {
                this.picScroll = new BScroll(this.$refs.picsBox, {
                    scrollX:true,
                    eventPassthrough: 'vertical' });
              } else {
                this.picScroll.refresh();
              }
            })

        },
        //内部调用的方法意_开头命名
      _initScroll(){

          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.sell, {click: true});
          } else {
            this.scroll.refresh();
          }
        },
      selectTypeContent(type){
        this.selectType = type;
      },
      toggleOnlyContent(flag){
        this.onlyContent = flag;
      },
      needShow(text, type){
        if (this.onlyContent && text == '') {
          return false;
        }
        if (this.selectType === All) {
          //为all全部显示
          return true;
        } else {
          //只显示对应类型的评论
          return this.selectType == type;

        }

      },
      toggleFavorite(){
          this.favorite=!this.favorite;
        storage.saveToLocal(this.seller.id,KEY,this.favorite);
      }

    }


  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .seller{
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview{
      position: relative;
      padding: 18px;
      .title{
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7,17,27);

      }
      .desc{
        padding-bottom: 18px;
        line-height: 18px;
        border-bottom:1px solid rgba(7,17,27,0.1);
        font-size: 0;
        .star{
          display: inline-block;
          margin-right: 8px;
          vertical-align: top;
        }
        .text{
          display: inline-block;
          vertical-align: top;
          margin-right: 12px;
          font-size: 10px;
        }

      }
      .remark{
        padding-top: 18px;
        display: flex;
        .block{
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7,17,27,0.1);
          &:last-child{
            border: none;
          }
          h2{
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147,153,159);

          }
          .content{
            line-height: 24px;
            font-size: 10px;
            color: rgb(7,17,27);
            .price{
              font-size: 14px;
              color: rgb(7,17,27);
            }
          }

        }
      }
      .favorite{
        position: absolute;
        width: 50px;
        right: 18px;
        top: 18px;
        text-align: center;
        .icon-favorite{
          display: block;
          line-height: 24px;
          font-size: 24px;
          margin-bottom: 4px;
          color: #d4d6d9;
          &.active{
            color: rgb(240,20,20);
          }
        }
        .text{
          font-size: 10px;
          line-height: 10px;
          color: rgb(77,85,93);
        }
      }
    }
    .bulletin{
      padding:18px 18px 0 18px;
      .title{
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7,17,27);
      }
      .content-box{
        padding:0px 12px 16px 12px;
        border-bottom:1px solid rgba(7,17,27,0.1);
        .content{
          line-height: 24px;
          font-size: 12px;
          color: rgb(240,20,20);


        }
      }
    }
    .support{
      .support-item{
        padding: 16px 12px;
        border-bottom:1px solid rgba(7,17,27,0.1);
        .icon{
          vertical-align: top;
          width: 16px;
          height: 16px;
        }
        .text{
          vertical-align: top;
          font-size: 12px;
          line-height: 16px;
          color:rgb(7,17,27);
        }
      }
    }
    .pics{
      padding:18px;
      .title{
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7,17,27);
        font-size: 14px;
      }
      .pics-box{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list{
          font-size: 0;
          .pic-item{
            display: inline-block;
            width: 120px;
            height: 90px;
            margin-right: 6px;
            &:last-child{
              margin:0;
            }
          }
        }

      }
    }
    .info{
      padding:18px ;
      padding-bottom: 0;
      .title{
        padding-bottom: 12px;
        line-height: 14px;
        color: rgb(7,17,27);
        border-bottom:1px solid rgba(7,17,27,0.1);
        font-size: 14px;
      }
      .info-item{
        padding:16px 12px;
        font-size: 12px;
        line-height: 24px;
        color: rgb(7,17,27);
        border-bottom:1px solid rgba(7,17,27,0.1);
        &:last-child{
          border: none;
        }
      }
    }

  }

</style>
