import React from "react";
import { connect } from 'react-redux';

interface songAlbum {
  id:number;
  name:string;
  picUrl:string;
  pic:number;
}
interface songArtist {
  id:number;
  name:string;
}
export interface songInfoProps {
  name:string;
  id:number;
  ar:songArtist;
  al:songAlbum;
}

interface songInfoState {

}

class songInfo extends React.Component<songInfoProps, songInfoState> {
  render() {
    return (
      <div>
        <span>{this.props.name}</span>
        <span>{this.props.ar.name}</span>
        <span>选择</span>
        <span>收藏</span>
        <span>添加到列表</span>
        <span>查看专辑</span>
      </div>
    )
  }
}

export default connect((state) => ({}),{})(songInfo)