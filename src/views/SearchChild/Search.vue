<template>
<!--搜索结果-->
  <div class="search-page">
    <div class="font">搜索结果:</div>
<!--    <router-view></router-view>-->
    <playlistitem class="widthes" :playListTable="Searchdatas"></playlistitem>
  </div>
<!--分离-->
</template>

<script>
 import playlistitem from "../PlaylistPage/PlatlistPageChild/playlistitem";
  export default {
    name: "Search",
    components:{
      playlistitem
    },
    watch:{
    //监听自己路面url携带参数变化
      $route:{
        handler(){
          if (this.$route.params.keywords){
            this.searchSongs();
            console.log(123321);
            console.log(this.$route.params.keywords);
          }
        }
      }
    },
    data(){
      return{
        input3:'',
        Searchdatas:[],
        input:'',
      }
    },
    created() {
       this.searchSongs();
      },
    mounted() {
      this.sing();
      },
    methods: {
      //请求搜索歌曲名字
      async searchSongs() {
        let params = {
          keywords: this.$route.params.keywords,
          limit: 30,
        }
        console.log(this.$route.params.keywords);
        let res = await this.$api.searchSongs(params);
        if (res.status === 200) {
          this.Searchdatas=[];
          res.data.result.songs.map(item => {
            let obj = {};
            obj.id = item.id;
            obj.song = item.name;
            obj.song = item.name;
            if (item.al) {
              obj.picUrl = item.al.picUrl
            }
            obj.singer = item.ar.map(it => it.name).join("/");
            obj.album = item.al.name;
            obj.transitionTime = item.dt;
            this.Searchdatas.push(obj);
            // console.log(this.searchData);
          })
        }
      },
      sing(){
          this.bus.$on('searchdate',(msg)=>{
            this.input=msg;
            console.log(msg);
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
 .search-page{
 .font{
   font-size 33px;
   font-weight :500;
   .widthes{
     width :100%!important;
   }
  }
 }
</style>