import React, { Component } from 'react';
import './App.css';
import SearchBar from './component/search_bar';
// 引入HMR
import { hot } from 'react-hot-loader'

class App extends Component {
  render() {
    return (
      <div className="App">
        122<SearchBar />
      </div>
    );
  }
}

export default hot(module)(App)