<template>
  <div class="ratings" ref="rating">
    <div class="rating-content">
      <div class="overflow">
        <div class="overflow-left">
          <h3 class="score">{{seller.score}}</h3>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overflow-right">
          <div class="star-box">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="star-box">
            <span class="title">商品评分</span>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="star-box">
            <span class="title">送达时间</span>
            <span class="score delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :ratings="ratings" :select-type="selectType" :only-content="onlyContent"
                    @selectTypeContent="selectTypeContent" @toggleOnlyContent="toggleOnlyContent"></ratingselect>

      <div class="rating-list">
        <ul>
          <li class="rating-item" v-for="rating in ratings" v-show="needShow(rating.text,rating.rateType)">
            <div class="avatar">
              <img :src="rating.avatar" alt="" width="28px">
            </div>
            <div class="content">
              <h3 class="name">{{rating.username}}</h3>
              <div class="star-box">
                <star  :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">送达时间{{rating.deliveryTime}}分钟</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend">
                <i class="icon-thumb_up" v-show="rating.rateType==0"></i>
                <i class="icon-thumb_down" v-show="rating.rateType==1"></i>

                <span class='item' v-for="text in rating.recommend">{{text}}</span>
              </div>
              <div class="time">{{rating.rateTime|formatDate }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../../components/star/star'
  import split from '../split/split'
  import ratingselect from '../ratingselect/ratingselect'
  import formatDate from '../../common/js/date';
  import BScroll from 'better-scroll';
  const All = 2;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star, split, ratingselect
    },
    data(){
      return {
        ratings: [],
        onlyContent: false,
        //默认选择那个区块
        selectType: All,
      }
    },

    created(){
      this.$http.get('/api/ratings').then((res) => {
        res = res.body;
        if (res.status === 0) {
          this.ratings = res.data;
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.rating, {click: true});
            } else {
              this.scroll.refresh();
            }
          })
        }
      });
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {
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

      }
    }


  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .ratings {
    position: absolute;
    top: 174px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .overflow {
      display: flex;
      padding: 18px 0;
      .overflow-left {
        flex: 0 0 137px;
        width: 137px;
        padding: 6px 0;
        border-right: 1px solid rgba(7, 17, 27, 0.4);
        text-align: center;
        @media screen and (max-width: 320px) {
          flex: 0 0 120px;
        }
        .score {
          line-height: 28px;
          font-size: 24px;
          margin-bottom: 6px;
          color: rgb(255, 153, 0);
        }
        .title {
          margin-bottom: 6px;
          line-height: 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .rank {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .overflow-right {
        padding: 6px 0;
        flex: 1;
        padding-left: 24px;
        @media screen and (max-width: 320px) {
          padding-left: 10px;
        }
        .star-box {
          font-size: 0;
          line-height: 18px;
          margin-bottom: 8px;
          .title {
            vertical-align: top;
            display: inline-block;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }
          .star {
            display: inline-block;
            vertical-align: top;
            margin: 0 12px;
          }
          .score {
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            color: rgb(255, 153, 0);
          }
          .delivery {
            margin-left: 12px;
            color: rgb(147, 153, 159);
          }
        }

      }
    }
    .rating-list{
      padding:0 18px;
      .rating-item{
        display: flex;
        padding:18px 0;
        border-bottom:1px solid rgba(7,17,27,0.1);
        .avatar{
          flex:0 0 28px;
          width: 28px;
          margin-right: 12px;
          img{
            border-radius: 50%;
          }
        }
        .content{
          position: relative;
          flex: 1;
          .name{
            margin-bottom: 4px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(7,17,27);
          }
          .star-box{
            margin-bottom: 6px;
            font-size: 0;
            .star{
              display: inline-block;
              margin-right: 6px;
              vertical-align: top;
            }
            .delivery{
              display: inline-block;
              vertical-align: top;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147,153,159);
            }

          }
          .text{
            margin-bottom: 8px;
            line-height: 18px;
            font-size: 12px;
            color: rgb(7,17,27);
          }
          .recommend{
            font-size: 0;
            line-height: 16px;
            .icon-thumb_up,.item,.icon-thumb_down{
              display: inline-block;
              margin:0 8px 4px 0;
              font-size: 9px;
            }
            .icon-thumb_up{
              color: rgb(0 ,160,220);
            }
            .item{
              padding:0 6px;
              border: 1px solid rgba(7,17,27,0.1);
              border-radius: 1px;
              color: rgb(147,153,159);
              background-color: #fff;
            }
          }
          .time{
            position: absolute;
            top: 0;
            right: 0;
            font-size: 10px;
            color: rgb(147,153,159);
          }
        }
      }
    }
  }
</style>
