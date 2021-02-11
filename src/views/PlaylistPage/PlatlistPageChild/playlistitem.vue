<template>
<!--  歌单详情页-->
  <div class="play-list-container ">
   <div class="handle">
      <span class="span1" @click="setPlayListCollection">
        <i class="el-icon-star-off">收藏</i>
      </span>
<!-- 播放全部-->
     <span @click="PlayAll" class="span">
        <i class="el-icon-caret-right">播放全部</i>
      </span>
   </div>
    <div class='aaaa'>
      <table class="play-list">
        <thead>
        <tr>
          <th class="index-th">序号</th>
          <th class="song-th">歌曲</th>
          <th class="singer-th">歌手</th>
          <th class="album-th">专辑</th>
          <th class="transition-th">时长</th>
        </tr>
        </thead>
      <tbody>
        <tr>
         <tr v-for="(item,index) in playListTable" :key="index">
           <td>
             <play-button :item="item" :index="index" :playList="playListTable"></play-button>
           </td>
           <td>
           <div class="avatar">
             <div class="cover">
               <el-image v-if="item.picUrl" lazy :src="item.picUrl" alt=""></el-image>
             </div>
               <p>{{item.song}}</p>
           </div>
         </td>
         <td>
           <p>{{item.singer}}</p>
         </td>
         <td>
           <p>{{item.album}}</p>
         </td>
         <td>{{utils.formatSecondTimes(utils.formatSecond(item.transitionTime))}}</td>
        </tr>
      </tbody>
      </table>
    </div>
     </div>
</template>

<script>
 import PlayButton from "../../../common/playbuttom/PlayButton";
 import {mapGetters,mapMutations} from 'vuex'
  export default {
    name: "playlistitem",
    components:{
      PlayButton
    },
    props:{
      playListTable:{
        type:Array,
        default:[]
      }
    },
    computed:{
       ...mapGetters([
         'playList',
         'currentSong',
         'isPlay',
         'audio'
       ])
    },
    mounted() {
      this.setplayList(this.playListTable);
    },
  methods:{
    setPlayListCollection(){
      this.$message.error('因时间原因,收藏功能暂未开发!后期进行功能完善');
    },
    //播放全部
    PlayAll(){
    // 将当前歌单添加全局歌单
      this.setplayList(this.playListTable);
       //控制按钮显示
       this.isplaymutation(false);
       //数组中添加第一个为我们播放对象
      this.setCurrentSong(this.playList[0])
      setTimeout(()=>{
        this.play();
        this.isplaymutation(true);
      },20)
    },
    ...mapMutations([
       'setplayList',
       'isplaymutation',
       'setCurrentSong',
       'play',
    ])
  },
  }
</script>

<style lang="stylus" scoped>
.play-list-container{
  .handle{
   .span1{
     float right;
     padding 6px 15px;
     background-color: #cecece;
     border-radius 50px;
     cursor pointer
     margin-right  3px;
     margin-top  -40px;
   }
    .span{
      float right;
      padding 6px 15px;
      /*background-color: #cecece;*/
      border-radius 50px;
      cursor pointer
      margin-right  88px!important;
      background-color: #FA2800;
      color #fff;
      margin-top  -40px;
    }
  }
  .playlisttable{
    position absolute;
    left 0
    width 70%;
    margin-top: 20px;
    text-align: -moz-left;
    text-align: -webkit-left;
    text-align: left;
    ///*padding 10px 10px 10px 10px*/
  }
  .aaaa{
    width 100%;
    margin-top 39px;
    .play-list{
      text-align: -moz-left;
      text-align: -webkit-left;
      text-align: left;
      width: 100%;
      margin-top: 20px;
      tr{
        line-height 31px;
        padding 10px;
        cursor pointer;
      }
      thead{
        tr{
          background-color: #fafafa
          th{
            text-align:center;
            color: #999;
            font-size :12px;
          }
        }
      }
    }
    tbody{
      tr:nth-child(2n) {
        background-color: #F7F7F7;
      }
      tr > td:first-child {
        text-align: center;
      }
      tr:hover{
        background-color: #d2d2d2;
        }
      tr, td{
        .avatar{
          display: flex;
          align-items: center;
          .cover{
            width: 40px;
            height: 40px;
            img{
              width: 100%;
              height: 100%;
              border-radius: 4px;
            }
          }
          P{
            margin-left: 15px;
            width: -50%;
          }
        }
        p{
          /*width: 20%;*/
          width 169px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>