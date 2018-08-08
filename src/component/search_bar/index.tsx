import React from 'react';
import { connect } from 'react-redux';
import { fetchMusicsActionCreator } from '../../reducer/song_list';
import CSSModules from 'react-css-modules';
import request from 'superagent';
interface SearchBarProps {
  fetchMusic:typeof fetchMusicsActionCreator;
  musics:any[];
}
interface SearchBarStates {
  searchInput:string;
  need_clear:boolean;
}
@CSSModules(require('./index.scss'), {allowMultiple: true})
class SearchBar extends React.Component<SearchBarProps, SearchBarStates> {
  constructor(props:SearchBarProps) {
    super(props);
    this.state = {
      searchInput: '歌手名/歌名',
      need_clear: true,
    };
    this._onChange = this._onChange.bind(this);
    this._onClick = this._onClick.bind(this);
    this._search = this._search.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }
  private _onChange(e:React.ChangeEvent<HTMLInputElement>) {
    const searchInput = e.currentTarget.value;

    if (searchInput.length !== 0) {
      this.setState({
        need_clear: false,
      });
    }
    this.setState({
      searchInput,
    });
  }
  private _search(e:any) {
    e.preventDefault();
    request.get(`http://localhost:3003/search?keyword=${this.state.searchInput}`)
    .then((res) => {
      this.props.fetchMusic(res.body);
    });
  }
  private _onClick() {
    this.state.need_clear && this.setState({
      searchInput: '',
    });
  }
  private _onBlur(e:any) {
    !e.currentTarget.value && this.setState({
      searchInput: '歌手名/歌名',
      need_clear: true,
    });
  }
  public render() {
    return (
      <div styleName="search bar">
        <form>
          <input type="text" value={this.state.searchInput} onBlur={this._onBlur} onClick={this._onClick} onChange={this._onChange} />
          <button type="submit" onClick={this._search}></button>
        </form>
      </div>
    );
  }
}
function map_states_to_props(ReduxStates) {
  return {
    musics: ReduxStates.musics,
  };
}
function map_dispatch_to_props() {
  return {
    fetchMusic: fetchMusicsActionCreator,
  };
}
export default connect(map_states_to_props, map_dispatch_to_props())(SearchBar);