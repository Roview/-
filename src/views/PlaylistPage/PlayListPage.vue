<template>
<!--推荐歌单页面-->
<div class=" play-list-detail">
  <div class="left-container">
    <!--歌单详情页-->
    <play-list-details :value="description"
                       :title="playlistitem.name"
                       :playlistitem="playlistitem">
    </play-list-details>
<!--歌单详情页-->
    <play-list-item :playListTable="playListTable"></play-list-item>
  </div>
  <div class="right-container">
    <sub-scr-ibers :subscribers="subscribers"></sub-scr-ibers>
    <related-suggestion :playListRecommend="playListRecommend"></related-suggestion>
    <commit :hotComments="hotComments" :common="common"></commit>
  </div>
</div>
</template>

<script>
  import PlayListDetails from "./PlatlistPageChild/Playlistdetails";
  import PlayListItem from "./PlatlistPageChild/playlistitem";
  import SubScrIbers from "./PlatlistPageChild/SubScrIbers";
  import RelatedSuggestion from "./PlatlistPageChild/RelatedSuggestion";
  import Commit from "./PlatlistPageChild/Commit";
  import {mapMutations} from 'vuex'
  export default {
    name: "PlayListPage",
    components:{
      PlayListDetails,PlayListItem,SubScrIbers,RelatedSuggestion,Commit
    },
    data(){
      return{
        //点击展开全部按钮的数据
        description:'',
        //顶部数据
        playlistitem:{},
        //歌单列表
        playListTable:[],
        //获取收藏歌单的用户
        subscribers:[],
        //歌单推荐数组
        playListRecommend:[],
        //热门评论
        hotComments:[],
        // 普通评论
        common:[],
      }
    },
       //请求数据
      created() {
         //获取歌单详情
         this._getPlayListDetail();
         //获取收藏歌单的人
        this.getSubScribersPlayList();
         //获取歌单推荐
         this.getPlayListRecommend();
         //获取歌单热门推荐
        this.getPlayListComment();
         },
      methods: {
        async _getPlayListDetail() {
          //携带参数去请求
          let params = {
            id: this.$route.params.id,
            // s:200,
            // timestamp:new Date().valueOf()
          }
          console.log(this.$route.params.id);
          let res = await this.$api.getPlayListDetail(params);
          console.log(res);
          if (res.status !== 200) {
            this.$message.error('歌单错误，请查看您的网络!');
          } else {
            //歌单详细页分行
            this.description = res.data.playlist.description;
            this.playlistitem = res.data.playlist;
              res.data.playlist.tracks.forEach(item => {
                this.handlePlayList(item);
              })
            //保存
            this.setplayList(this.playListTable);
          }
          console.log(res);
          console.log(this.playListTable);
        },
        async getSubScribersPlayList() {
          let params = {
            id: this.$route.params.id,
            limit: 30,
            offset: 0,
          }
          let res = await this.$api.getSubScribersPlayList(params);
          if (res.status !== 200) {
            this.$message.error('获取收藏此歌单用户失败!');
          } else {
            this.subscribers = res.data.subscribers
          }
        },
        async getPlayListRecommend() {
          let res = await this.$api.getPlayListRecommend(this.$route.params.id);
          console.log(res);
          if (res.status !== 200) {
            this.$message.error('获取歌单推荐失败!');
          } else {
            this.playListRecommend = res.data.playlists;
            console.log(this.playListRecommend);
          }
        },
        async getPlayListComment() {
          let params = {
            id: this.$route.params.id,
            limit: 20,
          }
          let res = await this.$api.getPlayListComment(params);
          if (res.data.status !== 200) {
            this.$message.error('获取评论失败');
          }
            // console.log(res);
            this.hotComments = res.data.hotComments;
            this.common = res.data.comments;
            // console.log(this.hotComments);
            // console.log(this.common);
        },
        //处理数据
        handlePlayList(item) {
          let obj = {};
          obj.id = item.id;
          obj.song = item.name;
          obj.singer = item.ar.map(singer => singer.name).join("/");
          obj.album = item.al.name;
          obj.picUrl = item.al.picUrl;
          obj.transitionTime = item.dt;
          obj.error = false;
          this.playListTable.push(obj);
        },
        ...mapMutations([
             'setplayList',
            'play'
        ]),
      },
    mounted() {
      this.setplayList(this.playListTable);
      this.play();
    }
  }
</script>

<style lang="stylus" scoped>
  .play-list-detail {
    min-width 1230px;
    display flex;
    align-items: flex-start;
    .left-container {
      flex 1;
      width: 72%;
      background-color: #eeeeee;
      padding 20px 15px 20px 20px;
      box-shadow 0 5px 40px rgba(1,10,18,.1);
      border-radius  10px;
    }
    .right-container{
      flex: 0 0 auto;
      width: 350px;
    }


  }
</style>