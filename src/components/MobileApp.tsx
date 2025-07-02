import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Song, PlayerState, AppPage, Artist, Playlist } from '../types/music';
import { mockSongs, mockArtists, mockPlaylists } from '../data/mockData';
import Navigation from './Navigation';
import PlayerPage from './PlayerPage';
import PopularPage from './PopularPage';
import ArtistPage from './ArtistPage';
import PlaylistsPage from './PlaylistsPage';
import SearchPage from './SearchPage';
import PlaylistView from './PlaylistView';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function MobileApp() {
  const [currentPage, setCurrentPage] = useState<AppPage>('player');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [showPlaylistDetail, setShowPlaylistDetail] = useState(false);
  
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentSong: mockSongs[0],
    isPlaying: false,
    currentTime: 0,
    volume: 50,
    isShuffled: false,
    repeatMode: 'none',
    isMinimized: false,
  });

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const youtubePlayerRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Initialize YouTube API
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(script);

    window.onYouTubeIframeAPIReady = () => {
      youtubePlayerRef.current = new window.YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: mockSongs[0]?.youtubeId || 'dQw4w9WgXcQ',
        playerVars: {
          autoplay: 0,
          controls: 0,
        },
        events: {
          onReady: () => console.log('YouTube player ready'),
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              handleNext();
            }
          },
        },
      });
    };

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Update current time
  useEffect(() => {
    if (playerState.isPlaying && youtubePlayerRef.current) {
      intervalRef.current = setInterval(() => {
        if (youtubePlayerRef.current && youtubePlayerRef.current.getCurrentTime) {
          const currentTime = youtubePlayerRef.current.getCurrentTime();
          setPlayerState(prev => ({ ...prev, currentTime }));
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [playerState.isPlaying]);

  const handlePlayPause = useCallback(() => {
    if (!youtubePlayerRef.current || !youtubePlayerRef.current.playVideo) return;

    if (playerState.isPlaying) {
      youtubePlayerRef.current.pauseVideo();
    } else {
      youtubePlayerRef.current.playVideo();
    }
    
    setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, [playerState.isPlaying]);

  const handleNext = useCallback(() => {
    if (!youtubePlayerRef.current || !youtubePlayerRef.current.loadVideoById) return;
    
    let nextIndex;
    if (playerState.isShuffled) {
      nextIndex = Math.floor(Math.random() * mockSongs.length);
    } else {
      nextIndex = (currentSongIndex + 1) % mockSongs.length;
    }
    
    setCurrentSongIndex(nextIndex);
    setPlayerState(prev => ({ 
      ...prev, 
      currentSong: mockSongs[nextIndex], 
      currentTime: 0 
    }));
    
    youtubePlayerRef.current.loadVideoById(mockSongs[nextIndex].youtubeId);
    if (playerState.isPlaying) {
      youtubePlayerRef.current.playVideo();
    }
  }, [currentSongIndex, playerState.isShuffled, playerState.isPlaying]);

  const handlePrevious = useCallback(() => {
    if (!youtubePlayerRef.current || !youtubePlayerRef.current.loadVideoById) return;
    
    const prevIndex = currentSongIndex > 0 ? currentSongIndex - 1 : mockSongs.length - 1;
    setCurrentSongIndex(prevIndex);
    setPlayerState(prev => ({ 
      ...prev, 
      currentSong: mockSongs[prevIndex], 
      currentTime: 0 
    }));
    
    youtubePlayerRef.current.loadVideoById(mockSongs[prevIndex].youtubeId);
    if (playerState.isPlaying) {
      youtubePlayerRef.current.playVideo();
    }
  }, [currentSongIndex, playerState.isPlaying]);

  const handleSongSelect = useCallback((song: Song) => {
    if (!youtubePlayerRef.current || !youtubePlayerRef.current.loadVideoById) return;
    
    const index = mockSongs.findIndex(s => s.id === song.id);
    if (index !== -1) {
      setCurrentSongIndex(index);
      setPlayerState(prev => ({ 
        ...prev, 
        currentSong: song, 
        currentTime: 0 
      }));
      
      youtubePlayerRef.current.loadVideoById(song.youtubeId);
      if (playerState.isPlaying) {
        youtubePlayerRef.current.playVideo();
      }
    }
    
    // Navigate to player page when song is selected
    setCurrentPage('player');
  }, [playerState.isPlaying]);

  const handleSeek = (time: number) => {
    if (youtubePlayerRef.current && youtubePlayerRef.current.seekTo) {
      youtubePlayerRef.current.seekTo(time);
      setPlayerState(prev => ({ ...prev, currentTime: time }));
    }
  };

  const toggleFavorite = (songId: string) => {
    // This would typically update the song in a database or state management system
    console.log('Toggle favorite for song:', songId);
  };

  const handlePageChange = (page: AppPage) => {
    setCurrentPage(page);
    setSelectedArtist(null);
    setSelectedPlaylist(null);
    setShowPlaylistDetail(false);
  };

  const handleArtistSelect = (artist: Artist) => {
    setSelectedArtist(artist);
  };

  const handlePlaylistSelect = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setShowPlaylistDetail(true);
  };

  const renderCurrentPage = () => {
    if (showPlaylistDetail && selectedPlaylist) {
      return (
        <PlaylistView
          playlists={[selectedPlaylist]}
          onClose={() => setShowPlaylistDetail(false)}
          onSongSelect={handleSongSelect}
        />
      );
    }

    if (selectedArtist) {
      return (
        <ArtistPage
          artist={selectedArtist}
          onSongSelect={handleSongSelect}
          onBack={() => setSelectedArtist(null)}
          onToggleFavorite={toggleFavorite}
        />
      );
    }

    switch (currentPage) {
      case 'player':
        return (
          <PlayerPage
            currentSong={playerState.currentSong!}
            playerState={playerState}
            onPlayPause={handlePlayPause}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSeek={handleSeek}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'popular':
        return (
          <PopularPage
            songs={mockSongs}
            onSongSelect={handleSongSelect}
            onBack={() => setCurrentPage('player')}
          />
        );
      case 'artist':
        return (
          <div className="flex flex-col h-full max-w-sm mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Artists</h1>
              <div className="space-y-4">
                {mockArtists.map((artist) => (
                  <div
                    key={artist.id}
                    className="flex items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer"
                    onClick={() => handleArtistSelect(artist)}
                  >
                    <div 
                      className="w-16 h-16 rounded-2xl mr-4"
                      style={{
                        backgroundImage: `url(${artist.coverUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{artist.name}</h3>
                      <p className="text-gray-500 text-sm">{artist.genre}</p>
                      <p className="text-gray-400 text-xs">{artist.compositions} compositions</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'playlists':
        return (
          <PlaylistsPage
            playlists={mockPlaylists}
            onPlaylistSelect={handlePlaylistSelect}
            onBack={() => setCurrentPage('player')}
          />
        );
      case 'search':
        return (
          <SearchPage
            songs={mockSongs}
            onSongSelect={handleSongSelect}
            onBack={() => setCurrentPage('player')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-4 pb-20">
      {/* Hidden YouTube Player */}
      <div id="youtube-player" className="youtube-player" />
      
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen">
        {renderCurrentPage()}
      </div>

      {/* Navigation */}
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
}