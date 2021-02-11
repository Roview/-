<template>
<!--歌单推荐-->
 <div class="common">
    <h2>精彩评论</h2>
<!--热门评论-->
   <ul>
    <li v-for="(item,index) in hotComments" :key="index">
     <el-image class="avatar" :src="item.user.avatarUrl"></el-image>
     <i class="el-icon-medal-1"></i>
     <div class="comment-info">
         <h3>
          {{item.user.nickname}}
          <span>{{utils.formatDate(item.time)}}</span>
         </h3>
      <p>{{item.content}}</p>
     </div>
    </li>
<!--    <li v-for="(item,index) in common" :key="index">-->
<!--     <el-image lazy class="avatar" :src="item.user.avatarUrl"></el-image>-->
<!--     <div class="comment-info">-->
<!--      <h3>-->
<!--       {{item.user.nickname}}-->
<!--       <span>{{utils.formatDate(item.time)}}</span>-->
<!--      </h3>-->
<!--      <p>{{item.content}}</p>-->
<!--     </div>-->
<!--    </li>-->
   </ul>
<!--  普通评论-->
  <ul>
   <li v-for="(item,index) in common" :key="index">
    <el-image lazy class="avatar" :src="item.user.avatarUrl"></el-image>
    <div class="comment-info">
     <h3>
      {{item.user.nickname}}
      <span>{{utils.formatDate(item.time)}}</span>
     </h3>
     <p>{{item.content}}</p>
    </div>
   </li>
  </ul>

 </div>
</template>
<script>
  export default {
    name: "Commit",
   props:{
    common:{
     type:Array,
     default:[],
    },
    hotComments:{
     type:Array,
     default:[],
    }
   }
  }
</script>

<style lang="stylus" scoped>
.common{
 height 100%
 h2{
  border-left: 4px solid red;
  font-size 20px;
  padding-left 10px;
  margin-top 5px;
 }
 ul{
  li{
   display flex;
   list-style none;
  .avatar{
   width 45px;
   height: 45px;
   border-radius 50%;
   margin-left 5px;
  }
   i{
     color red;
   }
   .comment-info{
    margin-left 10px;
    flex 1;
    h3{
     font-size 13px;
    }
    p{
     background-color: #f5f5f5;
     color #666;
     font-size:12px;
     padding 6px 8px;
     line-height 1.5em;
    }
   }
  }
 }
}
</style>