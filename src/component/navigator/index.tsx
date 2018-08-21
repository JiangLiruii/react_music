import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModule from 'react-css-modules';
import { ReduxStates } from '../../reducer/ReduxStates';
import { changeNavIndex } from '../../reducer/navigator';

interface NavigatorProps {
  changeNavIndex:typeof changeNavIndex;
  current_index:number;
  clickFunc:Function;
}
interface NavigatorStates {
  current_index:number;
}

@CSSModule(require('./index.scss'))
class Navigator extends Component<NavigatorProps, NavigatorStates> {
  constructor(props) {
    super(props);
    this._onNavClick = this._onNavClick.bind(this);
  }
  public _onNavClick (index:number) {
    this.props.changeNavIndex(index);
  }
  public render() {
    return (
      <div styleName="navigator">
        <span styleName={this.props.current_index === 0 ? 'active' : 'normal'} onClick={() => this._onNavClick(0)}>收藏列表</span>
        <span styleName={this.props.current_index === 1 ? 'active' : 'normal'} onClick={() => this._onNavClick(1)}>搜索结果</span>
        <span styleName={this.props.current_index === 2 ? 'active' : 'normal'} onClick={() => this._onNavClick(2)}>当前歌曲</span>
      </div>
    );
  }
}
function map_state_to_props(state:ReduxStates) {
  return {
    current_index: state.currentNavIndex.index,
  };
}
function map_dispatch_to_props() {
  return {
    changeNavIndex,
  };
}
export default connect(map_state_to_props, map_dispatch_to_props())(Navigator);
