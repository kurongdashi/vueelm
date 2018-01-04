<!--该组件根据不同的类型显示不同的图标-->
<template>
  <span class="icon" :class="[iconSize,iconType]"></span>
</template>

<script type="text/ecmascript-6">
  const classMap1=['decrease_1','discount_1','special_1','invoice_1','guarantee_1'];
  const classMap2=['decrease_2','discount_2','special_2','invoice_2','guarantee_2'];
  const classMap3=['decrease_3','discount_3','special_3','invoice_3','guarantee_3'];
  export default{
    props:{
        //img类型减、折、特、票
      imgType:{
          type:Number
      },
      //img类型_1 、_2、_3
      fileType:{
          type:Number
      }
    },
    computed:{
        iconType(){
            if(this.fileType==1){
              return classMap1[this.imgType];
            }else if(this.fileType==2){
              return classMap2[this.imgType];
            }else{
              return classMap3[this.imgType];
            }

        },
        iconSize(){
            if(this.fileType==1 ||this.fileType==3){
                return 'size1';
            }else{
              return 'size2';
            }
        }

    }

}

</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/style/mixin";
  .icon{
    display: inline-block;
    vertical-align: top;
    margin-right: 4px;
    background-repeat:no-repeat;
    &.size1{
      height: 12px;
      width: 12px;
      background-size:12px 12px;
    }
    &.size2{
      height: 16px;
      width: 16px;
      background-size:16px 16px;
    }
    //有多种情况对应不同的图片
    &.decrease_1{
      //减
      @include bg-img('decrease_1')
    }
    &.discount_1{
      //折
      @include bg-img('discount_1')
    }
    &.guarantee_1{
      //保
      @include bg-img('guarantee_1')
    }
    &.invoice_1{
      //票
      @include bg-img('invoice_1')
    }
    &.special_1{
      //特
      @include bg-img('special_1')
    }
    //有多种情况对应不同的图片
    &.decrease_2{
      //减
      @include bg-img('decrease_2')
    }
    &.discount_2{
      //折
      @include bg-img('discount_2')
    }
    &.guarantee_2{
      //保
      @include bg-img('guarantee_2')
    }
    &.invoice_2{
      //票
      @include bg-img('invoice_2')
    }
    &.special_2{
      //特
      @include bg-img('special_2')
    }
    //有多种情况对应不同的图片
    &.decrease_3{
      //减
      @include bg-img('decrease_3')
    }
    &.discount_3{
      //折
      @include bg-img('discount_3')
    }
    &.guarantee_3{
      //保
      @include bg-img('guarantee_3')
    }
    &.invoice_3{
      //票
      @include bg-img('invoice_3')
    }
    &.special_3{
      //特
      @include bg-img('special_3')
    }

  }
</style>
