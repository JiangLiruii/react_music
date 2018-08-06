import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ReduxStates } from '../../reducer/ReduxStates'
import SongSingle from '../song_info';
import {songInfo} from '../../reducer/song_info'
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
           <SongSingle songname={song.songname} hash={song['320hash'] || song.hash} singername={song.singername} key={index} />
          )
        })}
      </div>
    )
  }
}
function map_states_to_props(state:ReduxStates) {
  console.log(state);
  return {
    songs_list: state.songStateReducer.songs_list,
  }
}

export default connect(map_states_to_props, {})(SongList)
