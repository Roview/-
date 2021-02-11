import Vue from 'vue'
import VueRouter from 'vue-router'
const Home=()=>import('../views/home/Home');
// import Home from "../views/home/Home";
const PlayListPage=()=>import('../views/PlaylistPage/PlayListPage');
// import PlayListPage from "../views/PlaylistPage/PlayListPage";
const Leaderboard=()=>import('../views/Leaderboard/Leaderboard');
// import Leaderboard from "../views/Leaderboard/Leaderboard";
const PlayLisyIndex=()=>import('../views/playList/PlayLisyIndex');
// import PlayLisyIndex from "../views/playList/PlayLisyIndex";
const Singer=()=>import('../views/Singer/Singer.vue')
// import Singer from "../views/Singer/Singer.vue";
const SingerDetails=()=>import('../views/SingerDetails/SingerDetails');
// import SingerDetails from "../views/SingerDetails/SingerDetails";
const SingerDetailSings=()=>import('../views/SingerDetails/SingDetailChild/SingerDetailSings')
// import SingerDetailSings from "../views/SingerDetails/SingDetailChild/SingerDetailSings";
const Singeralbum=()=>import('../views/SingerDetails/SingDetailChild/Singeralbum');
// import Singeralbum from "../views/SingerDetails/SingDetailChild/Singeralbum";
const SingerMV=()=>import('../views/SingerDetails/SingDetailChild/SingerMV')
// import SingerMV from "../views/SingerDetails/SingDetailChild/SingerMV";
const Singerdetails=()=>import('../views/SingerDetails/SingDetailChild/Singerdetails')
// import Singerdetails from "../views/SingerDetails/SingDetailChild/Singerdetails";
const Similarsingers=()=>import('../views/SingerDetails/SingDetailChild/Similarsingers');
// import SearchSongs from "../views/SearchChild/SearchSongs";
const Search=()=>import('../views/SearchChild/Search')
// import Search from "../views/SearchChild/Search";
Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/find',
  },
  {
     path:'/find',
    component: Home,
  },
  {
    //携带id跳转
    path: '/PlayListPage/:id',
    component:PlayListPage
  },
  {
     path:'/Ranking',
     component:Leaderboard,
  },
  {
    path:'/sonelist',
    component: PlayLisyIndex,
  },
  {
    path:'/singer',
    component:Singer,
  },
  {
    path:'/singer-detail/:id',
    component:SingerDetails,
    children:[
      {path:'', redirect:'SingerDetailSings'},
      {path:'SingerDetailSings',component:SingerDetailSings},
      {path:'Singeralbum',component:Singeralbum},
      {path:'SingerMV',component:SingerMV},
      {path:'Singerdetails',component:Singerdetails},
      {path:'Similarsingers',component:Similarsingers},
    ]
  },
  {
    path: "/search/:keywords",
    component: Search,
    children: [
      // { path: 'songs', component: SearchSongs },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
