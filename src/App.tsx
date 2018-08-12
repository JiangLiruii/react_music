import React from 'react';
import SearchBar from './component/search_bar';
import SongList from './component/songs_list';
import PlayList from './component/play_list';
import SongLyrics from './component/lyric';
import CurrentBar from './component/current_bar';
import Nav from './component/navigator';
import CSSModule from 'react-css-modules';

/**
 * current_show:
 *  1 play_list
 *  2 search_list
 *  3 lyrics and song img
 */
interface AppStates {
  current_show:number;
}

@CSSModule(require('./App.css'))
export default class App extends React.Component<{}, AppStates> {
  public constructor(props:any) {
    super(props);
    this.state = {
      current_show: 1,
    };
    this._onNavClick = this._onNavClick.bind(this);
  }
  private _onNavClick(index:number) {
    this.setState({
      current_show: index,
    });
  }
  public render() {
    const current_show = this.state.current_show;
    return (
      <div styleName="App">
        <SearchBar />
        <Nav clickFunc={this._onNavClick}/>
        {current_show === 1 && <PlayList />}
        {current_show === 2 && <SongList />}
        {current_show === 3 && <SongLyrics />}
        <CurrentBar />
      </div>
    );
  }
}