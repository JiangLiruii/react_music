import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';

import { ReduxStates } from '../../reducer/ReduxStates';
import { CurrentSong } from '../../reducer/current_song';
import { SongInfo } from '../../reducer/song_single';
import { playAsyncMusic } from '../../reducer/current_song';
import CSSModules from 'react-css-modules';
interface CurrentBarProps extends CurrentSong {
  song_list:SongInfo[];
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
    audio.onended = () => {
      this._onNextClick();
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
    const song = this.props.song_list[this.props.index - 1];
    this.props.play_music(song, this.props.index - 1);
  }
  private _onNextClick() {
    const song = this.props.song_list[this.props.index + 1];
    this.props.play_music(song, this.props.index + 1);
  }
  public render() {
    return (
      <div styleName="current_song">
        <audio src={this.props.play_url} autoPlay={false} ref={this.playAudio}></audio>
        <span styleName="before" onClick={this._onPrevClick}></span>
        <span styleName={this.playAudio.current && (this.state.playing ? 'pause' : 'play') || 'play'}
          onClick={this._onPlayClick}></span>
        <span styleName="next" onClick={this._onNextClick}></span>
        <div styleName="audio_bar">
          <input type="range" name="play_range" min="0" max={this.props.timelength / 1000} step="1" value={this.state.currentTime} onChange={this._onPlayChange} />
          <span styleName="song_name">{this.props.song_name || '暂无歌曲'}</span>
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
    song_list: state.songState.favo_song_list,
  };
}

function map_dispatch_to_props() {
  return {
    play_music: playAsyncMusic,
  };
}

export default connect(map_states_to_props, map_dispatch_to_props())(CurrentBar);
