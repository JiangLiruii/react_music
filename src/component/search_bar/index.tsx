import React from 'react';
import { connect } from 'react-redux';
import { fetchMusicsActionCreator } from '../../reducer/song_list';

interface searchBarProps {
  fetchMusic:Function,
  musics: any[],
}
interface searchBarStates {
  searchInput:string,
}

class searchBar extends React.Component<searchBarProps, searchBarStates> {
  constructor(props:searchBarProps) {
    super(props);
    this.state = {
      searchInput: '歌曲名/歌手名'
    }
  };
  public onChange(e:React.ChangeEvent<HTMLInputElement>) {
    const searchInput = e.currentTarget.value
    this.setState({
      searchInput
    })
  };
  public search() {
    this.props.fetchMusic(this.state.searchInput);
  };
  render() {
    return (
      <div>
        <input type="text" defaultValue="歌曲名/歌手名" onChange={this.onChange}/>
        <button type="submit" onClick={this.search}>sousss</button>
      </div>
    )
  }
}
function map_states_to_props(ReduxStates) {
  return {
    musics: ReduxStates.musics,
  }
}
function map_dispatch_to_props() {
  return {
    fetchMusic: fetchMusicsActionCreator
  }
}
export default connect(map_states_to_props, map_dispatch_to_props)(searchBar)