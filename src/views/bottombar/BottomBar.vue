<template>
<!--  底层声明-->
  <div class="bottom-bar">
     <div class="font">
       <p class="border">
         注意:该播放器仿网易云播放器,只供学习交流使用,因时间原因,
         一些功能暂未完善,后期可能会重构采用ssr渲染,并使功能完善</p>
       <p class="zuozhe">
         如有bug请联系作者+q2941959130</p>
     </div>
  </div>
</template>

<script>
  export default {
    name: "BottomBar"
  }
</script>
<style lang="stylus" scoped>
   .bottom-bar{
     background-color: #333333;
     height: 200px;
     left 0
     bottom:0
     margin-bottom -20px;
     .font{
       font-size 15px;
       color:#fffdef;
     .border{
       padding-top 40px;
       border 2px solid white;
     }
       .zuozhe{
         color:#fffdef;
       }
  }
   }
</style>