<template>
<!--歌单下拉栏-->
  <div class="tag-bar ">
  <div class="category-container">
     <div class="main-click" @click="showMask">
       <span class="main-tag">{{quanbu}}
       <i class="el-icon-caret-right" v-show="!isShowright" ></i>
       <i class="el-icon-caret-bottom" v-show="isShowright" ></i>
       </span>
     </div>
       <div class="hot-tags">热门标签:</div>
    <ul>
         <li v-for="(item,index) in hotTags" :key="item.id">
           <a href="javascript:;" :class="{'active-class':(index===curryindex)}"
              @click="ClickhotTagsindex(index,item)">
             {{item.name}}
           </a>
         </li>
       </ul>
    <div class="hot">
     <span @click="chooseType('hot')" :class="{'activeone':songSheetParams.order==='hot'}">热门</span>
     <span @click="chooseType('new')" :class="{'activeone':songSheetParams.order==='new'}">最新</span>
    </div>
  </div>
    <!--弹窗区域-->
    <transition>
      <div class="mask " v-show="isshowMask">
        <div class="groups" v-for="group in categoryType" :key="group.key">
          <h2>
            <a href="javascript:;">
              <span>{{group.value}}</span>
            </a>
          </h2>
          <ul>
            <li v-for="tag in group.tags" @click="transitionClick(tag.name)">
              <a href="#">{{tag.name}}</a>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    </div>
</template>

<script>
  export default {
    name: "index",
    props:{
      hotTags:{
        type:Array,
        default:[],
      },
      songSheetParams:{
        type:Object,
      },
      categoryType:{
        type:Array,
        default: {
          return:[]
        }
      },
      quanbu:{
        type:String,
        default:''
      }
    },
    data(){
      return{
        //状态
        curryindex:0,
        //按钮向下
        isShowright:false,
        //点击下拉栏显示，默认是false
        isshowMask:false,
      }
    },
    methods:{
      showMask(){
       this.isShowright=!this.isShowright;
       this.isshowMask=!this.isshowMask;
      },
      chooseType(type){
       this.$emit('chooseType', type);
      },
      ClickhotTagsindex(index,item){
        this.curryindex=index;
        // console.log(item);
        this.$emit('ClickhotTagsindex',item);
      },
      transitionClick(tag){
        this.$emit('transitionClick',tag);
        this.isshowMask=false;
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .active-class{
    color:red;
  }
    .tag-bar{
      margin-top -55px;
  .category-container{
    display: flex;
    background-color: #fff;
    box-shadow: 0 5px 40px rgba(2, 10, 18, 0.1);
    margin: 0 20px 20px;
    .main-click{
      padding: 11px 15px;
      background-color: #FA2800;
      border-radius:5px;
      color: #fff;
      cursor: pointer;
      i{
        margin-left: 6px;
      }
      .main-tag{
        font-size 13px;
        overflow hidden;
      }
    }
    .hot-tags{
      padding: 0 15px;
      display: flex;
      align-items: center;
    }
    ul{
      flex: 1;
      li{
        float: left;
        margin-right: 20px;
        height: 100%;
        display: flex;
        align-items: center;
        a:hover{
          color: #FA2800;
        }
      }
    }
    .hot{
      display: flex;
      align-items: center;
      span{
        padding: 6px 10px;
        background-color: #F7F7F7;
        margin-right: 20px;
        border-radius: 4px;
        font-size: 12px;
        color: #000;
        cursor: pointer;
      }
      .activeone{
        background-color: #FA2800;
        color: #fff;
      }
    }
  }
  .mask{
    width: 720px;
    margin: -12px 0 0 15px;
    background-color: #fff;
    box-shadow: 0 5px 40px rgba(2, 10, 18, .1);
    border-radius: 4px;
    z-index: 10;
    position:absolute;
    overflow: auto;
    padding-bottom: 40px;
    display: flex;
    flex-wrap: wrap;
    .groups {
      h2 {
        font-size 15px;

        i {
          margin-right: 6px;
        }
      }

      ul {
        padding: 0 10px;
        display: flex;
        flex-wrap: wrap;

        li {
          list-style none
          padding: 8px 15px;
          border-radius: 50px;
          margin: 8px 0 0 10px;
          color: #161e27;
          font-size: 12px;
          background-color: #F7F7F7;
        }

        li:hover {
          background-color: #FA2800;

          a {
            color: #fff;
          }
        }
      }
    }

    }
  }
  .link-active a{
    color: #FA2800;
  }
</style>