<template>
<!--点击按钮弹出播放歌曲框-->
   <div class="play-bar ">
       <div class="centent">
         <div class="avatar">
           <el-image class="img" :src="currentSong.picUrl || currentSong.image"></el-image>
         </div>
         <div class="info">
           <h5>{{currentSong.song || currentSong.name }}</h5>
           <p>{{currentSong.singer}}</p>
         </div>
         <div class="controller">
           <i class="iconfont curson el-icon-d-arrow-left" @click="playPrevSong"></i>
<!--           暂停-->
           <i class="iconfont curson el-icon-video-pause " v-show="isplay" @click="startPlay"></i>
<!--播放按钮 el-icon-video-play-->
           <i class="iconfont curson el-icon-video-play"  v-show="!isplay" @click="pausePlay"></i>
           <i class="iconfont curson el-icon-d-arrow-right" @click="playNextSong"></i>
         </div>
         <div class="play-progress" @mousedown="isSetProgress=true" @mouseup="isSetProgress=false" >
           <!--先转换成秒，后再转换为00:00-->
             <span class="curry-time">{{utils.formatSecondTimes(currentTime)}}</span>
<!--           音频进度-->
           <el-slider class="el-slider" :show-tooltip="false" :format-tooltip="formatTooltip" v-model="progress"
                      @change="setProgress"
           ></el-slider>
           <span class="total-time">{{utils.formatSecondTimes(utils.formatSecond(currentSong.transitionTime||currentSong.duration))}}</span>
         </div>
         <div class="volnum-control">
              <i :class="isMutedIcon" @click="mutedClick"></i>
              <el-slider class="el-slider-two" v-model="volumeSlider" @change="setVolume(volumeSlider)"></el-slider>
         </div>
         <div class="icon-button">
<!--           顺序播放-->
           <i class="iconfont iconnicheng" :class="{'active-icon': playmode==='orderPlay'}"
              @click="orderPlay"></i>
           <i class="iconfont iconcloud-circulation" :class="{'active-icon': playmode ==='oneLoop'}"
               @click="oneLoop"></i>
           <i class="iconfont iconjiantouyou" :class="{'active-icon': playmode==='randomPlay'}"
               @click ="randomPlay"></i>
                <i class="iconfont icongeci" @click="openLyric"></i>
                <i class="iconfont iconyuzhong" @click="openPlayRecord" ></i>
         </div>
<!-- 播放音频对象-->
         <audio
           :src="playUrl"
           :muted="ismuted"
           ref="audio"
           @timeupdate="timeupdate"
           @ended="ended"
           @error="error"
         ></audio>
<!--歌词-->
         <div name="fade">
           <div class="lyric" v-show="isOpenLyic">
             <h2 >歌词</h2>
             <scroll :key="3" ref="lyricList">
               <div v-if="lyrics">暂无歌词, 请欣赏歌曲</div>
               <div v-if="!lyrics && currentLyric">
                 <div class="lyric-wrapper">
                   <p ref="lyricLine" v-for="(item, index) in currentLyric.lines"  :key="index">
                     {{item.txt}}
                   </p>
                 </div>
               </div>
             </scroll>
           </div>
         </div>
          <div>
            <div class="play-list" v-show="isOpenPlayRecord">
              <h2>播放记录
            <!--删除全部-->
<!--                 <i class="iconfont iconlajitong" @click="deleteAll"></i>-->
              </h2>
              <div class="play-list-table">
                <table>
                  <thead></thead>
                  <tbody>
                  <tr v-for="(item,index) in playRecord">
                      <td class="song">
                        {{item.name || item.song}}
                        <i class=" el-icon-circle-close" v-if="item.error" title="播放源错误"></i>
                      </td>
                    <td class="delete">
                      <i class="el-icon-circle-close" @click="removeItem(index)"></i>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
       </div>
</div>

</template>

