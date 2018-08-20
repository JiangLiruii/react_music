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
  constructor(props:SearchBarProps) {
    super(props);
    this.state = {
      searchInput: '歌手名/歌名',
      need_clear: true,
      show_tip_list: false,
    };
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
        need_clear: false,
      });
    }
    this.setState({
      searchInput,
      show_tip_list: true,
    });
  }
  private _search(e:any) {
    e.preventDefault();
    this.props.changeNavIndex(1);
    this.props.fetchMusic({name: this.state.searchInput, page: 1, pagesize: 20});
  }
  private _onClick() {
    this.state.need_clear && this.setState({
      searchInput: '',
    });
    this.setState({
      show_tip_list: true,
    });
  }
  private _onBlur(e:any) {
    console.log(e);
    !e.target.value && this.setState({
      searchInput: '歌手名/歌名',
      need_clear: true,
    });
    setTimeout(() => this.setState({
      show_tip_list: false,
    }), 300);
  }
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
        <form onBlur={this._onBlur}>
          <input type="text" value={value} onClick={this._onClick} onChange={this._onChange} />
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