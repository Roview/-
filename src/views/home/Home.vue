<template>
<!--发现音乐首页-->
  <div>
<!--请求轮播图数据-->
    <home-swiper :bannerList="bannerList"></home-swiper>
<!--推荐歌单-->
    <recommend-playlist></recommend-playlist>
<!--推荐新歌曲-->
    <recommend-songs></recommend-songs>
<!--推荐歌手-->
    <recommend-singer></recommend-singer>
  </div>
</template>

<script>
//请求
 import {getBanner} from "../../api/services/api";

 import HomeSwiper from "./homeChild/swiper/HomeSwiper";
 import RecommendPlaylist from "./homeChild/RecommendPlaylist/RecommendPlaylist";
 import RecommendSongs from "./homeChild/RecommendNewSongs/RecommendSongs";
 import RecommendSinger from "./homeChild/RecommendSinger/RecommendSinger";
  //底部播放栏
 import PlayBar from "../../common/PlayBar/PlayBar";
  export default {
    name: "Home",
    data(){
     return{
        //轮播图数据
        bannerList:[],
      }
    },
    components:{
      HomeSwiper,RecommendPlaylist,RecommendSongs,RecommendSinger,PlayBar
    },
    created() {
      this.BannerSwiper();
    },
    methods:{
    //  请求轮播图数据
       BannerSwiper(){
          getBanner().then(req=>{
            console.log(req);
            if (req.status!==200){
                  this.$message.error('轮播图数据请求错误');
            }
             this.bannerList=req.data.banners;
         }
      )
    },


    }
  }
</script>

<style scoped>
</style>