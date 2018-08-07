import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';

import { ReduxStates } from '../../reducer/ReduxStates';
import { CurrentSong } from '../../reducer/current_song';
import { SongInfo } from '../../reducer/song_single';
import { fetchSong, getSongHash } from '../song_single';
import { playMusic } from '../../reducer/current_song';
import './index.css';
interface CurrentBarProps extends CurrentSong {
  song_list:SongInfo[];
  playMusic:typeof playMusic;
}
interface CurrentBarState {
  currentTime:number;
  currentVolume:number;
  playing:boolean;
  volume_show:boolean;
}

class CurrentBar extends React.Component<CurrentBarProps, CurrentBarState> {
  private playAudio:any;
  constructor(props:CurrentBarProps) {
    super(props);
    this.state = {
      currentTime: 0,
      currentVolume: 100,
      playing:false,
      volume_show: false,
    };
    this.playAudio = React.createRef();
    this._onPlayChange = this._onPlayChange.bind(this);
    this._onPlayClick = this._onPlayClick.bind(this);
    this._onVolumeChange = this._onVolumeChange.bind(this);
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
  private _onPrevClick() {
    const song = this.props.song_list[this.props.index - 1];
    const hash = getSongHash(song);
    fetchSong(hash, this.props.playMusic, this.props.index - 1);
  }
  private _onNextClick() {
    const song = this.props.song_list[this.props.index + 1];
    const hash = getSongHash(song);
    fetchSong(hash, this.props.playMusic, this.props.index + 1);
  }
  public render() {
    return (
      <div className="current_song">
        <audio src={this.props.play_url} autoPlay={false} ref={this.playAudio}></audio>
        <span className="before" onClick={this._onPrevClick}></span>
        <span className={this.playAudio.current && (this.state.playing ? 'pause' : 'play') || 'play'}
          onClick={this._onPlayClick}></span>
        <span className="next" onClick={this._onNextClick}></span>
        <div className="audio_bar">
          <input type="range" name="play_range" min="0" max={this.props.timelength / 1000} step="1" value={this.state.currentTime} onChange={this._onPlayChange} />
          <span id="song_name">{this.props.song_name || '暂无歌曲'}</span>
        </div>
        <div
          onMouseOver = {() => this.setState({volume_show:true})}
          onMouseLeave = {() => this.setState({volume_show:false})}>
          <div id={this.state.currentVolume === 0 ? 'volume_mute_icon' : 'volume_icon'}
            onClick={() => this.setState({
              volume_show: !this.state.volume_show,
            })}></div>
          <input style={{opacity: (this.state.volume_show ? 1 : 0)}} type="range" name="volume" min="0" max="100" step="1" value={this.state.currentVolume} onChange={this._onVolumeChange} />
        </div>
      </div>
    );
  }
}

function map_states_to_props(state:ReduxStates) {
  return {
    ...state.currentSongState,
    song_list: state.songState.songs_list,
  };
}

function map_dispatch_to_props() {
  return {
    playMusic,
  };
}

export default connect(map_states_to_props, map_dispatch_to_props())(CurrentBar);
