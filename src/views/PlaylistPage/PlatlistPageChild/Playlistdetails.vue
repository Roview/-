<template>
<!--  歌单详情页-->
  <div class="play-list" >
     <div class="cover">
       <img class="img"  :src="playlistitem.coverImgUrl">
     </div>
    <div class="title">
       <h1>{{playlistitem.name}}</h1>
      <div class="title-main"  v-if="playlistitem.creator">
        <img class="img" :src="playlistitem.creator.avatarUrl">
        <span class="name">{{playlistitem.creator.nickname}}</span>
        <span class="create-time">{{utils.formatDate(playlistitem.createTime)}}</span>
      </div>
<!--标签-->
      <p class="tags" v-if="playlistitem.tags">
        标签:<span class="tag" v-for="(item,index) in playlistitem.tags" :key="index">
        <el-tag type="danger">{{item}}</el-tag>
      </span>
      </p>
      <p class="des">{{playlistitem.description}}</p>
      <span  v-if="playlistitem.description" @click="dialogVisible = true">
        <p class="all">全部>></p>
      </span>
    </div>
<!--弹出框-->
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="30%">
      <span>{{value}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "playlistdetails",
    props:{
      playlistitem:{
        type:Object,
        default:{}
      },
      title:{
        type: String,
        default:'',
      },
      value:{
        type:String,
        default:'',
      }
    },
    data(){
      return {
        dialogVisible: false
      };
    },
    methods:{
      }
  }
</script>

<style lang="stylus" scoped>
.play-list {
  display: flex;
  .cover{
    position: relative;
    z-index: 2;
    width: 200px;
    height: 200px;
   & >img{
      width 100%;
      height: 100%
      border-radius 8px;
      position absolute;
      z-index 3;
     margin-left:-9px;
    }
  }
  .title{
    /*margin 10px 30px 20px;*/
    display flex;
    //切换为y轴为主轴
    flex-direction column;
    justify-content top ;
    flex 1;
    h1{
      font-size 24px;
      padding-bottom 20px;
    }
    .title-main{
      display flex;
      margin: -4px -1px 13px;
      align-items center;
      /*margin-bottom 10px;*/
      /*flex-direction: column;*/
      .img{
        /*width 30px;*/
        /*height: 30px;*/
        width: 30px;
        height: 30px;
        border-radius 100%;
        margin-left 9px;
        vertical-align middle;
      }
      .name{
        margin-left 10px;
      }
      .name:hover{
         color :#FA2800;
        cursor pointer;
       }
      .create-time{
        margin-left 10px;
      }
    }
    .tags{
      font-size 13px;
       .tag{
         padding 6px 4px;
       }
    }
    .des{
      margin: 3px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //作为弹性伸缩盒子模型显示。
      -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
      -webkit-line-clamp: 2; //显示的行
    }
    .all{
      margin-top 5px;
      font-size 13px;
      color: #FA2800;
      cursor pointer;
    }
  }
}
</style>