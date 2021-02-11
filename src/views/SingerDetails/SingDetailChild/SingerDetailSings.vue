<template>
<!--  歌手单曲-->
  <div>
    <playlistitem class="sss" :playListTable="playList"></playlistitem>
  </div>

</template>

<script>
  import Playlistitem from "../../PlaylistPage/PlatlistPageChild/playlistitem";
  export default {
    name: "SingerDetailSings",
    components: {Playlistitem},
    data(){
      return{
        playList:[],
      }
    },
    created() {
    //根据id请求该歌手数据
      this.getSingSongs()
    },
    methods:{
    async getSingSongs(){
      let res= await this.$api.getSingSongs(this.$route.params.id);
      if (res.status === 200){
       res.data.hotSongs.forEach(item=>{
          let obj={};
         obj.song = item.name
         obj.singer = item.ar[0].name
         obj.album = item.al.name
         obj.transitionTime = item.dt
         obj.picUrl = item.al.picUrl
         obj.id = item.id
         this.playList.push(obj);
       })
      }
      console.log(this.playList)
    }
    }
  }
</script>

<style lang="stylus" scoped>
.sss{
  width 100%!important;
  box-sizing border-box;
}
</style>