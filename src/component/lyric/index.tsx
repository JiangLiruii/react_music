import React from 'react';
import { connect } from 'react-redux';
import CSSModule from 'react-css-modules';
import { ReduxStates } from '../../reducer/ReduxStates';
interface SongLyricsProps {
  lyrics:any;
  current_nav:any;
}
interface SongLyricsStates {
  origin_lyrics:any[];
  show_lyrics_index:number;
}
@CSSModule(require('./index.scss'))
class SongLyrics extends React.Component<SongLyricsProps, SongLyricsStates> {
  private lyric_window;
  public constructor(props:SongLyricsProps) {
    super(props);

    this.state = {
      origin_lyrics: [],
      show_lyrics_index: 0,
    };
    this.lyric_window = React.createRef();
  }
  private _transform(time:string) {
    const time_list = time.split(':');
    const min = parseInt(time_list[0]);
    const second = parseFloat(time_list[1]);
    return min * 60 + second;
  }

  public componentDidMount() {
    const audio = document.getElementsByTagName('audio')[0];
    const lyric_arr = [];
    const lyrics = this.props.lyrics.split(/\[|\]/);
    lyrics.shift();
    console.log(lyrics);

    for (let i = 0; i < lyrics.length;) {
      const time = this._transform(lyrics[i]);
      lyric_arr[parseInt('' + i / 2)] = { time, lyric : lyrics[i + 1]};
      i += 2;
    }
    this.setState({
      origin_lyrics: lyric_arr,
    });
    audio.addEventListener('timeupdate', (e:any) => {
      console.log(this.props.current_nav);
      if (this.props.current_nav.index != 2) {
        return;
      }
      const current_time = e.target.currentTime;
      for (let i = 0; i < lyric_arr.length; i++) {
        const delta_time = lyric_arr[i + 1].time - lyric_arr[i].time;
        if (lyric_arr[i].time > (current_time - delta_time + 1) ) {
          if (this.state.show_lyrics_index !== i) {
            this.lyric_window.current.scrollTop = (i - 3) * 60;
            setTimeout(() => this.setState({
              show_lyrics_index: i,
            }), 32);
          }
          break;
        }
      }
    });
  }
  public render() {
    return (
      <div styleName="lyric">
      <div styleName="display_lyric" ref={this.lyric_window}>
        {
          this.state.origin_lyrics.map((obj, index) => {
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