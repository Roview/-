<template>
<!--  歌手专辑-->
  <div class="singer-ablum">
    <ul>
      <li   v-for="(item,index) in hotAlbums" :key="index">
        <span class="type">
            <i class="el-icon-caret-right">{{item.subType || item.type}}</i>
        </span>
        <img @click="ablumClick" :src="item.picUrl" alt="">
         <h2>{{item.name}}</h2>
      </li>
    </ul>
  </div>
</template>

<script>
  import albumlist from "../../../common/albumlist/albumlist";
  export default {
    name: "Singeralbum",
    components:{
      albumlist
    },
    data(){
      return{
        hotAlbums:[]
      }
    },
    created() {
         this.getSingersalbum();
    },
    methods:{
    async getSingersalbum(){
      let params={
        id:this.$route.params.id,
        offset:0,
        limit:50
      }
      let res= await this.$api.getSingersalbum(params);
      if(res.status===200){
        this.hotAlbums=res.data.hotAlbums;
      }
      console.log(res);
      },
      ablumClick(){
        this.$message.error('因时间原因,专辑暂无');
      }
    },
  }
</script>

<style lang="stylus" scoped>
  ul{
    display:flex;
    flex-wrap wrap;
    li{
      position:relative;
      padding: 12px 10px;
      list-style:none;
      .type{
        position:absolute;
        background-color: #000;
        color :#fff;
        font-size 14px;
        border-radius 6px;
        top 18px;
        right 16px;
      }
      img{
        width: 130px;
        height: 130px;
        border-radius:4px;
        cursor:pointer;
      }
      h2{
        font-size:15px;
        text-align:center;
        overflow: hidden;
        width 130px;
      }
    }
  }
</style>