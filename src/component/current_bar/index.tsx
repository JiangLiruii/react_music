import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';

import { ReduxStates } from '../../reducer/ReduxStates';
import { CurrentSong } from '../../reducer/current_song';
import { SongInfo } from '../../reducer/song_single';
import { playAsyncMusic } from '../../reducer/current_song';
import CSSModules from 'react-css-modules';
interface CurrentBarProps extends CurrentSong {
  favo_song_list:SongInfo[];
  search_song_list:SongInfo[];
  nav_index:number;
  play_music:typeof playAsyncMusic;
}
interface CurrentBarState {
  currentTime:number;
  currentVolume:number;
  playing:boolean;
  volume_show:boolean;
  mode:string;
}

@CSSModules(require('./index.scss'), {allowMultiple: true})
class CurrentBar extends React.Component<CurrentBarProps, CurrentBarState> {
  private playAudio:any;
  constructor(props:CurrentBarProps) {
    super(props);
    this.state = {
      currentTime: 0,
      currentVolume: 100,
      playing:false,
      volume_show: false,
      mode: 'sequence',
    };
    this.playAudio = React.createRef();
    this._onPlayChange = this._onPlayChange.bind(this);
    this._onPlayClick = this._onPlayClick.bind(this);
    this._onVolumeChange = this._onVolumeChange.bind(this);
    this._onModeClick = this._onModeClick.bind(this);
    this._onNextClick = this._onNextClick.bind(this);
    this._onPrevClick = this._onPrevClick.bind(this);
  }
  private _onPlayChange(e:any) {
    const currentTime = e.target.value;
    this.playAudio.current.currentTime = currentTime;
    this.setState({
      currentTime,
    });
  }

  private _onVolumeChange(e:any) {
    const target_volume = e.target.value;
    this.playAudio.current.volume = target_volume / 100;
    this.setState({
      currentVolume: target_volume,
    });

  }
  public componentDidMount() {
    const audio = this.playAudio.current;
    audio.oncanplay = () => {
      audio.play();
      this.setState({
        playing:true,
      });
    };
    audio.ontimeupdate = () => {
      this.setState({
        currentTime: audio.currentTime,
      });
    };
    audio.onended = (e) => {
      this._onNextClick(e);
    };
    audio.onerror = (e) => {
      this._onNextClick(e);
    };
  }
  private _onPlayClick() {
    /**
     * 0 = HAVE_NOTHING - 没有关于音频/视频是否就绪的信息
     * 1 = HAVE_METADATA - 关于音频/视频就绪的元数据
     * 2 = HAVE_CURRENT_DATA - 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒
     * 3 = HAVE_FUTURE_DATA - 当前及至少下一帧的数据是可用的
     * 4 = HAVE_ENOUGH_DATA - 可用数据足以开始播放
     */
    if (this.playAudio.current.readyState >= 3) {
      this.state.playing ? this.playAudio.current.pause() : this.playAudio.current.play();
      this.setState({
        playing: !this.state.playing,
      });
    }
  }
  private _onModeClick() {
    const mode_array = ['sequence', 'shaffle', 'loop_list', 'loop_one'];
    const current_index = mode_array.indexOf(this.state.mode);
    const next_index = current_index === 3 ? 0 : current_index + 1;
    this.setState({
      mode: mode_array[next_index],
    });
  }
  private _onPrevClick() {
    let prev_song;
    if (this.props.nav_index === 0) {
      prev_song = this.props.favo_song_list[this.props.index - 1];
    } else {
      prev_song = this.props.search_song_list[this.props.index - 1];
    }
    this.props.play_music(prev_song, this.props.index - 1, this.props.nav_index);
  }
  private _onNextClick(e) {
    let index = this.props.index;
    let song_list;
    if (this.props.nav_index === 0) {
      song_list = this.props.favo_song_list;
    } else {
      song_list = this.props.search_song_list;
    }
    let next_song = song_list[index + 1];
    const play = (song, index) => this.props.play_music(song, index, this.props.nav_index);
    // 判定是点击下一曲还是歌曲播放完毕的"下一曲"
    if (next_song && e.currentTarget.tagName === 'SPAN') {
      return play(next_song, index + 1);
    }
    switch (this.state.mode) {
      case 'sequence': {
        next_song && play(next_song, index + 1);
        break;
      }
      case 'loop_one': {
        play(next_song, index);
        break;
      }
      case 'loop_list': {
        if (!next_song) {
          next_song = song_list[0];
          index = 0;
        }
        play(next_song, index);
        break;
      }
      case 'shaffle': {
        let next_index = Math.ceil(Math.random() * (song_list.length - 1));
        if (next_index === index) {
          next_index -= 1;
        }
        next_song = song_list[next_index];
        play(next_song, next_index);
        break;
      }
    }
  }
  public render() {
    function transferTime(seconds:number) {
      const min = Number.parseInt('' + seconds / 60);
      seconds = Math.floor(seconds - min * 60);
      return `${min >= 10 ? Math.floor(min / 10) : 0}${ min > 0 ? min % 10 : 0}: ${seconds >= 10 ? Math.floor(seconds / 10) : 0}${seconds % 10}`;
    }
    return (
      <div styleName="current_song">
        <audio src={this.props.play_url} autoPlay={false} ref={this.playAudio}></audio>
        <span styleName="before" onClick={this._onPrevClick}></span>
        <span styleName={this.playAudio.current && (this.state.playing ? 'pause' : 'play') || 'play'}
          onClick={this._onPlayClick}></span>
        <span styleName="next" onClick={this._onNextClick}></span>
        <div styleName="audio_bar">
          <input type="range" name="play_range" min="0" max={this.props.timelength / 1000} step="0.9" value={this.state.currentTime} onChange={this._onPlayChange} />
          <div styleName="info">
            <span styleName="song_name">{this.props.song_name || '暂无歌曲'}</span>
            <span styleName="time"> {this.props.play_url ? (transferTime(this.state.currentTime)) + '/' + transferTime(this.props.timelength / 1000) : '00: 00/00: 00'}</span>
            <span styleName="bitrate">{'比特率: ' + this.props.bitrate}</span>
          </div>

        </div>
        <div styleName="mode">
          <div styleName={this.state.mode} onClick={this._onModeClick}></div>
        </div>
        <div
          onMouseOver = {() => this.setState({volume_show:true})}
          onMouseLeave = {() => this.setState({volume_show:false})}>
          <div styleName={this.state.currentVolume === 0 ? 'volume_mute_icon' : 'volume_icon'}
            onClick={() => this.setState({
              volume_show: !this.state.volume_show,
            })}></div>
        </div>
        <input style={{opacity: (this.state.volume_show ? 1 : 0)}} type="range" name="volume" min="0" max="100" step="1" value={this.state.currentVolume} onChange={this._onVolumeChange} />
      </div>
    );
  }
}

function map_states_to_props(state:ReduxStates) {
  return {
    ...state.currentSongState,
    favo_song_list: state.songState.favo_song_list,
    search_song_list: state.songState.songs_list,
  };
}

function map_dispatch_to_props() {
  return {
    play_music: playAsyncMusic,
  };
}

export default connect(map_states_to_props, map_dispatch_to_props())(CurrentBar);
