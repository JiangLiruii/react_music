import React from 'react';
import './App.css';
import SearchBar from './component/search_bar';
import SongList from './component/songs_list';
import CurrentBar from './component/current_bar';
export default class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <SearchBar />
        <SongList />
        <CurrentBar />
      </div>
    );
  }
}