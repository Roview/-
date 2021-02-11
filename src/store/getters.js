//当前播放的歌曲的对象
 export const currentSong =(state) => state.currentSong
//控制播放暂停按钮的显隐
export const isplay= state => state.isPlay;
//播放模式
export  const playmode =state=>state.playmode;
//播放记录
export  const playRecord=state=>state.playRecord;
////播放列表
export const playList=state=>state.playList;
//audio元素
export  const audio =state=>state.audio;
//控制底部显示与隐藏
export  const navbarsong = state=>state.navbarsong;