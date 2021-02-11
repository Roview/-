<template>
<!--云音乐特色榜-->
  <div class=" song-sheet-list">
      <div class="VersionHeart containers">
    <div class="group" v-for="(item,index) in topList" :key="index" @click="playsongsheet(item.id)">
      <a href="javascript:;">
        <span>
          <i class="el-icon-caret-right">
            {{utils.tranNumber(item.playCount)}}
          </i>
        </span>
        <img :src="item.picUrl ||item.coverImgUrl" alt="">
        <h3>{{item.name}}</h3>
      </a>
    </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: "CloudMusicFeatureList",
    props:{
      topList:{
        type:Array,
        default:[],
      }
    },
    methods:{
      //跳转到排行榜
      playsongsheet(id){
        // this.$router.push(`play-list-detail/${id}`);
        this.$router.push(`/PlayListPage/${id} `);
      }
    }
  }
</script>

<style lang="stylus" scoped>
.song-sheet-list{
  width: 100%;
.containers{
  display flex;
  flex-wrap wrap
  margin-top -45px;
  .group{
    width 12.5%;
    flex 0 0 12.5%;
    padding:0 20px 20px;
    /*max-width 1250px;*/
    position relative
    margin-left 15px;
a{
  span{
    position: absolute;
    right: -17px
    top: 6px;
    background-color: #000;
    color: #fff;
    font-size 12px;
    border-radius 4px;
  }
  img{
    width 176px;
    height: 176px;
    vertical-align middle;
    border-radius 2px;
    box-shadow: 0 0 5px rgba(1,2,2, .7);

  }
   h3{
     text-align center;
     color: #4a4a4a;
     font-size 14px;
     width 173px;
   }
}
  }
}
}
</style>