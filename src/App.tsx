import React from 'react';
import SearchBar from './component/search_bar';
import SongList from './component/songs_list';
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
export default class App extends React.Component<{},AppStates> {
  public constructor(props:any) {
    super(props);
    this.state = {
      current_show: 1,
    };
  }
  public render() {
    return (
      <div styleName="App">
        <SearchBar />
        <Nav />
        <SongList />
        <CurrentBar />
      </div>
    );
  }
}