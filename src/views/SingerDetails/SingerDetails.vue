<template>
<!--  歌手详情-->
  <div class="singer-detail">
      <div class="singer-info">
          <div class="msk">
             <div class="avatar">
               <img :src="singerInfo.picUrl" alt="">
             </div>
            <div class="name">
              <h2>
                {{singerInfo.name}}
              </h2>
            </div>
            <div class="guanzhu" :class="{active:isshow}" @click="followMe">
                关注他++
            </div>
            <!--歌手详情-->
            <div class="des" >
               {{singerInfo.briefDesc}}
            </div>
            <p class="all" @click="dialogVisible=true"> 全部>> </p>
           <div class="info">
              <div class="num">
                <span>单曲数</span>
                <span>{{singerInfo.musicSize}}</span>
              </div>
             <div class="num">
               <span>专辑数</span>
               <span>{{singerInfo.albumSize}}</span>
             </div>
             <div class="num">
               <span>mv数</span>
               <span>{{singerInfo.mvSize}}</span>
             </div>
           </div>
          </div>
      </div>
    <!--导航栏-->
    <div class="navigation">
      <ul>
        <Li v-for="(item,index) in MyNavigation" :key="item.id"
        :class="{active:index === curryindex}"
            @click="activeClick(index,item.label)"
        >{{item.label}}
        </Li>
      </ul>
    </div>
    <router-view class="router-two-page"></router-view>
    <!--弹出框-->
    <el-dialog
            :title="singerInfo.name"
            :visible.sync="dialogVisible"
            width="30%">
      <span>{{singerInfo.briefDesc}}</span>
      <span slot="footer" class="dialog-footer">
<!--    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "SingerDetails",
    data(){
      return{
        curryindex:0,
        dialogVisible:false,
        isshow:false,
        //歌手信息
        singerInfo:[],
        MyNavigation:[
          {label:"单曲",id:'1',path:'SingerDetailSings'},
          {label:"专辑",id:'2',path:"Singeralbum"},
          {label:"MV",id:'3',path:"SingerMV"},
          {label:"歌手详情",id:'4',path:"Singerdetails"},
          {label:"相似歌手",id:'5',path:"Similarsingers"},
        ]
      }
    },
    methods:{
      activeClick(index,babel){
        this.curryindex=index;
        if(babel==="单曲"){
          console.log(this.MyNavigation[index].path);
           this.$router.push(`/singer-detail/${this.$route.params.id}/${this.MyNavigation[index].path}`)
        }else if(babel==="专辑"){
          this.$router.push(`/singer-detail/${this.$route.params.id}/${this.MyNavigation[index].path}`)
        }else if (babel==="MV"){
          this.$router.push(`/singer-detail/${this.$route.params.id}/${this.MyNavigation[index].path}`)
        }else if(babel==="歌手详情"){
          this.$router.push(`/singer-detail/${this.$route.params.id}/${this.MyNavigation[index].path}`)
        }else if (babel==="相似歌手"){
          this.$router.push(`/singer-detail/${this.$route.params.id}/${this.MyNavigation[index].path}`)
        }
        console.log(babel);
        },

      async getSingerSing(){
      let res= await this.$api.getSingerSing(this.$route.params.id);
       if (res.status === 200){
         this.singerInfo = res.data.artist
         console.log(res);
       }
      },
      followMe(){
        this.isshow=!this.isshow;
        this.$message.error('对不起,此功能因时间原因,暂未开发后期进行功能完善!!');
      },
    },
    created() {
      //获取歌手信息
      this.getSingerSing()
    }
  }
</script>

<style lang="stylus" scoped>
  .singer-detail{
    .singer-info{
      height 360px;
      background-color: red;
      background:url("../../assets/images/top-bg.jpg") no-repeat center;
      background-size: 100%;
    .msk{
         width 100%;
         height: 100%;
         display flex;
         flex-direction column;
         align-items center;
         //设置主轴为y轴，沿着y轴排序
         justify-content center
         background: url("../../assets/images/arrow-lr.png") no-repeat bottom rgba(0,0,0, .6);
    .avatar{
          margin-bottom 14px;
         height:100px;
         width: 100px;
         border-radius :100%;
      img{
           width 100%;
           height: 100%;
           border-radius :100%;
         }
       }
      .name{
          margin-bottom 12px;
          h2{
            font-size 15px;
          }
      }
      .guanzhu{
         padding:4px 8px;
         font-size:12px;
         margin-bottom: 12px;
         /*background-color: red*/
         border: 1px #2#333333 solid;
         border-radius 50px;
         cursor pointer;
        .active{
          background-color:#fa2800;
          color #fffdef
        }
      }
      .des{
        width 700px;
        height 32px;
        line-height :16px;
        font-size 15px;
        text-align center;
        overflow:hidden;
        text-overflow ellipsis;
        max-height: 50px;
        white-space:normal;
        display:-webkit-box;
        -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
        -webkit-line-clamp:2; //显示的行
      }
      .all{
        color:#fa2800;
        cursor:pointer;
        font-size:13px;
        margin-bottom 15px;
        margin-left 616px;
        margin-top -2px;
      }
      .info{
        display:flex;
      .num{
        display:flex;
        //改变主轴
        flex-direction:column;
        align-items center
        margin -9px 19px;
        span:lastchild{
           font-size :14px;
        }
      }
      }
       }

    }
  }
  .navigation{
    ul{
      justify-content center;
      display:flex;
      margin 20px 0 ;
      li{
        font-size 15px;
        cursor:pointer;
        list-style:none;
        display flex;
        flex-direction column;
        padding 5px 50px;
      }
    }
    .active{
      color: #FA2800;
    }
  }
  .router-two-page{
   margin 1px 5px
  }
</style>