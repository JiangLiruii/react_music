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

interface AppProps {
  current_nav_index:number;
  changeNavIndex:typeof changeNavIndex;
}

@CSSModule(require('./App.css'))
class App extends React.Component<AppProps, {}> {
  public constructor(props:any) {
    super(props);
    this._onNavClick = this._onNavClick.bind(this);
  }
  private _onNavClick(index:number) {
    this.props.changeNavIndex(index);
  }
  public render() {
    const current_show = this.props.current_nav_index;
    return (
      <div styleName="App">
        <SearchBar />
        <Nav clickFunc={this._onNavClick}/>
        {current_show === 0 && <PlayList />}
        {current_show === 1 && <SongList />}
        {current_show === 2 && <SongLyrics />}
        <CurrentBar />
      </div>
    );
  }
}

function map_states_to_props(state:ReduxStates) {
  return {
    current_nav_index: state.currentNavIndex.index,
  };
}

export default connect(map_states_to_props, {changeNavIndex})(App);