import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ReduxStates } from '../../reducer/ReduxStates'
import {songState} from '../../reducer/song_list'
import { songInfo } from '../../reducer/song_info';
interface songListProps {
  songs_list:songInfo[],
}

interface songListState {

}


class SongList extends React.Component<songListProps, songListState> {
  render() {
    return (
      <div>
        {this.props.songs_list.map((song, index) => {
          return (
            <li key={index}>{song.name}</li>
          )
        })}
      </div>
    )
  }
}
function map_states_to_props(state:ReduxStates) {
  console.log(state);
  return {
    songs_list: state.songsList.songs_list,
  }
}

export default connect(map_states_to_props, {})(SongList)
