import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ReduxStates } from '../../reducer/ReduxStates'
import {songState} from '../../reducer/song_list'
interface songListProps {
  songs_state:songState
}

interface songListState {

}


class SongList extends React.Component<songListProps, songListState> {
  render() {
    return (
      <div>
        {this.props.songs_state.songs_list.map(song => {
          return (
            <li>{song.name}</li>
          )
        })}
      </div>
    )
  }
}
function map_states_to_props(state:ReduxStates) {
  console.log(state);
  return {
    songs_state: state.song_state,
  }
}

export default connect(map_states_to_props, {})(SongList)
