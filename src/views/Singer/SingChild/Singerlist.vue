<template>
  <div class="category-container">
    <ul v-for="(group, key) in singersearch">
      <li v-for="(item, index) in group"
          :class="{'active': (index === activeIndex[key])}"
          @click="ClickLi(index, key)">
        {{item.label || item.value }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Singerlist",
    methods:{
      ClickLi(index,key){
        // console.log(index);
        // console.log(key);
        // console.log(this.activeIndex[key]);
        this.$emit('ClickLi',index,key);
      }
    },
    props:{
      singersearch:{
        type:Object,
        default:{
          return:{},
        }
      },
      //关键
      activeIndex:{
        type:Object,
        default:{
          return: {}
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .category-container{
    ul{
      display: flex;
      li{
        padding: 6px 12px;
        background-color: #f4f4f4;
        border-radius: 50px;
        margin: 10px 4px;
        cursor: pointer;
        font-size: 12px;
        list-style:none;
      }
      .active{
        background-color: #FA2800;
        color: #fff;
      }
    }
  }
</style>