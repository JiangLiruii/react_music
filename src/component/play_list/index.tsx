import React from 'react';
import CSSModule from 'react-css-modules';
import SongSingle from '../song_single';
import { ReduxStates } from '../../reducer/ReduxStates';
import { connect } from 'react-redux';

interface PlayListProps {
  play_list:any[];
}

@CSSModule(require('./index.scss'))
class PlayList extends React.Component<PlayListProps, {}> {
  public shouldComponentUpdate(nextProps) {
    return nextProps.play_list.length !== this.props.play_list.length;
  }
  public render() {
    return (
      <div styleName="play_list">
      {this.props.play_list.map((song, index) =>
      (
        <SongSingle index={index} song={song} key={index} is_play_list={ true } />
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