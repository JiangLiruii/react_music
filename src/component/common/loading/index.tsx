import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

interface LoadingProps {
  direction:'up'|'down';
}
@CSSModules(require('./index.scss'), {allowMultiple: true})
export default class Loading extends Component<LoadingProps> {
  public render() {
    return (
      <div styleName="container">
          <div styleName="dash uno"></div>
          <div styleName="dash dos"></div>
          <div styleName="dash tres"></div>
          <div styleName="dash cuatro"></div>
        {/* <span>正在加载{this.props.direction === 'up' ? '上' : '下'}一页</span> */}
      </div>
    );
  }
}