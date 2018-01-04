<template>
  <div class="shopcart">
    <div class="content" >
      <div class="content-left"@click="showListClick">
        <div class="logo-box">
          <div class="logo" :class="{highlight:totalCount>0}">
            <i class="icon-shopping_cart" :class="{highlight:totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{highlight:totalCount>0}">¥{{totalPrice}}</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <!--购物车详情-->
      <transition name="list-fade">
      <div class="show-list" v-show="showFlag" >
        <div class="show-header" >
          <h3 class="title">购物车</h3>
          <span class="empty">清空</span>
        </div>
        <div class="show-content" ref="showContent">
          <ul class="list-box">
            <li v-for="food in selectFoods" >
              <span class="name">{{food.name}}</span>
              <div class="cartcontrol-box">
                <cartcontrol :food="food" class="control"></cartcontrol>
              </div>
              <span class="price">{{food.price*food.count}} 元</span>
            </li>

          </ul>
        </div>
      </div>
      </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from '../cartcontrol/cartcontrol'
  export default{
    props: {
      //所有被加入购物车的商品
      selectFoods: {
        type: Array,
        //如果类型是数组，则默认值是一个函数返回[]
        default(){
          return [
            {price: 10, count: 1}
          ];
        }
      },
      //配送费
      deliveryPrice: {
        type: Number,
        default: 4
      },
      //最少起送价格
      minPrice: {
        type: Number,
        default: 30
      },

    },
    watch:{
        selectFoods:function () {
            if(!this.scroll){
              this.scroll=new BScroll(this.$refs.showContent,{ click:true});
            }else{
                this.scroll.refresh();
            }

        },
        totalCount:function () {
          if(this.totalCount==0){
              this.showFlag=false;
          }
        }

    },
    data(){
      return {
        //定义多个小球，方便点击多次
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false},
        ],
        //做动画的小球
        dropBall: [],
        showFlag: false,
      }
    },
    computed: {
      totalPrice(){
        let price = 0;
        this.selectFoods.forEach(food => {
          price+=food.price * food.count;
        })
        return price;
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach(food => {
          count += food.count;
        })
        return count;
      },
      //配送按钮描述
      payDesc(){
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass(){
        if (this.totalPrice < this.minPrice) {
          return "not-enough";
        } else {
          return 'enough';
        }
      },
    },
    methods: {
      showListClick(){
        if (this.totalCount > 0) {
          if (this.showFlag) {
            this.showFlag = false;
          } else {
            this.showFlag = true;
          }
        }
      },
      drop(el){
        //这里获取到了添加商品按钮的dom，可以获取其相对位置好做动画
        this.balls.forEach((ball) => {
          //因为vue的动画是需要显示或隐藏才会触发所以，当小球显示时就触发了动画，此处获取隐藏的小球
          if (!ball.show) {
            //触发动画
            ball.show = true;
            ball.el = el;
            //当小球做动画时，就加入到drapball中
            this.dropBall.push(ball);
            return;
          }

        });
      },
      beforeEnter(el){
        let count = this.balls.length;
        while (count--) {
          let ball = balls[count];
          if (ball.show) {
            //获取点击按钮相对于视窗的位置，top,left
            let ract = ball.el.getBoundingClientRect();
            let x = ract.left - 22;
            let y = window.innerHeight - ract.top - 22;
            //做动画的小球
            el.style.display = '';
            el.style.transform = `transform3d(0,${y}px,0)`;
            let inner = document.getElementsByClassName('inner-hook')[0];
            inner.style.transform = `transform3d(${x}px,0,0)`;

          }
        }
      },
      enter(el){
        let h = el.offsetHeight;
        this.$nextTick(() => {
          el.style.transform = `transform3d(0,0px,0)`;
          let inner = document.getElementsByClassName('inner-hook')[0];
          inner.style.transform = `transform3d(0px,0,0)`;
        })

      },
      afterEnter(el){
        let ball = this.dropBall.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }


    },
    components: {
      cartcontrol,
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .shopcart {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 48px;
    z-index: 10;
    width: 100%;
    background-color: #141d27;
    .content {
      display: flex;
      color: rgba(255, 255, 255, 0.4);
      .content-left {
        flex: 1;
        font-size: 0;
        .logo-box {
          display: inline-block;
          position: relative;
          top: -10px;
          width: 56px;
          height: 56px;
          margin: 0 12px;
          padding: 6px;
          box-sizing: border-box;
          border-radius: 50%;
          vertical-align: bottom;
          background-color: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #2b343c;
            text-align: center;
            position: relative;
            &.highlight {
              background-color: rgb(0, 160, 220);
            }
            .ball {
              display: inline-block;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background-color: rgb(0, 160, 220);
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              top: 0;
              margin: auto auto;
            }
            .icon-shopping_cart {
              font-size: 24px;
              color: #80858a;
              line-height: 44px;
              &.highlight {
                color: #fff;
              }
            }
          }
          .num {
            position: absolute;
            height: 16px;
            width: 24px;
            top: 0;
            right: 0;
            line-height: 16px;
            text-align: center;
            font-size: 9px;
            font-weight: 700;
            color: #FFFFFF;
            background-color: rgb(240, 20, 2);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
            border-radius: 16px;
          }

        }
        .price {
          display: inline-block;
          margin-top: 12px;
          padding-right: 12px;
          line-height: 24px;
          vertical-align: top;
          box-sizing: border-box;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 16px;
          font-weight: 700;
          &.highlight {
            color: #FFFFFF;
          }

        }
        .desc {
          display: inline-block;
          margin-top: 12px;
          margin-left: 12px;
          vertical-align: top;
          line-height: 24px;
          font-size: 10px;
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        .pay {
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          background-color: #2b333b;
          &.not-enough {
            background-color: #2b333b;
          }
          &.enough {
            background-color: rgb(0, 160, 220);
            color: #FFFFFF;
          }
        }
      }
    }

    .list-fade-enter{
      transform: translate3d(0,100%,0);
      opacity:0;
    }
    .list-fade-enter-active,list-fade-leave-active{
      transition: all .5s;
    }

    .show-list {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      transform: translate3d(0,-100%,0);
      background-color: #efefef;
      .show-header {
        height: 40px;
        border-bottom: 1px solid #e3e3e3;
        padding: 0 15px;
        .title {
          display: inline-block;
          line-height: 40px;
          height: 40px;
          float: left;
        }
        .empty {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .show-content {
        padding: 0 15px;
        overflow: hidden;
        max-height: 217px;
        li {
          height: 58px;
          line-height: 58px;
          border-bottom: #000;
          .name {
            float: left;
            display: inline-block;
            font-size: 16px;
            font-weight: 700;
          }
          .price {
            float: right;
            margin-right: 12px;
            font-weight: 700;
            color: #f00e0d;
          }
          .cartcontrol-box {
            float: right;
            margin-top: 10px;
            height: 25px;
            .control {
              height: 25px;
            }
          }

        }
      }

    }
  }
</style>
