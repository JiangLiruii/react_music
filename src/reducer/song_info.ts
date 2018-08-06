interface artist {
  id:number,
  name:string,
}
interface album {
  id:number,
  name:string,
  picUrl:string,
  pic:number,
}
interface songRate {
  br:number,
  size:number,
}
export  default interface songInfo {
  name:string,
  id:number,
  ar:artist[],
  al:album,
}