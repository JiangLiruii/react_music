import React from 'react';
import { connect } from 'react-redux';

import { ReduxStates } from '../../reducer/ReduxStates';
import { CurrentSong } from '../../reducer/current_song';
import './index.css';
interface CurrentBarProps extends CurrentSong {

}
interface CurrentBarState {
  currentTime:number;
  currentVolume:number;
  playing:boolean;
}

class CurrentBar extends React.Component<CurrentBarProps, CurrentBarState> {
  private playAudio:any;
  constructor(props:CurrentBarProps) {
    super(props);
    this.state = {
      currentTime: 0,
      currentVolume: 100,
      playing:false,
    };
    this.playAudio = React.createRef();
    this._onPlayChange = this._onPlayChange.bind(this);
    this._onPlayClick = this._onPlayClick.bind(this);
    this._onVolumeChange = this._onVolumeChange.bind(this);
  }
  private _onPlayChange() {

  }

  private _onVolumeChange() {

  }
  public componentDidMount() {
    const audio = this.playAudio.current;
    audio.oncanplay = () => {
      audio.play();
      this.setState({
        playing:true,
      });
    };
  }
  private _onPlayClick() {
    this.state.playing ? this.playAudio.current.pause() : this.playAudio.current.play();
    this.setState({
      playing: !this.state.playing,
    });
  }
  public render() {
    console.log(this.playAudio.current && this.playAudio.current.paused);
    return (
      <div className="current_song">
        <audio src={this.props.play_url} autoPlay={false} ref={this.playAudio}></audio>
        <span className="before"></span>
        <span className={this.playAudio.current && (this.state.playing ? 'pause' : 'play')}
          onClick={this._onPlayClick}></span>
        <span className="next"></span>
        <input type="range" name="play_range" min="0" max={this.props.timelength} step="1" value={this.state.currentTime} onChange={this._onPlayChange} />
        <input type="range" name="volume" min="0" max="100" step="1" value={this.state.currentVolume} onChange={this._onVolumeChange} />
      </div>
    );
  }
}

function map_states_to_props(state:ReduxStates) {
  return {
    ...state.currentSongState,
  };
}

export default connect(map_states_to_props, {})(CurrentBar);
