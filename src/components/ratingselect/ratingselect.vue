<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive" :class="{active:selectType==2}" @click="select(2)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" :class="{active:selectType==0}" @click="select(0)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block engative" :class="{active:selectType==1}" @click="select(1)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{on:onlyContent}">
      <i class="icon-check_circle" @click="toggleOnlyContent"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE=0;
  const NEGATIVE=1;
  const All = 2;
  export default{
    props: {
      ratings: {
        type: Array,
        default(){
          return [];
        }
      },
      //默认选中那个区块
      defaultType: {
        type: Number,
        default: All,
      },
      //只看有内容
      only: {
        type: Boolean,
        default: false
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
    },
      //从外部传入的属性，如果在组件中有修改，则需要先将其保存到data属性中
    data(){
        return{
            selectType:this.defaultType,
            onlyContent:this.only
        }
    },
    methods:{
        select(num){
            this.selectType=num;
            this.$emit('selectTypeContent',num);
        },
      toggleOnlyContent(){
            this.onlyContent=!this.onlyContent;
             this.$emit('toggleOnlyContent',this.onlyContent);
      }
    },
    computed:{
      positives(){
          return this.ratings.filter((rating) => {
              return rating.rateType===POSITIVE;
          });
      },
      negatives(){
        return this.ratings.filter((rating) => {
          return rating.rateType===NEGATIVE;
        });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../common/style/mixin';
.ratingselect{
  .rating-type{
    padding:18px 0;
    margin:0 18px;
    @include border-1px(rgba(7,17,27,0.1));
    font-size: 0;
      .block{
        font-size: 14px;
        display: inline-block;
        padding:8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        color: rgb(77,85,93);
        &.active{
          color: #fff;
        }
        .count{
          margin-left: 2px;
          font-size: 8px;
        }
        &.positive{
          background-color:rgba(0,160,220,0.2) ;
          &.active{
            background-color:rgb(0,160,220) ;
          }
        }
        &.engative{
          background-color: rgba(77,85,93,0.2);
          &.active{
            background-color:rgb(77,85,93);
          }
        }

      }
  }
  .switch{
    padding:12px 18px;
    line-height: 24px;
    border-bottom:1px solid rgba(7,17,27,0.1);
    color: rgb(147,153,159);
    font-size: 0;
    &.on{
      .icon-check_circle{
        color: #00c850;
      }
    }
    .icon-check_circle{
      display: inline-block;
      vertical-align: top;
      font-size: 24px;
      margin-right: 4px;
    }
    .text{
      font-size: 12px;
    }

  }
}
</style>
