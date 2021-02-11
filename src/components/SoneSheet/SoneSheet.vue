<template>
    <div class="list">
       <div class="item"
              v-for="(item,index) of personalizeds"
              :key="item.id"
            @click="toDetail(item)"
              >
         <div class="wrapper">
           <a>
             <div class="cover">
               <div class="image">
                 <el-image :src="item.picUrl || item.coverImgUrl"
                         lazy>
                   <div slot="placeholder"
                           class="image-slot flex-center flex-column">
                     <i class="iconfont niceicon-3"></i>
<!--                     <p>加载中<span class="dot">...</span></p>-->
                   </div>
                   <div slot="error" class="image-slot flex-center">
                     <i class="el-icon-picture-outline"></i>
                   </div>
                 </el-image>
               </div>
               <div class="count">
                 <i class="arrow"></i>
             <!--解析数字是多少万 -->
                 <span>{{ utils.tranNumber(item.playCount, 0) }}</span>
               </div>
             </div>
           </a>
         </div>
<!--歌单下面那段话-->
         <div class="info">
           <div class="name ellipsis-two">
             {{ item.name }}
           </div>
         </div>
       </div>
           </div>
</template>

<script>
  export default {
    name: "SoneSheet",
    props:{
      personalizeds:{
        type:Array,
        default:[],
      }
    },
    methods:{
      // 跳转去推荐的歌单
      toDetail(item){
        console.log(item);
        //跳转推荐歌单页面||榜单页面
        this.$router.push(`/PlayListPage/${item.id} `);
      }
    }
  }
</script>

<style lang="stylus" scoped>
.list{
  display flex;
  flex-wrap wrap;
  margin 0 -15px;
 .item{
   flex: 0 0 12.5%;
   max-width: 12.5%;
   padding: 0 15px 30px;
   cursor: pointer;
   &.two{
     flex: 0 0 50%;
     max-width: 50%;
   }
   .wrapper{
     position relative
     padding-right 10px
     &:after,&:before{
       content :'';
       width: 100%
       height: 100%
       background-color: #d9d9d9;
       position absolute;
       top :0;
       transition all .4s;
     }
     &:before {
       right: 6px;
       //缩放
       transform: scale(.85);
       transform-origin: 100% 50%;
       z-index: 2;
       border-radius: 2px;
     }
     &:after {
       right: 4px;
       transform: scale(.73);
       transform-origin: 100% 50%;
       z-index: 1;
       border-radius: 2px;
       opacity: .5;
     }
     .cover{
       position: relative;
       z-index: 2;
       padding-top: 100%;
       border-radius: 2px;
       background-color: #d9d9d9;
       .image {
         position: absolute;
         top: 0;
         left: 0;
         overflow: hidden;
         width: 100%;
         height: 100%;
         border-radius: 4px;
       }
     }
     .count{
       position: absolute;
       right: 16px;
       top: 1px;
       height: 24px;
       padding-left: 9px;
       background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 0;
       background-size: cover;
       color: #fff;
       font-size: 12px;
       font-weight: 300;
       ///*font-size 15px*/
       line-height: 24px;
       display: flex;
       align-items: center;
       justify-content: center;
       .arrow {
         display: block;
         width: 0;
         height: 0;
         border-style: solid;
         border-width: 4px 0 4px 6px;
         border-color: transparent transparent transparent #ffffff;
         margin-right: 5px;
       }
       &:after {
         content: "";
         position: absolute;
         right: -14px;
         top: 0;
         width: 14px;
         height: 24px;
         background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 100%;
         background-size: cover;
       }
     }
   }
 }
}
</style>