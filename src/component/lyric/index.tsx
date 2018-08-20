import React from 'react';
import { connect } from 'react-redux';
import CSSModule from 'react-css-modules';
import { ReduxStates } from '../../reducer/ReduxStates';
interface SongLyricsProps {
  lyrics:any;
  current_nav:any;
}
interface SongLyricsStates {
  origin_lyrics:string;
  show_lyrics_index:number;
}
@CSSModule(require('./index.scss'))
class SongLyrics extends React.Component<SongLyricsProps, SongLyricsStates> {
  private lyric_window;
  private lyric_arr;
  public constructor(props:SongLyricsProps) {
    super(props);
    this.state = {
      origin_lyrics: '',
      show_lyrics_index: 0,
    };
    this.lyric_window = React.createRef();
    this.lyric_arr = [];
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
  public componentDidMount() {
    const audio = document.getElementsByTagName('audio')[0];
    audio.addEventListener('timeupdate', (e:any) => {
      if (this.props.current_nav.index != 2) {
        return;
      }
      const current_time = e.target.currentTime;
      for (let i = 0; i < this.lyric_arr.length; i++) {
        if (i === this.lyric_arr.length - 1) {
          this.setState({
            show_lyrics_index: i,
          });
          return;
        }
        const delta_time = this.lyric_arr[i + 1].time - this.lyric_arr[i].time;
        if (this.lyric_arr[i].time > (current_time - delta_time + 1) ) {
          if (this.state.show_lyrics_index !== i) {
            this.lyric_window.current.scrollTop = (i - 3) * 60;
            setTimeout(() => this.setState({
              show_lyrics_index: i,
            }), 32);
          }
          return;
        }
      }
    });
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
  };
}
export default connect(map_states_to_props, {})(SongLyrics);