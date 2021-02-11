const state={
 //播放列表
 playList:[],
 //audio元素
 audio:null,
 //当前播放歌曲的对象
 currentSong:{},
 // 控制播放暂停按钮的显隐
 isPlay: false,
//  顺序播放是:orderPlay
//音频播放完判断播放模式是哪一种
 playmode:'orderPlay',
 //播放记录存储在本地中
 playRecord:JSON.parse(window.sessionStorage.getItem('playRecord')) || [],
}
export default state;