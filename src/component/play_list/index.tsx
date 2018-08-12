import React from 'react';
import SongSingle from '../song_single';
import { ReduxStates } from '../../reducer/ReduxStates';
import { connect } from 'react-redux';

interface PlayListProps {
  play_list:any[];
}

class PlayList extends React.Component<PlayListProps, {}> {
  public render() {
    return (
      <div>
      {this.props.play_list.map((song, index) =>
      (
        <SongSingle index={index} songname={song.songname}
        hash={song['sqhash'] || song['320hash'] || song.hash}
        singername={song.singername} key={index} is_play_list={true}/>
      ))}
      </div>
    );
  }
}

function map_states_to_props(state:ReduxStates) {
  return {
    play_list: state.songState.favo_song_list,
  };
}
export default connect(map_states_to_props, {})(PlayList);