<template>
<!--获取推荐歌曲-->
  <div class="list item">
      <div class="item" v-for="(item,index) in songlist" :key="item.id"
      >
        <div class="wrapper flex-center shadow">
           <div class="index-container flex-center">
<!--首数字钱+0-->
             <span class="num">{{utils.formatZero( index + 1 ,2)}}</span>
             <div class="play-icon">
<!--               <div class="playing-transition" style="animation-delay: -1.2s;"></div>-->
<!--                           <div class="line"></div>-->
<!--                           <div class="line" style="animation-delay: -1.5s;"></div>-->
<!--                           <div class="line" style="animation-delay: -0.9s;"></div>-->
<!--                           <div class="line" style="animation-delay: -0.6s;"></div>-->
                         </div>
               <i class="iconfont nicebofang2 play-btn"
                 @click="playsong(item)"
               ></i>
             <i  class="iconfont  nicezanting1 pause-btn"
                     @click="pauseSong(item)"
             ></i>
             </div>
<!--          图片-->
          <div class="avatar">
            <el-image class="img" :src="item.image" lazy> </el-image>
          </div>
           <div class="info">
                <p class="name ellipsis">{{item.name}}</p>
                <p class="flex-row singer ellipsis">{{item.singer}}</p>
           </div>
             <span class="album">《{{item.album}}》</span>
          <p class="duration">
<!--              {{utils.formatSecondTimes(item.duration)}}-->
          {{utils.formatSecondTimes(utils.formatSecond(item.duration))}}
          </p>
           </div>
        </div>
      </div>

</template>

<script>
  import { mapGetters,mapMutations} from 'vuex'
  export default {
    name: "SoneMusic",
    data(){
      return{
        yyy:false
      }
    },
    props:{
      songlist:{
        type:Array,
        default:[]
      }
    },
    // computed:{
      // ...mapGetters([
      //     'currentSong',
      //     'navbarsong',
      //     'audio'
      // ])
    // },
    methods:{
      //点击播放歌曲
      playsong(item){
        console.log(item);
        console.log(this.songlist)
        this.setnavbarsong(this.navbarsong);
        // //将当前播放列表复制为全局播放列表
        this.setplayList(this.songlist);
        //控制暂停播放按钮的显示与隐藏
        this.setCurrentSong(item);
        //点击播放
        setTimeout(()=>{
             this.play();
          this.isplaymutation(true);
        },20)
      //添加历史记录
     this.addPlasyrecord();
        this.yyy=true;
      },
      // pauseSong(item){
      //   console.log(1);
      //      this.isplaymutation(false);
      // },
      ...mapMutations([
         'setplayList',
         'isplaymutation',
         'setCurrentSong',
         'setnavbarsong',
          'play',
         'addPlasyrecord'
      ])
    },
  }
</script>

<style lang="stylus" scoped>
  /*@import "../../assets/css/iconfont.css"*/
.list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
  margin-top 30px

  .item {
    flex 0 0 50%
    max-width 50%
    margin-bottom: 20px;
    height: 100px;
    padding: 0 15px 21px;
    margin-top: -12px

    .wrapper {
      height 100%;
      justify-content: start;
      padding: 0 4%;
      border-radius: 5px;

      .index-container {
        width 30px;
        margin-right: 20px;

        .num {
          font-size 15px;
          color: #999999,
        }

        .play-icon {
          display: none;
          height: 16px;
          min-width: 18px;
          overflow: hidden;

          .line {
            width: 2px;
            height: 100%;
            margin-left: 2px;
            background-color: #ff410f;
            animation: play .9s linear infinite alternate;
          }
        }

        .play-btn {
          color: $color-theme;
          font-size: 28px;
          display: none;
          text-align: left;
          cursor: pointer;
        }


        .pause-btn {
          color: $color-theme;
          font-size: 30px;
          display: none;
          background-color: red
          text-align: left;
          cursor: pointer;
        }
      }

      .avatar {
        width: 55px;
        height 55px
        border-radius 5px;
        position relative;
        margin-right 30px;

        img {
          width: 100%;
          height: 100%;
        }

        .img {
          border-radius 5px;
        }
      }
    }

    .info {
      width 15%;

      .name {
        font-size 13px;
      }

      .singer {
        font-size 13px;
        padding 12px 2px 0 0;
      }
    }

    .album {
      font-size 14px;
      color #333333;
      /*font-weight 13px;*/
      margin-left: 80px;
      flex 1
    }

    .duration {
      font-size: 14px;
      color: #333333;
      font-weight: bold;
      margin-left: 80px;
    }

    &.playing {
      p {
        color: $color-theme;
      }

      i {
        color: $color-theme;
      }

      .num {
        display block;
      }
    }

    .play-btn {
      display: none;
    }

    /*&.playing{*/
    /*.num{*/
    /*display block;*/
    /*color red!important;*/
    //}
    //}

    .pause-btn {
      display none;
    }

    &:hover {
      .num {
        display none;
      }

      .play-btn {
        display: block !important;
        color red;
      }

    }
    .playing {
      .num {
        display none;
      }
      .play-btn {
        display: none !important;
        color yellow;
      }
      .pause-btn {
        display block !important;
      }
    }
  }
}
</style>