<script>
  import { mapGetters, mapMutations,} from 'vuex'
  //导入歌词解析插件
  import Lyric from "lyric-parser"
  import Scroll from '../Scroll/Scroll'
  export default {
    name: "PlayBar",
    components:{
      Scroll
    },
    data(){
      return{
        audio:null,
      //  当前时长
        currentTime:0,
        //拖动进度条值
        progress:0,
        //是否人为设置进度条
        isSetProgress:false,
        //是否静音 默认是不静音
        ismuted:false,
        //音量
        volumeSlider:40,
        //记录歌词
        visible:false,
        //控制歌词的显示和隐藏
        isOpenLyic:false,
        //控制播放列表的显示与隐藏
        isOpenPlayRecord: false,
        //歌词对象
        currentLyric:null,
        //是否有歌词
        lyrics:false,
      }
    },
    //监听我们data中的数据变化
    watch:{
     // 监听歌曲变化改变我们的歌词
     currentSong(newsong){
        //歌词有就删除歌词
        if (this.currentLyric){
           this.currentLyric.stop();
          console.log(1);
        }
       this.getRequestlyrics(newsong.id);
       this.pause();
      },
      //监听歌曲变化存进我们的本地
      playRecord(ne,ol){
        // console.log(1);
        // console.log(ne);
        // console.log(ol);
        window.sessionStorage.setItem("playRecord", JSON.stringify(this.playRecord))
       this.play();
      }
    },
    filters:{
    },
    methods:{
      //顺序播放
      orderPlay(){
        this.setplayMode('oneLoop');
        console.log('顺序播放');
      },
      //随机播放
      oneLoop(){
         this.setplayMode('randomPlay');
         console.log('随机播放');
      },
      //循环播放
      randomPlay(){
        console.log('循环播放')
        this.setplayMode('orderPlay');
      },
      //播放的音频已结束 执行此函数
      ended(){
        console.log(1);
       //判断当前播放模式
       if (this.playmode==='orderPlay'){
         console.log(1);
       //播放下一首歌
         this.playNextSong();
         setTimeout(()=>{
            this.audio.play();
         },20)
       }else  if (this.playmode==='oneLoop'){
             //当前正在播放的歌曲存进state里面
             this.setCurrentSong(this.currentSong)
            setTimeout(()=>{
              this.audio.play();
         })
       //  处理歌词重复展示
       }else if (this.playmode==='randomPlay'){
          //随机播放  随机数 * 数组长度
         console.log(Math.random() *this.playList.length)
          //随机数添加当前播放对象
          this.setCurrentSong(this.playList[parseInt(Math.random() * this.playList.length)])
         setTimeout(()=>{
           this.audio.play();
         })
       }
      },
      //播放音频错误
      error(){
         this.$message.error('不好意思,正在播放的音频好像有点错误!');
      },
      //打开歌词
      openLyric(){
        console.log(1);
        this.isOpenLyic=!this.isOpenLyic;
        this.isOpenPlayRecord=false;
      },
      //删除全部播放记录
      deleteAll(){
        this.$store.commit('deleteAll');
      },
      //打开历史播放
      openPlayRecord(){
        this.isOpenPlayRecord=!this.isOpenPlayRecord;
      },
      //点击显示显示静音按钮
      mutedClick(){
          if(this.ismuted){
             //关闭静音 audio
             this.ismuted=false;
            this.audio.muted=false;
          }else {
            //打开静音
            this.ismuted=true;
            this.audio.muted=true;
          }
      },
      //监听音频的播放时间
      timeupdate(e){
        //播放监听音频
        if (!this.isSetProgress) {
          console.log(1);
          this.currentTime = e.target.currentTime;
          this.progress = (100 * e.target.currentTime) / (this.currentSong.duration / 1000 || this.currentSong.transitionTime / 1000)
           // || (100 * e.target.currentTime) / (this.currentSong.transitionTime /1000)
          console.log(this.progress);
        }
        },
      //点击切换上一首
      playPrevSong(){
        console.log('上一首');
        this.progress=0;
        //利用mutation判断播放上一条数据
        this.setPlayPrevSongs();
        this.isplaymutation(true);
        //添加进播放记录并且去重
        this.addPlasyrecord();
        setTimeout(()=>{
          this.audio.play();
        },20)
      },
     //暂停
      startPlay(){
        console.log("暂停");
        this.isplaymutation(!this.isplay);
        this.pause();
      },
      //调节音频进度
      setProgress(percent){
        console.log(percent)
        //手动调节
        this.isSetProgress=true;
        //计算音频的位
        this.$refs.audio.currentTime=(percent / 100) * (this.currentSong.duration/ 1000)
        || (percent / 100) * ( this.currentSong.transitionTime / 1000)
        //拖拽完currentTime获得当前时长
        setTimeout(()=>{
          this.isSetProgress=false;
        },20)
        this.audio.play();
        //设置播放图标
        this.isplaymutation(true);
      },
      //播放
      pausePlay(){
        // this.$refs.audio.pause();
        console.log('播放');
        this.isplaymutation(!this.isPlay);
        this.audio.play();
      },
      //播放下一首歌曲
      playNextSong(){
        console.log("切换下一首");
        this.progress=0;
        this.setPlaynextSong();
        this.isplaymutation(true);
        this.addPlasyrecord();
        setTimeout(()=>{
          this.audio.play();
        },20)
      },
      //点击删除历史记录
      removeItem(index){
        this.$store.commit('removehistory',index);
      },
      //  格式化slider
      formatTooltip(val) {
        let time = this.currentSong.duration / 1000 * val / 100
        let m = parseInt(time / 60)
        let s = parseInt(time % 60)
        if (s < 10) {
          s = "0" + s
        }
        if (m < 10) {
          m = "0" + m
        }
        return m + ":" + s
      },
      //初始化插件
       initLyric(lyric){
         this.currentLyric = new Lyric(lyric, this.lyricHandle);
         console.log(1);
       },
      //请求我们的歌词
       async getRequestlyrics(currentSongId){
       let res= await this.$api.getRequestlyricsapi(currentSongId);
         console.log(res);
       if (res.status!==200){
         this.$message.error('歌词获取资源错误');
       }else {
          if(res.data.nolyric){
            this.nolyric=true;
            return
          }
          let lyric=res.data.lrc.lyric;
          this.initLyric(lyric);
         console.log(lyric);
         console.log(this.currentLyric);
       }
       },
      lyricHandle({ lineNum, txt }){
      },
    //改变音量
      setVolume(volumeSlider){
        console.log(volumeSlider)
        //0.4
        if (this.$refs.audio) {
          this.$refs.audio.volume = volumeSlider / 100
          this.audio.play();
          this.isplaymutation(true);
        }
        console.log(this.$refs.audio.volume);
      },
      ...mapMutations([
          'setplayMode',
          'isplaymutation',
          'setPlayPrevSongs',
          'setPlaynextSong',
          'setCurrentSong',
          'getaudio',
          'deleteAll',
          'pause',
          'play',
          'addPlasyrecord'
      ])
    },
    created() {
     this.getRequestlyrics(this.currentSong.id);
    },
    computed:{
      //是否显示静音图标和不静音图标
      isMutedIcon(){
        return this.ismuted ? "el-icon-message-solid" : "el-icon-close-notification"
      },
      //设置音频的url
      playUrl(){
         return`https://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`
      },
      ...mapGetters([
          'currentSong',
          'isplay',
          'playmode',
          'playRecord',
          'navbarsong',
          'playList',
      ])
    },
    mounted() {
      this.audio= this.$refs.audio
      this.getaudio(this.$refs.audio);
    }
  }
