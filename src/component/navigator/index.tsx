import React, { Component } from 'react';
import CSSModule from 'react-css-modules';

interface NavigatorStates {
  choose_index:number;
}
@CSSModule(require('./index.scss'))
export default class Navigator extends Component<{}, NavigatorStates> {
  constructor(props) {
    super(props);
    this.state = {
      choose_index: 1,
    };
  }
  public render() {
    return (
      <div styleName="navigator">
        <span styleName={this.state.choose_index === 1 ? 'active' : 'normal'} onClick={() => this.setState({choose_index: 1})}>播放列表</span>
        <span styleName={this.state.choose_index === 2 ? 'active' : 'normal'} onClick={() => this.setState({choose_index: 2})}>搜索结果</span>
        <span styleName={this.state.choose_index === 3 ? 'active' : 'normal'} onClick={() => this.setState({choose_index: 3})}>当前歌曲</span>
      </div>
    );
  }
}
