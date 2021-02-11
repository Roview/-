<template>
  <div class=" java">
    <play-list
        :quanbu="quanbu"
        :hotTags="hotTags"
        :songSheetParams="songSheetParams"
        :categoryType="categoryType"
        @ClickhotTagsindex="ClickhotTagsindex"
        @transitionClick="transitionClick"
        @chooseType="chooseType"
    ></play-list>
    <div class="java">
    <cloud-music-feature-list  :topList="songsheetlist"></cloud-music-feature-list>
    </div>
<!--
            @current-change="handleCurrentChange"
            :current-page="currentPage4"   -->
    <div class="bottom">
    <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-sizes="[50, 100, 150]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
  import PlayList from "./PlayListChild/PlayList";
  import CloudMusicFeatureList from "../Leaderboard/LeaderBoardChild/CloudMusicFeatureList";
  export default {
    name: "PlayLisyIndex",

    data(){
      return{
        quanbu:'全部',
        hotTags:[],
        //cat默认是全部 点击修改这个cat
        songSheetParams:{
          order:"hot",
          cat:"全部",
          limit:90,
          offset:0
        },
        songsheetlist:[],
        //总共有多少条数据
        total:0,
        categoryType:[
          {
            key:0,
            value:"语种",
            tags:null
          },
          {
            key:1,
            value:"风格",
            tags:null
          },
          {
            key:2,
            value:"场景",
            tags:null
          } ,
          {
            key:3,
            value:"情感",
            tags:null
          },
          {
            key:4,
            value:"主题",
            tags:null
          },
        ]
      }
    },
    components:{
      PlayList,CloudMusicFeatureList
    },
    methods:{
     //显示当前此页展示多少条数据
      handleSizeChange(num){
           this.songSheetParams.limit=num;
           this.getsongSheet();
      },
      handleCurrentChange(num){
         this.songSheetParams.offset=num;
        this.getsongSheet();
      },
     // 获取热门歌单分类
     async getHotSongSheet(){
       let res = await this.$api.getHotSongSheet();
       if ( res.status!==200){
           this.$message.error('请求li失败');
       }else {
         this.hotTags=res.data.tags;
       }
       console.log(res);
     },
      //请求热门数据
     async getsongSheet(){
       let res= await this.$api.getsongSheet(this.songSheetParams);
       if (res.status===200){
          this.songsheetlist=res.data.playlists;
          this.total=res.data.total;
         console.log(res.data.playlists)
       }
       console.log(res);
       },
      //获取全部歌单分类
       async getquanbusonglist(){
       let res=await this.$api.getquanbusonglist();
       if (res.status===200){
         console.log(1)
         this.cateGory(res.data.sub,5);
         console.log(this.categoryType.tags)
         console.log(2)
       }
         console.log(res.data.sub)
       },
      //全部歌单列表分类
      cateGory(sub,count){
         //根据数据中索引进行分类 循环5次
         for(let i=0;i<count;i++) {
             let itemArr=[];
             for(let j=0;j<sub.length;j++){
                //判断数据中的索引==我们循环的索引=添加进新的数组
                if(sub[j].category===i){
                   itemArr.push(sub[j]);
                  console.log(sub[j].category);
                }
             }
           this.categoryType[i].tags=itemArr;
           console.log(this.categoryType[i].tags)
         }
      },
      //点击每个li
      ClickhotTagsindex(item){
        console.log(item);
      //  点击请求songSheetParams
        this.songSheetParams.cat=item.name;
        console.log(item.name);
        this.getsongSheet();
      },
      //点击的是是热门还是最新，默认是热门
      chooseType(type){
       this.songSheetParams.order=type;
        console.log(type);
        this.getsongSheet();
      },
      //点击全部里面的li
      transitionClick(tag){
        console.log(tag);
        this.quanbu=tag;
        this.songSheetParams.cat=tag;
        this.getsongSheet();
      }
    },
    created() {
      //热门歌单分类
      this.getHotSongSheet();
      //获取歌单，默认全部
      this.getsongSheet();
      // 获取全部歌单分类
      this.getquanbusonglist();
    }
  }
</script>

<style scoped>
.java{
  margin-top: 60px;
  z-index: 999;
}
  .bottom{
    text-align: center;
    font-size: 50px;
  }
</style>