<template>
<!--推荐歌单-->
<div>
 <h2 class="title">推荐歌单</h2>
  <sone-sheet :personalizeds="personalizeds"></sone-sheet>
</div>
</template>

<script>
 import SoneSheet from "../../../../components/SoneSheet/SoneSheet";
  export default {
    name: "RecommendPlaylist",
    data(){
       return{
          limit:24,
         //推荐歌单数据
         personalizeds:[]
       }
    },
    components:{
      SoneSheet
    },
    methods:{
      //请求推荐歌单数据
     async getPersonalized(){
       try {
         let res=await this.$api.getNerSongs(this.limit).catch(err=>{err});
         console.log(res);
         this.personalizeds=res.data.result;
         console.log(this.personalizeds);
       }catch (e) {
         console.log(e);
       }
     }
    },
    mounted() {
      //元素dom挂载完成
      this.getPersonalized();
    }
  }
</script>

<style scoped>
  .title {
    margin: 22px 0 15px 0;
  }
</style>