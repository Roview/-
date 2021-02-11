<template>
<!--喜欢这个歌单的人-->
  <div class="subscrlbers">
     <h2>喜欢这个歌单的人</h2>
      <ul>
        <li v-for="(item,index) in subscribers ":key="index">
          <img :src="item.avatarUrl" alt="">
        </li>
      </ul>
  </div>
</template>

<script>
  export default {
    name: "SubScrIbers",
    props:{
      subscribers:{
        type:Array,
        default:[]
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .subscrlbers{
    background-color: write
    h2{
      border-left: 4px solid red;
      font-size 20px;
      padding-left 10px;
    }
    ul{
      display flex;
      flex-wrap wrap
      flex 1;
      li{
        padding 3px;
       list-style :none;
        img{
          width: 40px;
          height: 40px
          border-radius 4px;
          cursor pointer
        }
      }
    }
  }
</style>