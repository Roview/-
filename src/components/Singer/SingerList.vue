<template>
  <div class="wrapper">
    <div class="group" v-for="item in this.singers" :key="item.id" @click="singerDetail(item.id)">
      <a href="javascript:;">
        <img :src="item.picUrl">
        <h3>{{item.name}}</h3>
        <span>单曲数:{{item.musicSize}}</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SingerList",
    props: {
      singers: {
        type: Array,
        default() {
          return []
        }
      },
      isShowSongCount: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      singerDetail(id) {
        this.$router.push({path: `/singer-detail/${id}`})
      }
    }
  }
</script>

<style scoped lang="less">
  .wrapper{
    display: flex;
    flex-wrap: wrap;
    /*justify-content: flex-start;*/
    .group{
      flex: 0 0 12%;
      padding: 10px;
      text-align: center;
      img{
        width: 90px;
        height: 90px;
        border-radius: 100%;
        box-shadow: 0 0 4px rgba(1, 2, 3, 0.7);
      }
      span{
        color: #fa2800;
        font-size: 12px;
      }
    }
  }
</style>