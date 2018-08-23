import React from 'react';
import SearchBar from './component/search_bar';
import SongList from './component/songs_list';
import PlayList from './component/play_list';
import SongLyrics from './component/lyric';
import CurrentBar from './component/current_bar';
import Nav from './component/navigator';
import CSSModule from 'react-css-modules';
import { connect } from 'react-redux';
import { ReduxStates } from './reducer/ReduxStates';
import { changeNavIndex } from './reducer/navigator';
require('../favicon-16x16.png');
interface AppProps {
  current_nav_index:number;
  changeNavIndex:typeof changeNavIndex;
  favo_song_list:any[];
}

@CSSModule(require('./App.scss'))
class App extends React.Component<AppProps, {}> {
  public constructor(props:any) {
    super(props);
    this._onNavClick = this._onNavClick.bind(this);
  }
  private _onNavClick(index:number) {
    this.props.changeNavIndex(index);
  }
  public componentDidMount() {
    window.onbeforeunload = () => {
      window.localStorage.setItem('favo_song_list', JSON.stringify(this.props.favo_song_list));
    };
  }
  public render() {
    const current_show = this.props.current_nav_index;
    return (
      <div styleName="App">
        <SearchBar />
        <Nav clickFunc={this._onNavClick}/>
        <div styleName="list">
          {current_show === 0 && <PlayList />}
          {current_show === 1 && <SongList />}
          {current_show === 2 && <SongLyrics />}
        </div>
        <CurrentBar />
      </div>
    );
  }
}

function map_states_to_props(state:ReduxStates) {
  return {
    current_nav_index: state.currentNavIndex.index,
    favo_song_list: state.songState.favo_song_list,
  };
}

export default connect(map_states_to_props, {changeNavIndex})(App);