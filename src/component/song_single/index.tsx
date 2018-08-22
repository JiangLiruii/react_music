import React from 'react';
import { connect } from 'react-redux';
import { SongInfo } from '../../reducer/song_single';
import request from 'superagent';
// import getMusicUrl from '../../utils/musicUrl'
import { playAsyncMusic, CurrentSong } from '../../reducer/current_song';
import { ReduxStates } from '../../reducer/ReduxStates';
import { addMusicToFavoList, deleteMusicFromFavoList } from '../../reducer/song_list';
import CSSModules from 'react-css-modules';

interface SongInfoProps {
  song:SongInfo;
  play_music:typeof playAsyncMusic;
  index:number;
  current_song:CurrentSong;
  is_play_list?:boolean;
  add_favo:typeof addMusicToFavoList;
  delete_favo:typeof deleteMusicFromFavoList;
  current_nav_index:number;
}
@CSSModules(require('./index.scss'), {allowMultiple: true})
class SongSingle extends React.Component<SongInfoProps, {}> {
  constructor(props:SongInfoProps) {
    super(props);
    this._onSongClick = this._onSongClick.bind(this);
    this._onAddClick = this._onAddClick.bind(this);
    this._onDownload = this._onDownload.bind(this);
  }
  public _onSongClick() {
    const current_nav_index = this.props.is_play_list ? 0 : 1;
    this.props.play_music(this.props.song, this.props.index, current_nav_index);
  }
  private _onAddClick() {
    if (this.props.is_play_list) {
      this.props.delete_favo(this.props.index);
    } else {
      // 在search列表中
      this.props.add_favo(this.props.song);
    }
  }
  private _onDownload() {
    this.props.play_music(this.props.song);
  }
  public render() {
    const is_now = this.props.index === this.props.current_song.index && (this.props.current_nav_index === this.props.current_song.nav_index);
    return (
      <div styleName="song">
        <span styleName={'song_index ' + (is_now ? 'active' : '')}>{this.props.index + 1}</span>
        <span styleName="song_name" dangerouslySetInnerHTML={{__html: this.props.song.SongName}}></span>
        <span styleName="artist_name" dangerouslySetInnerHTML={{__html: this.props.song.SingerName}}></span>
        <span styleName={'play ' + (is_now ? 'now' : '')} onClick={this._onSongClick}></span>
        <span styleName={this.props.is_play_list ? 'delete_from_list' : 'add_play_list'} onClick={this._onAddClick}></span>
        <span styleName="download" onClick={this._onDownload}></span>
      </div>
    );
  }
}
function map_states_to_props(state:ReduxStates) {
  return {
    current_song: state.currentSongState,
    current_nav_index: state.currentNavIndex.index,

  };
}
function map_dispatch_to_props() {
  return {
    play_music: playAsyncMusic,
    add_favo: addMusicToFavoList,
    delete_favo: deleteMusicFromFavoList,
  };
}

export default connect(map_states_to_props, map_dispatch_to_props())(SongSingle);