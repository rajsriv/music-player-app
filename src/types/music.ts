export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  youtubeId?: string;
  color: string;
  isFavorite: boolean;
  plays?: number;
  genre?: string;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  compositions: number;
  coverUrl: string;
  color: string;
  topSongs: Song[];
  bio?: string;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
  coverUrl: string;
  color: string;
  description?: string;
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isShuffled: boolean;
  repeatMode: 'none' | 'one' | 'all';
  isMinimized: boolean;
}

export type AppPage = 'player' | 'popular' | 'artist' | 'playlists' | 'search';