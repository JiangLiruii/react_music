interface artist {
  id:number,
  name:string,
}
interface album {
  id:number,
  name:string,
  picUrl:string,
}
interface songRate {
  br:number,
  size:number,
}
export interface songInfo {
  name:string,
  id:number,
  ar:artist,
  alia:string[],
  al:album,
  h:songRate,
  m:songRate,
  l:songRate,
}