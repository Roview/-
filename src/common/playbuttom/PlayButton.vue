<template>
  <div class="index-container flex-center">
    <span class="num" ref="num">{{utils.formatZero( index + 1 ,2)}}</span>
    <i class="iconfont nicebofang2 play-btn"
       @click="playsong(item)"
    ></i>
  </div>

</template>

<script>
  import {mapGetters, mapMutations} from "vuex"
  export default {
    name: "PlayButton",
    props: {
      playList: {
        type: Array,
        default() {
          return []
        }
      },
      item: {
        type: Object,
        default:{},
      },
      index: {
        type: Number,
        default: 0
      },
    },
    computed: {
      ...mapGetters([
        'currentSong',
        'navbarsong',
        'audio'
      ])
    },
    watch:{
      currentSong(){
         this.play();
      }
    },
    methods: {
      // 开始播放
      playsong(item) {
        console.log(item);
        this.setplayList(this.playList);
        this.isplaymutation(false);
        this.setCurrentSong(item);
        setTimeout(()=>{
          this.isplaymutation(true);
          this.play();
          this.addPlasyrecord();
        },20)
        console.log(this.currentSong);
      },
      pausePlay(){
        this.isPlayMutation(true)
      },
      ...mapMutations([
        'setCurrentSong',
        'setnavbarsong',
        'play',
        'addPlasyrecord',
        'isplaymutation',
        'setplayList',
        'pause',
        'addPlasyrecord',
      ])
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../assets/css/iconfont.css"
  .index-container{
    .num {
      font-size 15px;
      color: #999999,
    }
    .play-btn {
      color: $color-theme;
      font-size: 24px;
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
    &:hover {
      .num {
        display none;
      }

      .play-btn {
        display: block ;
        color red;
      }
    }
  }
  .playing {
    .num {
      display none;
    }
    .pause-btn {
      display block;
    }
  }
</style>
