<template>
<!--  歌手-->
  <div class="singer">
<!--歌手界面-->
    <singerlist :singersearch="singerCategory" :activeIndex="activeIndex" @ClickLi="ClickLi"></singerlist>
<!-- 歌手界面-->
    <singer-list :singers="singers"></singer-list>
  </div>

</template>

<script>
  import Singerlist from "./SingChild/Singerlist";
 import SingerList from '../../components/Singer/SingerList.vue'
  export default {
    name: "Singer",
    components:{
      Singerlist,SingerList
    },
    data(){
      return{
        //数组type对象
        singerCategory:{
          type:[
            {value:-1,label:'全部'},
            {value:1,label:'男歌手'},
            {value:2,label:'女歌手'},
            {value:3,label:'乐队'},
          ],
          area:[
            {value:-1,label:'全部'},
            {value:7,label:'华语'},
            {value:96,label:'欧美'},
            {value:8,label:'日本'},
            {value:16,label:'韩国'},
            {value:0,label:'其他'}
          ],
          initial:[
            {value: -1, label: "热门"},
            {value: 'a', label: "A"},
            {value: 'b', label: "B"},
            {value: 'c', label: "C"},
            {value: 'd', label: "D"},
            {value: 'e', label: "E"},
            {value: 'f', label: "F"},
            {value: 'g', label: "G"},
            {value: 'h', label: "H"},
            {value: 'i', label: "I"},
            {value: 'j', label: "J"},
            {value: 'k', label: "K"},
            {value: 'l', label: "L"},
            {value: 'm', label: "M"},
            {value: 'n', label: "N"},
            {value: 'o', label: "O"},
            {value: 'p', label: "P"},
            {value: 'q', label: "Q"},
            {value: 'r', label: "R"},
            {value: 's', label: "S"},
            {value: 't', label: "T"},
            {value: 'u', label: "U"},
            {value: 'v', label: "V"},
            {value: 'w', label: "W"},
            {value: 'x', label: "X"},
            {value: 'y', label: "Y"},
            {value: 'z', label: "Z"},
          ]
        },
        //判断
        activeIndex:{
          type:0,
          area:0,
          //按首字母索引查找参数,
          initial:0
        },
        singerParams: {
          limit: 40,
          offset: 0,
          type: -1,
          area: -1,
          initial: -1,
        },
        //歌手信息
        singers:[],
      }
    },
    methods:{
    async SingerClassification(){
        //请求歌手分类数据
      let res=await this.$api.SingerClassification(this.singerParams);
      if (res.status === 200){
       this.singers=res.data.artists;
        console.log(this.singers);
      }
    },
      ClickLi(index,key){
        this.activeIndex[key]=index;
        this.singerParams[key] = this.singerCategory[key][index].value
        this.SingerClassification();
      }
    },
   created() {
       this.SingerClassification();
   }
  }
</script>

<style lang="stylus" scoped>
  .singers{
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    padding: 0 -15px 0;
  }
</style>