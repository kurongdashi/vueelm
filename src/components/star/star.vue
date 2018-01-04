<!--封装了一个star组件，这个组件尺寸，分数需要从外部设置,-->
<template>
  <!-- 1、基本样式通过class来设置，特殊的动态样式，通过:class 来绑定-->
  <div class='star' :class="starType">
    <!--2、star-item控制基本样式，:class="itemclass" 控制图片是否是全星还是半星等-->
    <span v-for="itemClass in itemsClass" :class="itemClass" class="start-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGHT=5;
  const CLS_ON="on";
  const CLS_HALF="half";
  const CLS_OFF="off";

  export default {
      props:{
          score:{
              type:Number
          },
          size:{
              type:Number
          }
      },
    data(){
        return {

        }
    },
    computed:{
      starType(){
          return 'star-'+this.size;
      },
      itemsClass(){
          let result=[];
          //如果分数小数部分>=0.5出现半星,让分数取0.5倍数
          let score=Math.floor(this.score * 2)/2;
          //有小数
          let hasDecimal=score%1!==0;
          let integer=Math.floor(score);
          for(let i=0;i<integer;i++){
              result.push(CLS_ON);
          }
          if(hasDecimal){
              result.push(CLS_HALF);
          }
          //如果传入的分手小于5个基本长度则补off
          while(result.length<LENGHT){
            result.push(CLS_OFF);
          }
          return result;
      }
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/style/mixin";

  .star{
    //star 是基本样式
    font-size: 0;
    .start-item{
      display: inline-block;
      background-repeat: no-repeat;
    }
    //star-xxx是特殊样式，根据传入的size来确定
    &.star-48{
      .start-item{
        width: 20px;
        height: 20px;
        margin-right: 20px;
        background-size:20px 20px ;
        &:last-child{
          margin-right: 0;
        }
        //3中状态也是根据传入的score来确定
        // 每种状态对应不同的图
        &.on{
          @include bg-img('star48_on');
        }
        &.half{
          @include bg-img('star48_half');
        }
        &.off{
          @include bg-img('star48_off');
        }
      }
    }
    &.star-36{
      .start-item{
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size:15px 15px ;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          @include bg-img('star36_on');
        }
        &.half{
          @include bg-img('star36_half');
        }
        &.off{
          @include bg-img('star36_off');
        }
      }

    }
    &.star-24{
      .start-item{
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size:10px 10px ;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          @include bg-img('star24_on');
        }
        &.half{
          @include bg-img('star24_half');
        }
        &.off{
          @include bg-img('star24_off');
        }
      }
    }
  }
</style>
