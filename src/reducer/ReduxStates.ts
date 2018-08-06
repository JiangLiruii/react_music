import { SongsState } from './song_list';
import { SongInfo } from './song_single';
import { CurrentSong } from './current_song';

export interface ReduxStates {
  songState:SongsState;
  detailSongState:SongInfo;
  currentSongState:CurrentSong;
}