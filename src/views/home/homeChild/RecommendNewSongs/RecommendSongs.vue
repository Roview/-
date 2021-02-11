<template>
  <div>
     <h2>推荐新歌曲</h2>
   <!--列表-->
    <sone-music :songlist="song"></sone-music>
  </div>
</template>

<script>
  import SoneMusic from "../../../../components/SoneMusic/SoneMusic";
  //方法 处理推荐歌曲
  import { createSong } from '../../../../Songlist/sone'
  export default {
    name: "RecommendSongs",
    data(){
      return{
        song:[]
      }
    },
    components:{
      SoneMusic
    },
    //内容加载才会去网络请求
    mounted() {
       this.getNerSong();
    },
    methods:{
     async getNerSong(){
       let {data:res}=await this.$api.getNerSong();
       //保存每首歌曲的id
       let list=[];
       console.log(res);
       if (res.code!==200){
            this.$message.error('推荐新歌曲获取失败！');
       }else {
       res.result.map(item=>{
         list.push(item.id);
         });
       this.getSongDetail(list);
       }
     },
      //获取歌曲列表
     async getSongDetail(sliceArr){
      // 时间戳
      // let timetamp=new Date().valueOf();
       //数组转换为字符串
        sliceArr=sliceArr.join(',');
       // console.log(sliceArr);
      let {data:res} = await this.$api.getSongDetail(sliceArr);
       // console.log(res.songs);
       //封装一个方法筛选
       this.song=this.normalizeSongs(res.songs);
       console.log(this.song);
     },
     //歌曲的数据做一层筛选
      normalizeSongs(list){
        // console.log(list)
        let ret = [];
        list.map((item)=>{
          //利用id每个进行判断，是id，就做歌曲处理
          if (item.id){
            //数据处理
            console.log(item)
            ret.push(createSong(item));
          }
        })
        // console.log(ret)
        return ret;
      },

    }
  }
</script>

<style scoped>

</style>