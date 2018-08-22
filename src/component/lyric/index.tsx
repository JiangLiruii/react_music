import React from 'react';
import { connect } from 'react-redux';
import CSSModule from 'react-css-modules';
import { ReduxStates } from '../../reducer/ReduxStates';
interface SongLyricsProps {
  lyrics:any;
  current_nav:any;
  song_img:string;
}
interface SongLyricsStates {
  origin_lyrics:string;
  show_lyrics_index:number;
}
@CSSModule(require('./index.scss'))
class SongLyrics extends React.Component<SongLyricsProps, SongLyricsStates> {
  private lyric_window;
  private lyric_arr;
  private audio;
  public constructor(props:SongLyricsProps) {
    super(props);
    this.state = {
      origin_lyrics: '',
      show_lyrics_index: 0,
    };
    this.lyric_window = React.createRef();
    this.lyric_arr = [];
    this.audio = document.getElementsByTagName('audio')[0];
    this._onTimeUpdate = this._onTimeUpdate.bind(this);
  }
  private _transform(time:string) {
    const time_list = time.split(':');
    const min = parseInt(time_list[0]);
    const second = parseFloat(time_list[1]);
    return min * 60 + second;
  }
  private _transformLyrics(lyrics) {
    lyrics = lyrics.split(/\[|\]/);
    lyrics.shift();
    for (let i = 0; i < lyrics.length;) {
      const time = this._transform(lyrics[i]);
      this.lyric_arr[parseInt('' + i / 2)] = { time, lyric : lyrics[i + 1]};
      i += 2;
    }
  }
  public componentWillMount() {
    this._transformLyrics(this.props.lyrics);
  }
  private _onTimeUpdate(e) {
    const current_time = e.target.currentTime;
    let lyric_index = this.state.show_lyrics_index;
    if (this.props.current_nav.index != 2) {
      return;
    }
    // 如果是最后一句歌词的话
    if (lyric_index === this.state.origin_lyrics.length - 1) {
      this.setState({
        show_lyrics_index: lyric_index,
      });
      return;
    }
    // 如果下一句的开始时间小于当前时间,1.5s为偏移量, 提前进入下一句
    while (this.lyric_arr[lyric_index + 1].time < current_time + 1.5) {
      lyric_index += 1;
    }
    function scrollAnimation(param_top:number) {
      setTimeout(() => {
        let s_top = this.lyric_window.current.scrollTop;
        const offset = 10;
        if (s_top + offset > param_top) {
          s_top = param_top;
        } else {
          this.lyric_window.current.scrollTop += offset;
        }
        if (this.lyric_window.current.scrollTop < param_top) {
          scrollAnimation.call(this, param_top);
        }
      }, 16);
    }
    scrollAnimation.call(this, (lyric_index - 3) * 60);
    this.setState({
      show_lyrics_index: lyric_index,
    });
  }
  public componentDidMount() {
    this.audio.addEventListener('timeupdate', this._onTimeUpdate);
  }
  public componentWillUnmount() {
    this.audio.removeEventListener('timeupdate', this._onTimeUpdate);
  }
  public componentWillUpdate(nextProps:SongLyricsProps, nextState, nextContext) {
    if (this.state.origin_lyrics != nextProps.lyrics) {
      this.setState({
        origin_lyrics: nextProps.lyrics,
      });
      this._transformLyrics(nextProps.lyrics);
    }
  }
  public render() {
    return (
      <div styleName="lyric" style={{
        background: `url(${this.props.song_img}) no-repeat center/contain`,
      }}>
      <div styleName="display_lyric" ref={this.lyric_window}>
        {
          this.lyric_arr.map((obj, index) => {
            return (<div styleName={this.state.show_lyrics_index === index ? 'current' : ''} key={index}>{obj.lyric}</div>);
          })
        }
      </div>
      </div>
    );
  }
}
function map_states_to_props(state:ReduxStates) {
  return {
    lyrics: state.currentSongState.lyrics,
    current_nav: state.currentNavIndex,
    song_img: state.currentSongState.img,
  };
}
export default connect(map_states_to_props, {})(SongLyrics);