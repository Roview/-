<template>
<!--layoyt布局-->
  <div>
    <el-container>
<!--顶部导航栏-->
      <el-header class="VersionHeart  bgc ab">
        <div class="ddd">
          <el-menu :default-active="activeIndex()"  mode="horizontal" class="eee" router>
            <el-menu-item  @click="HomeClick" >
              <img class="img" src="../../assets/images/logo_black.png" alt="">
            </el-menu-item>
            <el-menu-item index="find" class="qqq" @click="find" >发现音乐</el-menu-item>
            <el-menu-item index="Ranking" class="qqq" @click="Ranking">排行榜</el-menu-item>
            <el-menu-item index="sonelist" class="qqq" @click="sonelist">歌单</el-menu-item>
            <el-menu-item index="singer" class="qqq" @click="singer" >歌手</el-menu-item>
            <el-menu-item index="video" class="qqq">视频</el-menu-item>
            <el-menu-item index="MV" class="qqq" >mv</el-menu-item>
            <el-menu-item >
              <el-link class="el-icon-search" type="primary" @click="dialogVisible = true"></el-link>
            </el-menu-item>
          </el-menu>
        </div>
      </el-header>
<!--主体内容-->
      <el-main class="main ">
          <router-view></router-view>
        <play-bar v-if="Object.keys(currentSong).length !== 0"></play-bar>
        <bottom-bar/>
      </el-main>
    </el-container>

      <el-dialog
              title="请输入你要搜索的内容"
              :visible.sync="dialogVisible"
              width="30%">
      <span>
          <div style="margin-top:15px;">
          <el-input placeholder="请输入内容"  v-model="input3" class="input-with-select" @input="ccc">
          <el-button slot="append" icon="el-icon-search" @click="searchinput()"></el-button></el-input>
</div>
      </span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">确 定</el-button>
  </span></el-dialog>
  </div>
</template>
<script>

  import {mapGetters} from 'vuex'
  import PlayBar from "../../common/PlayBar/PlayBar";
  import BottomBar from "../../views/bottombar/BottomBar";
  import Search from "../../views/SearchChild/Search";
  export default {
    name: "HomePage",
    components: {Search, PlayBar,BottomBar},
    data(){
      return{
        input3:'',
        navList:[
          { label: "单曲", id: 1, path: "songs", type: 1 },
          { label: "专辑", id: 2, path: "album", type: 10 },
          { label: "歌手", id: 3, path: "sings", type: 100 },
          { label: "歌单", id: 4, path: "play-list", type: 1000 },
          { label: "MV", id: 8, path: "mv", type: 1004 },
        ],
        //保存搜索后得数据
        searchData:[],
        dialogVisible:false,
      }
    },
    computed:{
      ...mapGetters([
        'currentSong'
      ])
    },
    methods: {
      //监听input值改变
      ccc(){
        console.log(1);
      },
      //点击搜索
      searchinput(){
        this.searchSongs();
        //  携带数据跳转
        this.$router.push(`/search/${this.input3}`);
        // this.$router.go(0);
        this.dialogVisible=false;
        //非父子组件传值
        this.bus.$emit("searchdate",this.input3);
      },
        async searchSongs(){
          let params = {
            keywords:this.input3,
            limit: 30,
          }
       let res= await this.$api.searchSongs(params);
          if (res.status===200){
            res.data.result.songs.map(item=>{
              let obj={};
              obj.id=item.id;
              obj.song=item.name;
              obj.song = item.name;
              if (item.al) {
                obj.picUrl = item.al.picUrl
              }
              obj.singer = item.ar.map(it => it.name).join("/");
              obj.album = item.al.name;
              obj.transitionTime = item.dt;
              this.searchData.push(obj);
              // console.log( this.searchData);
            })
          }
       },
      //判断导航栏默认选中
      activeIndex() {
        if (this.$route.path.includes('/find')) {
          return 'find';
        }else if(this.$route.path.includes('/Ranking')){
           return 'Ranking'
        }else if (this.$route.path.includes('/sonelist')){
           return  'sonelist';
        }else if (this.$route.path.includes('/singer')){
          return  'singer';
        }else if (this.$route.path.includes('/video')){
           return 'video';
        }else  if(this.$route.path.includes('/MV')){
          return 'MV';
        }
    },
      find(){
         this.$router.push('/find');
      },
      Ranking(){
        this.$router.push('/Ranking');
      },
      sonelist(){
        this.$router.push('/sonelist');
      },
      singer(){
        this.$router.push('/singer');
      },
      //点击首页图片
      HomeClick(){
        // this.$router.beforeEach((to, from, next) => {
        //   if(to.path==='/finds'){
        //      return '';
        //   }else {
        //     console.log(this.$route.path);
        this.$router.push('/find').catch(err=>{console.log(err)});
        // }
        // })
      }
      },
    }

</script>

<style scoped>
  *{
    padding: 0;
  }
  .main{
    width: 1408px;
    margin: 0 auto;
    /*padding: 0;*/
    /*width: 100%;*/
    margin-top: 55px;
    /*width: 1380px;*/
  }
  .bgc{
    background-color: #fff;
    box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.4);
    z-index: 99;
  }
.eee{
  position: absolute;
  left: 8%;
  border-bottom: none!important;
}
.qqq{
  padding: 0 47px!important;
}
.img{
  padding-bottom: 6px;
}
  .ab{
   height: 0!important;
  }
  .ddd{
    position: fixed;
    top:0;
    width: 1380px;
    height: 60px;
    background-color: #fff;
    margin-left: -20px;
    box-shadow: 1px 1px 20px 0px rgba(0, 0, 0, 0.4);
  }
  .borderbottom{
    border: none;
  }
  .search{
    height: 200px;
    width: 200px;
    background-color: white;
    margin: 0 auto;
  }
  .sss{
    display: none;
  }
</style>