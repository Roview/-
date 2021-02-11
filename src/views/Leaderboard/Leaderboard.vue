<template>
  <div class="leader ">
  <h2>云音乐特色榜</h2>
<!--截取4个数据传给-->
    <cloud-music-feature-list :topList="topList.slice(0,4)"></cloud-music-feature-list>
       <h2>全球媒体榜</h2>
    <cloud-music-feature-list :top-list="topList.slice(4)"></cloud-music-feature-list>
  </div>
</template>

<script>
  import CloudMusicFeatureList from "./LeaderBoardChild/CloudMusicFeatureList";
  export default {
    name: "Leaderboard",
    components: {
      CloudMusicFeatureList,
    },
    data(){
       return{
         topList:[]
       }
    },
    created() {
    //  请求云音乐特色榜数据
      this.cloudmusicfeaturelist();
    },
    methods:{
     async cloudmusicfeaturelist(){
      let res=await this.$api.cloudmusicfeaturelist();
       console.log(res);
       if (res.status!==200){
            this.$message.error('获取云音乐特色榜数据失败');
       }else {
            res.data.list.forEach(item=>{
              let ob = {};
              ob.picUrl=item.coverImgUrl;
              ob.name=item.name;
              ob.playCount=item.playCount;
              ob.id=item.id;
              this.topList.push(ob);
            })
         console.log(this.topList);
       }
     }
    }
  }
</script>

<style lang="stylus" scoped>
 .leader{
   min-width 1200px;
   h2{
     padding 20px 0 20px 18px;
     margin-bottom: 50px;
   }
 }
</style>