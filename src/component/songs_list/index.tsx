import React from 'react';
import { connect } from 'react-redux';
import { ReduxStates } from '../../reducer/ReduxStates';
import SongSingle from '../song_single';
import { SongInfo } from '../../reducer/song_single';
import CSSModules from 'react-css-modules';
import { fetchMusicsAsyncActionCreator, Query } from '../../reducer/song_list';

interface SongListProps {
  songs_list:SongInfo[];
  current_music_state:Query;
  fetchMore:typeof fetchMusicsAsyncActionCreator;
}

interface SongListState {

}

@CSSModules(require('./index.scss'), {allowMultiple: true})
class SongList extends React.Component<SongListProps, SongListState> {
  private _songs_list:any;
  constructor(props:SongListProps) {
    super(props);
    this._onScroll = this._onScroll.bind(this);
  }
  public componentWillMount() {
    this._songs_list = React.createRef();
  }
  public componentDidMount() {

  }
  private _onScroll(e:any) {
    const scroll_top = e.target.scrollTop;
    const scroll_height = e.target.scrollHeight;
    const client_height = e.target.clientHeight;
    if (scroll_height - scroll_top - client_height === 0) {
      console.log(scroll_height - scroll_top - client_height);
      const current_state = this.props.current_music_state;
      const next_music_state = Object.assign(current_state, {page: +current_state.page + 1});
      this.props.fetchMore(next_music_state, this.props.songs_list);
    }
  }
  public render() {
    return (
      <div styleName="songs_list" ref={this._songs_list} onScroll={this._onScroll}>
        {this.props.songs_list.map((song, index) => {
          return (
           <SongSingle index={index} songname={song.songname} hash={song['sqhash'] || song['320hash'] || song.hash} singername={song.singername} key={index} />
          );
        })}
      </div>
    );
  }
}
function map_states_to_props(state:ReduxStates) {
  return {
    songs_list: state.songState.songs_list,
    current_music_state: state.songState.currentMusicState,
  };
}
function map_dispatch_to_props() {
  return {
    fetchMore: fetchMusicsAsyncActionCreator,
  };
}
export default connect(map_states_to_props, map_dispatch_to_props())(SongList);
