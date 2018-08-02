import React, { Component } from 'react';
import './App.css';
import SearchBar from './component/search_bar';
// 引入HMR
import { hot } from 'react-hot-loader'
import SongList from './component/songs_list';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
        <SongList />
      </div>
    );
  }
}

export default hot(module)(App)