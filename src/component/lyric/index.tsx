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
  // 将 xx:xx 转为 s
  private _transform(time:string) {
    const time_list = time.split(':');
    const min = parseInt(time_list[0]);
    const second = parseFloat(time_list[1]);
    return min * 60 + second;
  }
  // 将获取的 json 格式歌词转化为 array
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
    // 如果这一句歌词时间小于当前时间, 则需要向上走, 场景为如果用户将进度条往回拖动
    while (this.lyric_arr[lyric_index - 1] && this.lyric_arr[lyric_index].time > current_time) {
      lyric_index -= 1;
    }
    // 如果下一句的开始时间小于当前时间,1.5s为偏移量, 提前进入下一句
    while (this.lyric_arr[lyric_index + 1] && (this.lyric_arr[lyric_index + 1].time < current_time + 1.5) && this.lyric_arr[lyric_index].time < current_time) {
      lyric_index += 1;
    }
    function scrollAnimation(s_top:number, param_top:number) {
      // 如果是新的歌曲
      if (param_top <= 10) {
         return this.lyric_window.current.scrollTop = 0;
      }
      this.lyric_window.current.scrollTop = s_top;
      setTimeout(() => {
        const offset = 10;
        // 如果当前滑动条大于param 高度
        if (s_top + offset < param_top) {
          s_top += offset;
        } else if (s_top - offset > param_top) {
          s_top -= offset;
        } else {
          return;
        }
        scrollAnimation.call(this, s_top, param_top);
      }, 8);
    }
    const mid = Math.floor(this.lyric_window.current.clientHeight / 30 / 2);
    scrollAnimation.call(this, this.lyric_window.current.scrollTop, (lyric_index - mid) * 30);
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
      <div styleName="lyric">
      <div style={{
        background: `url(${this.props.song_img}) no-repeat center/contain`,
        filter: `blur(4px)`,
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}></div>
        {this.lyric_arr.length ? <div styleName="display_lyric" ref={this.lyric_window}>
          {
             this.lyric_arr.map((obj, index) => {
              return (<div styleName={this.state.show_lyrics_index === index ? 'current' : ''} key={index}>{obj.lyric}</div>);
            })
          }
        </div> : <div styleName="no_music">现在还没有播放任何歌曲哦</div>}
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