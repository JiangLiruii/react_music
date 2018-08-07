import React from 'react';
import { connect } from 'react-redux';
import { ReduxStates } from '../../reducer/ReduxStates';
import SongSingle from '../song_info';
import { SongInfo } from '../../reducer/song_single';
import './index.css';
interface SongListProps {
  songs_list:SongInfo[];
}

interface SongListState {

}

class SongList extends React.Component<SongListProps, SongListState> {
  public render() {
    return (
      <div className="songs_list">
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
  console.log(state);
  return {
    songs_list: state.songState.songs_list,
  };
}

export default connect(map_states_to_props, {})(SongList);
