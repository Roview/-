<template>
  <div class="relatedsuggestion">
     <h2>相关推荐</h2>
    <ul>
      <li v-for="(item,index) in playListRecommend" :key="index">
        <div class="img">
          <el-image class="el-imageone" :src="item.coverImgUrl"></el-image>
        </div>
        <div class="describe">
            <h3>{{item.name}}</h3>
          <p class="des">By. {{item.creator.nickname}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "RelatedSuggestion",
    props:{
      playListRecommend:{
        type:Array,
        default:[],
      }
    }
  }
</script>

<style lang="stylus" scoped>
.relatedsuggestion{
  margin 0 ;
  h2{
    border-left: 4px solid red;
    font-size 20px;
    padding-left 10px;
    margin-top 5px;
  }
  ul{
    li{
      display flex;
      cursor pointer;
      .img{
        padding 0 14px;
        .el-imageone{
            width 50px;
            height: 50px;
          border-radius 5px;
        }
      }
      .describe{
        display flex;
        flex-direction: column;
        justify-content: space-around;
        width 300px;
        h3{
          font-size 14px;
        }
        h3:hover{
          color red;
        }
        p{
          font-size 14px;
          color:#a9a9a9;
        }
      }
    }
  }
}
</style>