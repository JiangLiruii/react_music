import React from 'react';
import { connect } from 'react-redux';
import { ReduxStates } from '../../reducer/ReduxStates';
import SongSingle from '../song_single';
import { SongInfo } from '../../reducer/song_single';
import CSSModules from 'react-css-modules';
interface SongListProps {
  songs_list:SongInfo[];
}

interface SongListState {

}

@CSSModules(require('./index.scss'), {allowMultiple: true})
class SongList extends React.Component<SongListProps, SongListState> {
  public render() {
    return (
      <div styleName="songs_list">
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
  };
}

export default connect(map_states_to_props, {})(SongList);
