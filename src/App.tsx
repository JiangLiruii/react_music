import React from 'react';
import SearchBar from './component/search_bar';
import SongList from './component/songs_list';
import CurrentBar from './component/current_bar';
import Nav from './component/navigator';
import CSSModule from 'react-css-modules';

@CSSModule(require('./App.css'))
export default class App extends React.Component {
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