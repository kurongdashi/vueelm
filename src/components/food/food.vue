<template>
  <transition name="food-move">
  <div v-show="showFlag" class="food" ref="foodtpl">
    <div class="food-content">
      <div class="img-header">
        <img :src="food.image" alt="">
        <div class="back" @click="back"><i class="icon-arrow_lift"></i></div>
      </div>
      <div class="content">
        <div class="title">{{food.name}}</div>
        <div class="detail">
          <div class="sell-count">月售{{food.sellCount}}份</div>
          <div class="rating">好评率{{food.price}}%</div>
        </div>
        <div class="price">
          <span class="now">¥{{food.price}}元</span>
          <span class="old" v-show="food.old">¥{{food.old}}元</span>
        </div>

        <div class="cart-box">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div class="buy" v-show="!food.count || food.count===0" @click.stop="addFirst">加入购物车</div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <div class="title" v-show="food.info">{{food.name}}</div>
        <div class="text">{{food.info}}</div>
      </div>
      <split v-show="food.rating"></split>
      <div class="rating">
        <h3 class="title">商品评价</h3>
        <ratingselect :ratings="food.ratings" :select-type="selectType" :only-content="onlyContent" :desc="desc"
         @selectTypeContent="selectTypeContent"  @toggleOnlyContent="toggleOnlyContent"           ></ratingselect>
        <div class="rating-content">
          <ul v-show="food.ratings && food.ratings.length">

            <li class="rating-item" v-for="rating in food.ratings" v-show="needShow(rating.text,rating.rateType)">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img :src="rating.avatar" alt="" class="avatar" width="12px " height="12px">
              </div>
              <div class="time">{{rating.rateTime |formatDate}}</div>
              <p class="text">
                <i class="icon-thumb_up" v-show="rating.rateType==0"></i>
                <i class="icon-thumb_down" v-show="rating.rateType==1"></i>
                <span>{{rating.text}}</span>
              </p>
            </li>
          </ul>
          <div class="no-ratings" v-show="!food.ratings">暂无评价</div>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import cartcontrol from '../cartcontrol/cartcontrol'
  import split from '../split/split'
  import ratingselect from '../ratingselect/ratingselect'
  import formatDate from '../../common/js/date';

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const All = 2;
  export default{
    props: {
      food: {
        type: Object
      }
    },
    data(){
      return {
        showFlag: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: "吐槽"
        },
        onlyContent: false,
        //默认选择那个区块
        selectType: NEGATIVE,
      }
    },
    methods: {
        selectTypeContent(type){
          this.selectType=type;
        },
        toggleOnlyContent(flag){
            this.onlyContent=flag;
        },

      show(){
        this.showFlag = true;

        this.$nextTick(() => {
          if (!this.scroll) {
            console.log('bscroll lai le')
            this.scroll = new BScroll(this.$refs.foodtpl, {click: true});
          } else {
            console.log('bscroll refresh')
            this.scroll.refresh();
          }
        })
      },
      back(){
        this.showFlag = false;
      },
      addFirst(){
        Vue.set(this.food, 'count', 1);
      },
      needShow(text,type){
        if(this.onlyContent && text==''){
            return false;
        }
        if(this.selectType===All){
            //为all全部显示
            return true;
        }else {
            //只显示对应类型的评论
            return this.selectType==type;

        }

      },


    },
    components: {
      cartcontrol,
      split,
      ratingselect,

    },
      filters:{
        formatDate(time){
            let date=new Date(time);
         return formatDate(date,'yyyy-MM-dd hh:mm');
        }
      }



  }
</script>

<style lang="scss" rel="stylesheet/scss">

  .food-move-enter,.food-move-leave-to{
    opacity:0;
    transform: translate3d(100%, 0, 0);
  }
  .food-move-enter-active,.food-move-leave-active {
    transition: all .5s;
  }

  .food {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
    .food-content{
      padding-bottom: 48px;
    .img-header {
      position: relative;
      width: 100%;
      img {
        width: 100%;
      }
      .back {
        width: 40px;
        height: 50px;
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        line-height: 50px;
        .icon-arrow_lift {
          color: #fff;
        }
      }
    }
    .content {
      position: relative;
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);

      }
      .detail {
        margin-bottom: 18px;
        line-height: 10px;
        font-size: 0;
        .sell-count {
          display: inline-block;
          font-size: 10px;
          color: rgb(147, 153, 158);
        }
        .rating {
          @extend .sell-count;
          margin-left: 12px;
        }

      }
      .price {
        font-weight: 700;
        line-height: 24px;
        .now {
          margin-right: 8px;
          font-size: 14px;
          color: rgb(240, 20, 20);
        }
        .old {
          text-decoration: line-through;
          color: rgb(147, 153, 158);
          font-size: 10px;
        }
      }
    }
    .cart-box {
      position: absolute;
      right: 12px;
      bottom: 11px;
    }
    .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      line-height: 24px;
      padding: 0 12px;
      font-size: 10px;
      border-radius: 12px;
      color: #fff;
      background-color: rgb(0, 160, 201);
      box-sizing: border-box;

    }
    .info {
      padding: 18px;
      .title {
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .text {
        font-size: 12px;
        padding: 0 8px;
        line-height: 24px;
        color: rgb(77, 85, 93);
      }
    }
    .rating {
      padding-top: 18px;
      .title {
        margin-left: 18px;
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .rating-content {
        padding: 0 18px;
        .rating-item {
          position: relative;
          padding: 16px 0;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          .user {
            position: absolute;
            right: 0;
            top: 16px;
            line-height: 12px;
            font-size: 0;
            .name {
              display: inline-block;
              vertical-align: top;
              margin-right: 6px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
            .avatar {
              width: 12px;
              height: 12px;
              border-radius: 50%;
            }

          }
          .time{
            margin-bottom: 6px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147,153,159);
          }
          .text{
            line-height: 12px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            .icon-thumb_up,.icon-thumb_down{
              line-height: 24px;
              font-size: 12px;
            }
            .icon-thumb_up{
              color: rgb(0,160,220);
            }
          }
        }
        .no-rating{
          padding:16px 0;
          font-size: 12px;
          color: rgb(147, 153, 158);
        }
      }
    }
    }
  }
</style>
