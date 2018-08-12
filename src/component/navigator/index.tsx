import React, { Component } from 'react';
import CSSModule from 'react-css-modules';

interface NavigatorProps {
  clickFunc:Function;
}
interface NavigatorStates {
  choose_index:number;
}
@CSSModule(require('./index.scss'))
export default class Navigator extends Component<NavigatorProps, NavigatorStates> {
  constructor(props) {
    super(props);
    this.state = {
      choose_index: 1,
    };
    this._onNavClick = this._onNavClick.bind(this);
  }
  private _onNavClick (index:number) {
    this.props.clickFunc(index);
    this.setState({
      choose_index: index,
    });
  }
  public render() {
    return (
      <div styleName="navigator">
        <span styleName={this.state.choose_index === 1 ? 'active' : 'normal'} onClick={() => this._onNavClick(1)}>播放列表</span>
        <span styleName={this.state.choose_index === 2 ? 'active' : 'normal'} onClick={() => this._onNavClick(2)}>搜索结果</span>
        <span styleName={this.state.choose_index === 3 ? 'active' : 'normal'} onClick={() => this._onNavClick(3)}>当前歌曲</span>
      </div>
    );
  }
}
