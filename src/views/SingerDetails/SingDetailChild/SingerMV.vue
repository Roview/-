<template>
<!--歌手mv-->
<div>
{{mvs}}
</div>
</template>

<script>
  export default {
    name: "SingerMV",
    data(){
      return{
        //mv信息
        mvs:[]
      }
    },
    created() {
      this.getSingerMV();
    },
    methods:{
     async getSingerMV(){
     let res= await this.$api.getSingerMV(this.$route.params.id);
       if(res.status===200){
          this.mvs=res.data.mvs;
       }
     }
    }
  }
</script>

<style scoped>

</style>