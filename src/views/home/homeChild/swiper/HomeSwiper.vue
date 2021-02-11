<template>
  <div class=" eee" >
    <swiper
            :slides-per-view="3"
            :space-between="50"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            class="ee"
    >
      <swiper-slide v-for="(item,index) in bannerList">
        <img :src="item.imageUrl" alt=""></swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from "vue-awesome-swiper";
  import 'swiper/css/swiper.css'
  export default {
    name: "HomeSwiper",
    components:{
      swiper,
      swiperSlide
      },
    data() {
      return {
      }
     },
    methods:{
      onSwiper(swiper) {
        console.log(swiper);
      },
      onSlideChange() {
        console.log('slide change');
      },
    },
    props:{
       bannerList:{
         type:Array,
         default:[],
       }
     }
  }
</script>

<style scoped>
  .ee{
  padding: 0 150px ;
  cursor: pointer;
  }
  .eee{
    /*margin-top: 75px;*/
  }
</style>