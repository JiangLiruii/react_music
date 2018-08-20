import { SongsState } from './song_list';
import { SongInfo } from './song_single';
import { CurrentSong } from './current_song';
import { CurrentNavIndex } from './navigator';
import { SearchTip } from './search_tip';
export interface ReduxStates {
  songState:SongsState;
  detailSongState:SongInfo;
  currentSongState:CurrentSong;
  currentNavIndex:CurrentNavIndex;
  searchTip:SearchTip;
}