</script>

<style lang="stylus" scoped>
  i {
    cursor pointer;
  }
    .play-bar {
      width: 100%;
      height 72px;
      position fixed;
      bottom: 0;
      right: 0;
      left: 0;
      z-index 999;
      background-color: #fff;
      justify-content space-between;

      .centent {
        width 1154px;
        margin 0 auto;
        display flex;
        align-items center;
        height 75px;
        position relative;

        .avatar {
          width 65px;
          height 65px;
          margin 0 20px 0 -120px;
          flex 0 0 auto;
        }
      }

      .info {
        width 120px;

        h5 {
          padding-bottom 10px
          font-size 14px;
          color #333;
        }

        p {
          font-size 12px;
          color #333;
        }
      }

      .controller {
        width: 120px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;

        .iconfont {
          padding: 10px;
          font-size: 20px;
        }

        .iconbofang4, .iconbofang3 {
          font-size: 30px;
        }

        .curson {
          cursor pointer;
        }
      }

      .play-progress {
        display flex;
        align-items center;
        margin 0 40px;

        .el-slider {
          width: 280px
          margin 0 30px
        }
      }

      .volnum-control {
        display: flex;
        align-items: center;
        margin-left: 30px;

        i {
          font-size 20px;
          color red;
        }

        .el-slider-two {
          width: 130px;
          margin-left: 30px;
        }
      }

      .icon-button {
        padding 6px;
        font-size 20px;
        margin-left 130px;

        i {
          font-size 20px;
          padding 5px 7px
        }

        .iconjiantouyou, .iconcloud-circulation, .iconnicheng {
          display: none;
        }

        .active-icon {
          display: inline !important;
        }
      }
      .lyric,.play-list{
        position: absolute;
        bottom: 90px;
        right: 0;
        width: 400px;
        height: 550px;
        box-shadow: 0 5px 40px rgba(2, 10, 18, .1);
        background-color: #fff;
        border-radius: 4px;
        z-index: 1000;
      }
      //歌词弹出框
      .lyric{
        padding: 20px 30px;
        h2{
          padding-bottom: 20px;
          background-color: #fff;
          text-align center;
        }
        .wrapper{
          height: 460px;
          overflow: auto;
          .content{
            width 200px;
            height: 200px
            div{
              width: 100%;
              p{
                color: #4a4a4a;
                font-size: 14px;
                font-weight: 300;
                line-height: 24px;
                margin: 5px 0;
                text-align: center;
              }
              .active-lyric-text{
                color: #FA2800;
                font-size: 18px;
              }
            }
          }
        }
      }
    .play-list {
      /*padding 20px;*/
      overflow hidden
      h2 {
        padding 9px 10px 18px 20px;
        text-align center;
      }

      i {
        float right;
        margin-right 12px
        font-size 20px;
      }

      & i:hover {
        color: #FA2800;
      }

      .play-list-table {
        height 100%;
        padding-bottom 20px;
        /*width 100%;*/
        margin-left: 25px;
        table {
          margin-top 10px;
          td {
            width: 97px;
            height: 40px;
          }
          th{
            border none;
          }
        }
        .song {
          padding-left 10px;
          width: 70%;
          overflow hidden;
        }

        .delete {
          width: 96px;
          text-align center;

          i {
            font-size 14px;
            font-weight 400;
          }
        }
      }

    }
    }
</style>