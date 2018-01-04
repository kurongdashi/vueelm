<template>
  <div class="header">
    <div class="content-wapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64px">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wapper"@click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
      <!--sticky footer布局，屏幕高度不管怎么变化（detail-main中内容增加或者减少），close按钮始终定位在屏幕底端-->
      <div class="detail-wapper ">
        <div class="detail-main ">
          <h3 class="name">{{seller.name}}</h3>
          <div class="star-wapper">
          <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠详情</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="support">
            <li class="support-item" v-for="(item,key) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[key].type]"></span>
              <span class="text">{{seller.supports[key].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="text">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close"@click="hidDetail">
        <i class="icon-close"></i>
      </div>
    </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star';


  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data(){
        return{
            detailShow:false
        }
    },
    methods:{
      showDetail(){
          this.detailShow=true;
      },
      hidDetail(){
          this.detailShow=false;
      },
    },
//    组件在创建过程中，生命周期方法回调
    created(){
        this.classMap=['decrease','discount','special','invoice','guarantee']
    },
    components:{
        'star':star
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/style/mixin";

  .header{
    overflow: hidden;
    background-color: rgba(7,17,27,0.5);
    position: relative;
    color: #FFFFFF;
    /*background-color: #999;*/
    .content-wapper{
      position: relative;
      padding:24px 12px 18px 24px;
      /*去除标签内，空白字符的占位*/
      font-size: 0;
      .avatar{
        display: inline-block;
        vertical-align: top;
        img{
          border-radius:2px;
        }
      }
      .content{
        display: inline-block;
        margin-left: 16px;
        font-size: 14px;
        .title{
          margin:2px 0 8px 0;
          .brand{
            display: inline-block;
            vertical-align: top;
            width: 30px;
            height: 18px;
            @include bg-img('brand');
            background-size: 30px 18px;
            background-repeat:no-repeat;
          }
          .name{
            margin-left: 6px;
            font-size: 16px;
            line-height:18px;
            font-weight: bold;
          }
        }
        .description{
          margin-bottom:10px;
          line-height: 12px;
          font-size: 12px;
        }
        .support{
          .icon{
            display: inline-block;
            vertical-align: top;
            height: 12px;
            width: 12px;
            margin-right: 4px;
            background-size:12px 12px;
            background:{
              size:12px 12px ;
              repeat:no-repeat;
            };
            //有多种情况对应不同的图片
            &.decrease{
              //减
              @include bg-img('decrease_1')
            }
            &.discount{
              //折
              @include bg-img('discount_1')
            }
            &.guarantee{
              //保
              @include bg-img('guarantee_1')
            }
            &.invoice{
              //票
              @include bg-img('invoice_1')
            }
            &.special{
              //特
              @include bg-img('special_1')
            }

          }
          .text{
            font-size: 10px;
            line-height: 12px;
          }
        }
      }
      .support-count{
        position: absolute;
        right: 12px;
        bottom: 14px;
        padding:0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background-color: rgba(0,0,0,0.2);
        text-align: center;
        .count{
          font-size: 10px;
        }
        .icon-keyboard_arrow_right{
          vertical-align: top;
          font-size: 10px;
          margin-left: 2px;
          line-height: 24px;
        }
      }
    }
    .bulletin-wapper{
      background-color: rgba(17,7,27,0.2);
      position: relative;
      height: 28px;
      line-height: 28px;
      padding:0 22px 0 12px;
      //文字缩略
      white-space:nowrap;//不换行
      overflow: hidden;
      text-overflow: ellipsis;
      .bulletin-title{
        display: inline-block;
        vertical-align: top;
        margin-top: 8px;
        height: 12px;
        width: 22px;
        @include bg-img('bulletin');
        background: {
          size: 22px 12px;
          repeat:no-repeat;
        }
      }
      .bulletin-text{
        font-size: 10px;
        margin:0 4px;
        vertical-align: top;
      }
      .icon-keyboard_arrow_right{
        position: absolute;
        right: 12px;
        top: 8px;
        font-size: 10px;
      }
    }
    .background{
      position: absolute;
      z-index: -1;
      left: 0;
      top: 0;

      //filter模糊效果
      filter: blur(10px);
      width: 100%;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    /*详情页入场透明度动画*/
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter,.fade-leave-to{
      opacity:0;
    }
    .detail{
      position: fixed;
      z-index:100;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      backdrop-filter:blur(10px);
      background-color: rgba(7,17,27,0.8);
      .detail-wapper{
        width: 100%;
        min-height: 100%;
        .detail-main{
          padding:64px 0;
          .name{
            text-align: center;
            font-size: 16px;
            line-height: 16px;
            font-weight: 700;
          }
          .star-wapper{
            margin-top: 18px;
            padding:2px 0;
            text-align: center;
          }
          .title{
            display: flex;
            width: 80%;
            margin:28px auto 24px auto;
            .line{
              flex:1;
              position: relative;
              top: -6px;
              border-bottom:1px solid rgba(255,255,255,0.2);
            }
            .text{
              font-weight: 700;
              padding:0 12px ;
              font-size: 14px;
            }
          }
          .support{
            width: 80%;
            margin:0 auto;
            .support-item{
              padding:0 12px ;
              margin-bottom:12px ;
              font-size: 0;
              &:last-child{
                margin-bottom: 0;
              }
              .icon{
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 6px;
                background-size:16px 16px;
                background-repeat:no-repeat;
                vertical-align: top;
                //有多种情况对应不同的图片
                &.decrease{
                  //减
                  @include bg-img('decrease_2')
                }
                &.discount{
                  //折
                  @include bg-img('discount_2')
                }
                &.guarantee{
                  //保
                  @include bg-img('guarantee_2')
                }
                &.invoice{
                  //票
                  @include bg-img('invoice_2')
                }
                &.special{
                  //特
                  @include bg-img('special_2')
                }
              }
              .text{
                font-size: 12px;
                line-height: 16px;
              }
            }
          }
          .bulletin{
            width: 80%;
            margin:0 auto;
            .text{
              line-height: 24px;
              font-size: 12px;
              padding:0 12px;
            }
          }
        }
      }
      .detail-close{
        position: relative;
        width: 32px;
        height: 32px;
        margin:-64px auto 0 auto;
        font-size: 32px;
        /*clear: both;*/
      }

    }
  }

</style>
