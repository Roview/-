//设置播放列表
export const setplayList=(state ,payload )=>{
   state.playList=payload;
}
//控制播放暂停按钮的显示和隐藏
export  const isplaymutation=(state,payload)=>{
  state.isPlay = payload
}
//设置当前歌曲 循环播放的时候调用
export const setCurrentSong=(state,payload)=>{
   state.currentSong=payload;
}
//改变播放模式
 export const setplayMode=(state,payload)=>{
   state.playmode=payload;
 }
// 删除所有
export  const deleteAll=(state,payload)=>{
   state.playRecord=[];
}
//根据索引删除选中的
export const removehistory=(state,index)=>{
    state.playRecord.splice(index,1);
}
//点击播放取反
export  const setnavbarsong= ( state ) =>{
    state.navbarsong=true;
}
//点击切换上一首
export const setPlayPrevSongs= ( state ) => {
     //判断播放歌曲是否播放列表中
     if(state.playList.indexOf(state.currentSong) ===0){
        //第一个播放完到最后一个
        state.currentSong=state.playList[state.playList.length-1]
       // console.log(1)
     }else {
       //获取数组中播放的前一个数据
       state.currentSong = state.playList[state.playList.indexOf(state.currentSong) - 1]
       // console.log(2);
     }
  //将当前播放的歌曲添加到记录中
}
//点击切换下一首
export  const setPlaynextSong = (state)=> {
  // console.log(state.playList);
    if (state.playList.indexOf(state.currentSong)===state.playList.length - 1){
       state.currentSong= state.playList[0];
    }else {
     state.currentSong=state.playList[state.playList.indexOf(state.currentSong) + 1]
    }
}
//加入播放记录 去重
export  const addPlasyrecord=(state)=>{
  if(state.playRecord.indexOf(state.currentSong) === -1){
    state.playRecord.push(state.currentSong)
  }
}
//audio播放
export  const play= state =>{
     state.audio.play();
}
//获得我们需要播放的audio对象
/**
 * audio:this.$refs.audio
 * audio:state.audio
 */
 export const getaudio=(state,audio)=>{
   state.audio=audio;
 }
 //暂停功能
export const pause = state => {
  state.audio.pause()
}
