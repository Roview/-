//处理歌曲
import utils from "../Utils/Utils";
 export  default class Song {
     constructor({
          id,
          singer,
          name,
          album,
          duration,
          image,
          url,
          playCount,
          score,
          }) {
         this.id=id;
         this.singer=singer;
         this.name=name;
         this.album=album;
         this.duration=duration;
         this.image=image;
         this.url=url;
         this.playCount=playCount;
         this.score=score;
     }

 }
export function createSong(musicData) {
    return new Song({
      id:musicData.id,
      singer:filterSinger(musicData.ar),
      name:musicData.name,
      album:musicData.al.name,
      //需要处理时间,转换成秒
      duration:musicData.dt,
      image:musicData.al.picUrl,
      playCount:musicData.playCount || '',
      score:musicData.score || '',
    })
}
//歌手名在ar里面
function filterSinger(singer) {
    let ret=[];
    if(!singer) {
      return '';
    }else {
      singer.map(item=>{
       ret.push(item.name);
      })
    }
    //数组返回的是一个字符串
    return ret.join('/');
}
