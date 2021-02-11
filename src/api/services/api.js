import instance from "./instance";
//获取轮播图的数据
 export  const  getBanner=()=>instance.get('/banner',{});
//获取推荐歌单  limit默认为30
export  const getNerSongs=(limit)=>instance.get(`/personalized?limit=${limit}`, {})
//获取推荐歌曲  接口默认10条数据
export const  getNerSong=()=>instance.get('/personalized/newsong')
//获取歌曲详情
export  const getSongDetail=(ids)=> instance.get(`/song/detail?ids=${ids}`,{} )
//获取热门歌手  取出数量 , 默认为 50 取3个数据渲染就行了
export  const gethotSinger=()=>instance.get(`/top/artists?offset=0&limit=30`,{})
//根据id获取歌词
export  const getRequestlyricsapi=(id)=> instance.get(`/lyric?id=${id}`);
//根据id获取推荐歌单数据
export const getPlayListDetail= params => instance.get(`/playlist/detail`,{params});
//获取歌单收藏志愿者
export  const getSubScribersPlayList=params=>instance.get('/playlist/subscribers',{params});
/**
 *携带id获取歌单推荐
 */
export  const getPlayListRecommend=id=>instance.get(`/related/playlist?id=${id}`,{})
//获取歌单热门推荐
export  const getPlayListComment=(params)=>instance.get(`/comment/playlist`,{params})
//获取云音乐特色榜数据
export  const cloudmusicfeaturelist=()=>instance.get(`/toplist`);
//获取热门歌单分类
export  const getHotSongSheet=()=>instance.get(`/playlist/hot`,{});
//携带参数去获取歌单
export const getsongSheet=(params)=>instance.get(`/top/playlist`,{params})
//获取全部歌单分类
export  const  getquanbusonglist=()=>instance.get(`/playlist/catlist`,{});
//获取歌手分类
export  const  SingerClassification=(params)=>instance.get(`/artist/list`,{params});
//获取歌手单曲
export  const getSingerSing=(id)=>instance.get(`/artists?id=${id}`,{});
//获取歌手单曲
export  const getSingSongs=(id)=>instance.get(`/artists/?id=${id}`,{})
//获取歌手专辑
export const  getSingersalbum=(params)=>instance.get(`/artist/album`,{params});
//获取歌手MV
export const getSingerMV=(id)=>instance.get(`/artist/mv?id=${id}`,{});
export  const  searchSongs=params=>instance.get(`/cloudsearch`,{params} );