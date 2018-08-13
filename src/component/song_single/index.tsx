import React from 'react';
import { connect } from 'react-redux';
import { SongInfo } from '../../reducer/song_single';
import request from 'superagent';
// import getMusicUrl from '../../utils/musicUrl'
import { playMusic } from '../../reducer/current_song';
import { ReduxStates } from '../../reducer/ReduxStates';
import { addMusicToFavoList, deleteMusicFromFavoList } from '../../reducer/song_list';
import CSSModules from 'react-css-modules';

interface SongInfoProps {
  song:SongInfo;
  play_music:typeof playMusic;
  index:number;
  current_song_hash:string;
  is_play_list?:boolean;
  add_favo:typeof addMusicToFavoList;
  delete_favo:typeof deleteMusicFromFavoList;
}

export function fetchSong(hash, action_fetch_song, index) {
  request(`http://localhost:3003/music?hash=${hash}`)
  .then((res) => {
    action_fetch_song({
      ...res.body,
      index,
    });
  }, (rej) => console.error(rej));
}
export function getSongHash(obj) {
  return obj.sqhash || obj['320hash'] || obj.hash;
}
@CSSModules(require('./index.scss'), {allowMultiple: true})
class SongSingle extends React.Component<SongInfoProps, {}> {
  constructor(props:SongInfoProps) {
    super(props);
    this._onSongClick = this._onSongClick.bind(this);
    this._onAddClick = this._onAddClick.bind(this);
  }
  public _onSongClick() {
    const hash = getSongHash(this.props.song);
    fetchSong(hash, this.props.play_music, this.props.index);
  }
  private _onAddClick() {
    if (this.props.is_play_list) {
      this.props.delete_favo(this.props.index);
    } else {
      // 在search列表中
      this.props.add_favo(this.props.song);
    }
  }
  public render() {
    const is_now = this.props.song.hash === this.props.current_song_hash;
    return (
      <div styleName="song">
        <span styleName={'song_index ' + (is_now ? 'active' : '')}>{this.props.index + 1}</span>
        <span styleName="song_name">{this.props.song.songname}</span>
        <span styleName="artist_name">{this.props.song.singername}</span>
        <span styleName={'play ' + (is_now ? 'now' : '')} onClick={this._onSongClick}></span>
        <span styleName={this.props.is_play_list ? 'delete_from_list' : 'add_play_list'} onClick={this._onAddClick}></span>
        <span styleName="download"></span>
      </div>
    );
  }
}
function map_states_to_props(state:ReduxStates) {
  return {
    current_song_hash: state.currentSongState.hash,
  };
}
function map_dispatch_to_props() {
  return {
    play_music: playMusic,
    add_favo: addMusicToFavoList,
    delete_favo: deleteMusicFromFavoList,
  };
}

export default connect(map_states_to_props, map_dispatch_to_props())(SongSingle);