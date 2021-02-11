<template>
<!--推荐歌手-->
  <div >
      <h2>推荐歌手</h2>
     <!--渲染-->
    <ul class="singer">
      <singer v-for="item in singer" :singerList="item" :key="item.id"></singer>
    </ul>
  </div>
</template>

<script>
  import Singer from "../../../../components/Singer/Singer";
  export default {
    name: "RecommendSinger",
    components:{
      Singer
    },
    data(){
      return{
        singer:[]
      }
    },
    mounted() {
     this.getHotSinger();
    },
    methods:{
     async getHotSinger(){
      let {data:req}=await this.$api.gethotSinger();
       console.log(req);
      if (req.code!==200){
         this.$message.error("获取热门歌手失败!");
       }
        this.singer=req.artists;
       console.log(this.singer);
     }
    }
  }
</script>

<style scoped>
.singer{
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  padding: 0 -15px 0;
}
</style>