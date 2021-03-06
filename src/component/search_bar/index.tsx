import React from 'react';
import { connect } from 'react-redux';
import { fetchMusicsAsyncActionCreator } from '../../reducer/song_list';
import CSSModules from 'react-css-modules';
import { changeNavIndex } from '../../reducer/navigator';
import { getSearchTip } from '../../reducer/search_tip';
import { ReduxStates } from '../../reducer/ReduxStates';
interface SearchBarProps {
  fetchMusic:typeof fetchMusicsAsyncActionCreator;
  changeNavIndex:typeof changeNavIndex;
  tips_list:any[];
  getSearchTip:typeof getSearchTip;
}
interface SearchBarStates {
  searchInput:string;
  need_clear:boolean;
  show_tip_list:boolean;
}
@CSSModules(require('./index.scss'), {allowMultiple: true})
class SearchBar extends React.Component<SearchBarProps, SearchBarStates> {
  private timer;
  private input_ref;
  constructor(props:SearchBarProps) {
    super(props);
    this.state = {
      searchInput: '歌手名/歌名',
      need_clear: false,
      show_tip_list: false,
    };
    this.input_ref = React.createRef();
    this._onChange = this._onChange.bind(this);
    this._onClick = this._onClick.bind(this);
    this._search = this._search.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onTipClick = this._onTipClick.bind(this);
  }
  private _onChange(e:React.ChangeEvent<HTMLInputElement>) {
    const searchInput = e.currentTarget.value;
    this.props.getSearchTip(searchInput);
    if (searchInput.length !== 0) {
      this.setState({
        show_tip_list: true,
      });
    }
    this.setState({
      searchInput,
      show_tip_list: true,
    });
  }
  /**
   * 在输入框输入错误后的抖动提示函数
   * @param times 抖动的次数
   */
  private _shakeAnimation(times:number) {
    const input_dom = this.input_ref.current;
    input_dom.animate([{left: '-10px'}, {left: 0}, {left: '10px'}], {duration: 100, iterations: times, easing: 'ease-in-out', direction: 'alternate'});
  }
  // 不能输入颜文字
  private _validateString(name:string) {
    return /(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f])|(\ud83d[\ude80-\udeff])/g.test(name);
  }
  // 输入不能为空
  private _empty_test(name:string) {
    return /^(|歌手名\/歌名|请输入要搜索的歌曲|请输入正确的字符)$/.test(name);
  }
  // 点击搜索按钮式
  private _search(e:any) {
    e.preventDefault();
    const empty = this._empty_test(this.state.searchInput);
    const error_formate = this._validateString(this.state.searchInput);
    if (empty || error_formate) {
      this._shakeAnimation(6);
      this.setState({
        searchInput: error_formate ? '请输入正确的字符' : '请输入要搜索的歌曲',
        need_clear: true,
      });
      return;
    }
    this.props.changeNavIndex(1);
    this.props.fetchMusic({name: this.state.searchInput, page: 1, pagesize: 20});
  }
  // 点击input框时
  private _onClick() {
    this._empty_test(this.state.searchInput) && this.setState({
      searchInput: '',
      need_clear: false,
    });
  }
  // 失焦 input时
  private _onBlur(e:any) {
    !this.state.searchInput && this.setState({
      searchInput: '歌手名/歌名',
      need_clear: true,
    });
    setTimeout(() => this.setState({
      show_tip_list: false,
    }), 300);
  }
  // 当建议被点击
  private _onTipClick(e:any) {
    const searchInput = e.target.innerText;
    this.setState({
      searchInput,
      show_tip_list: false,
    });
    this.props.changeNavIndex(1);
    this.props.fetchMusic({name: searchInput, page: 1, pagesize: 20});
  }
  public render() {
    const value = this.state.searchInput;
    const need_tip = this.state.show_tip_list && this.props.tips_list.length > 0;
    return (
      <div styleName="search bar">
        <form onBlur={this._onBlur} ref={this.input_ref}>
          <input styleName={this.state.need_clear ? 'error_input' : ''}type="text" value={value} onClick={this._onClick} onChange={this._onChange} />
          <button type="submit" onClick={this._search}></button>
          <div styleName={'search_recommend ' + (((!value.length || value == '歌手名/歌名') || !need_tip) ? 'hide' : '')} >
            <dl onClick={this._onTipClick}>
              {this.props.tips_list.map((tip, index) => {
                return <dd key={index}>{tip}</dd>;
              })}
            </dl>
          </div>
        </form>
      </div>
    );
  }
}
function map_states_to_props(state:ReduxStates) {
  return {
    tips_list: state.searchTip.tips_list,
  };
}
function map_dispatch_to_props() {
  return {
    fetchMusic: fetchMusicsAsyncActionCreator,
    changeNavIndex,
    getSearchTip,
  };
}
export default connect(map_states_to_props, map_dispatch_to_props())(SearchBar);