<template>
  <!--不能直接在template标签 下写内容，一写报错，必须增加一个内容根标签div-->
  <div class="goods">
    <div class="left-menu" ref="menu">
      <ul>
        <li class="menu-item" v-for="(item,index) in goods" :class="{current:(currentIndex===index)}"
            @click="selectMenu(index,$event)">
          <span class="text"><icon :imgType="item.type" :fileType="3" v-show="item.type>0"></icon>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-box" ref="food">
      <ul>
        <li v-for="item in goods" class="food-list list-hook">
          <h2 class="title">{{item.name}}</h2>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="clickFood(food)">
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-box" >
                  <cartcontrol :food="food" v-on:drop="addDrop" ></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <food :food="food" ref="foodDetail"></food>
    <shopcart :delive-price="seller.deliver" :selectFoods="selectFoods" :min-price="seller.minPrice" ref="shopcart"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
  import icon from '../icon/icon';
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import food from '../food/food'

  const DATA_OK = 0;

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    //data()数据是给模板用的
    data(){
      return {
        goods: [],//所有的商品
        listHeight: [],//所有列表块的高度的数组(从最顶端开始到li结束位置的高度)，例如：第一个li高200，第二个700
        scrollY: 0,//当前滚动Y值
        food:{hello:'adf'}
      };
    },
    created(){
      this.$http.get('/api/goods').then((res) => {
        if (res.body.status === DATA_OK) {
          this.goods = res.body.data;
          //nextTick()是vue dom渲染完成后回调函数
          this.$nextTick(() => {
            this._initScroll();
            this.calculateHeight();
          })
        }

      })
    },
    components: {
      icon,
      shopcart,
      cartcontrol,
      food,
    },
    methods: {
      /**
       * 左侧菜单点击，右侧内容进行滚动到对应位置
       * @param index 当前菜单index
       * @param event 当前点击事件
       */
      selectMenu(index, event){
        let foodListHook = this.$refs.food.getElementsByClassName('list-hook');
        let el = foodListHook[index];
        this.foodList.scrollToElement(el, 300);
      },
      //food-list滚动设置
      _initScroll(){
        //better-scroll 会拦截dom的原生事件，所以需要设置开放那些事件
        this.leftMenu = new BScroll(this.$refs.menu, {
          //设置可以点击
          click: true
        });

        this.foodList = new BScroll(this.$refs.food, {
          click: true,
          //根据传入的类型回调滚动，监听所有滚动
          probeType: 3,
        });
        //监听滚动，获取当前Y值
        this.foodList.on('scroll', (pos) => {
//              console.log(pos.y);
          this.scrollY = Math.abs(Math.round(pos.y));
//              console.log(this.scrollY);
        })
      },
      //左侧菜单栏点击
      calculateHeight(){
        // 计算从顶部到每一个li的最底端的高度，保存成数组
        let foodListHook = this.$refs.food.getElementsByClassName('list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodListHook.length; i++) {
          let item = foodListHook[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
//        console.log(this.listHeight)

      },
      addDrop(el){
        this.$refs.shopcart.drop(el);
      },
      clickFood(food){
          this.food=food;
          this.$refs.foodDetail.show();
      }
    },
    computed: {
      currentIndex(){
        for (let i = 0; i < this.listHeight.length; i++) {
          let h1 = this.listHeight[i];
          let h2 = this.listHeight[i + 1];
          //h2 index可能超出数组长度
          if ((i + 1 <= this.listHeight.length) && (this.scrollY >= h1 && this.scrollY < h2)) {
            return i;
          }

        }
        return 0;
      },
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
    },



  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/style/mixin";

  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .left-menu {
      flex: 0 0 80px;
      width: 80px;
      background-color: #f3f5f7;
      .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
        &.current {
          position: relative;
          margin-top: -1px;
          z-index: 10;
          font-weight: 700;
          background-color: #fff;
          .text {
            @include border-none();
          }

        }
        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          font-size: 12px;
          text-align: center;
          @include border-1px(rgba(7, 17, 27, 0.1));
        }
      }
    }
    .foods-box {
      flex: 1;
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        @include border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          @include border-none();
          margin-bottom: 0;
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;

        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px 0;
            height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .desc {
            margin-bottom: 8px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .extra {
            //scss继承
            @extend .desc;
            .count {
              margin-right: 12px;
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
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .cartcontrol-box {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }

      }
    }
  }
</style>
