<template>
    <li @click="ClickSinger(singerList.id)">
    <div class="cover">
    <div class="image">
      <el-image :src="singerList.img1v1Url"></el-image>
    </div>
    </div>
      <div class="info">
          <p class="name">{{singerList.name}}</p>
          <p class="count" v-if="singerList.musicSize">单曲数:{{singerList.musicSize}}</p>
      </div>
    </li>
</template>

<script>
  export default {
    name: "Singer",
    data(){
      return{

      }
    },
    props:{
      singerList:{
        type:Object,
        default:{},
      }
    },
  methods:{
    ClickSinger(id){
     this.$router.push(`singer-detail/${id}`);
      console.log(id);
    }
  }
  }
</script>

<style lang="stylus" scoped>
  li {
    padding: 0 20px 40px;
    flex: 0 0 10%;
    max-width: 10%;
    list-style none;
    cursor pointer
    .cover {
      position: relative;
      z-index: 2;
      padding-top: 100%;
      border-radius: 50%;
      background-color: #d9d9d9;
      .image {
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }
      }
    }
    .info{
      margin-top 15px;
      text-align center;
      .name{
        font-weight 700;
        font-size 14px;
        line-height 18px;
      }
      .count{
       font-size 12px;
        margin-top 10px;
        color:#fa2800;
      }
    }
  }



</style>