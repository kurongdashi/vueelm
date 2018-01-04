<template>
  <div class="cartcontrol">
    <transition name="btn">
      <div class="decrease" v-show="food.count>0" @click.stop="decrease">
          <i class="icon-remove_circle_outline "></i>
      </div>
    </transition>
    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <div class="add" @click.stop="addCount" ref="add" >
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default{
    props: {
      food: {
        type: Object
      }
    },
    computed: {},
    methods: {
      addCount(){
        //暴露一个事件，drop
        let dom=this.$refs.add;
        this.$emit('drop',dom);
        if (!this.food.count) {
          //通过vue.set()添加新属性，能被观察到
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }

      },
      decrease(){
        this.food.count--;
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  $color: rgb(0, 160, 220);
  .cartcontrol {
    font-size: 0;
    .btn-enter{
      transform: translate3d(24px,0,0);
      opacity:0;
    }
    .btn-enter-active,.btn-leave-active{
      transition: all .4s linear;
    }
    .btn-leave-to{
      transform: translate3d(24px,0,0);
    }

    .decrease {
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: $color;
      .inner{
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
      }
    }
    .count {
      display: inline-block;
      font-size: 10px;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      color: rgb(147, 153, 159);
    }
    .add {
      @extend .decrease;
    }
  }
</style>
