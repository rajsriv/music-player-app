import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Shuffle, 
  Repeat, 
  Repeat1,
  Heart,
  ChevronUp,
  ChevronDown,
  List,
  Search
} from 'lucide-react';
import { Song, PlayerState } from '../types/music';
import BackgroundAnimation from './BackgroundAnimation';
import CircularCarousel from './CircularCarousel';
import PlaylistView from './PlaylistView';
import SongLibrary from './SongLibrary';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface MusicPlayerProps {
  songs: Song[];
  playlists: any[];
}

export default function MusicPlayer({ songs, playlists }: MusicPlayerProps) {
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentSong: songs[0],
    isPlaying: false,
    currentTime: 0,
    volume: 50,
    isShuffled: false,
    repeatMode: 'none',
    isMinimized: false,
  });

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songs);
  
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
        videoId: songs[0]?.youtubeId || 'dQw4w9WgXcQ',
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

  // Filter songs based on search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.album.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  }, [searchQuery, songs]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = (currentSongIndex + 1) % songs.length;
    }
    
    setCurrentSongIndex(nextIndex);
    setPlayerState(prev => ({ 
      ...prev, 
      currentSong: songs[nextIndex], 
      currentTime: 0 
    }));
    
    youtubePlayerRef.current.loadVideoById(songs[nextIndex].youtubeId);
    if (playerState.isPlaying) {
      youtubePlayerRef.current.playVideo();
    }
  }, [currentSongIndex, songs, playerState.isShuffled, playerState.isPlaying]);

  const handlePrevious = useCallback(() => {
    if (!youtubePlayerRef.current || !youtubePlayerRef.current.loadVideoById) return;
    
    const prevIndex = currentSongIndex > 0 ? currentSongIndex - 1 : songs.length - 1;
    setCurrentSongIndex(prevIndex);
    setPlayerState(prev => ({ 
      ...prev, 
      currentSong: songs[prevIndex], 
      currentTime: 0 
    }));
    
    youtubePlayerRef.current.loadVideoById(songs[prevIndex].youtubeId);
    if (playerState.isPlaying) {
      youtubePlayerRef.current.playVideo();
    }
  }, [currentSongIndex, songs, playerState.isPlaying]);

  const handleSongSelect = useCallback((index: number) => {
    if (!youtubePlayerRef.current || !youtubePlayerRef.current.loadVideoById) return;
    
    setCurrentSongIndex(index);
    setPlayerState(prev => ({ 
      ...prev, 
      currentSong: songs[index], 
      currentTime: 0 
    }));
    
    youtubePlayerRef.current.loadVideoById(songs[index].youtubeId);
    if (playerState.isPlaying) {
      youtubePlayerRef.current.playVideo();
    }
  }, [songs, playerState.isPlaying]);

  const handleVolumeChange = (volume: number) => {
    setPlayerState(prev => ({ ...prev, volume }));
    if (youtubePlayerRef.current && youtubePlayerRef.current.setVolume) {
      youtubePlayerRef.current.setVolume(volume);
    }
  };

  const handleSeek = (time: number) => {
    if (youtubePlayerRef.current && youtubePlayerRef.current.seekTo) {
      youtubePlayerRef.current.seekTo(time);
      setPlayerState(prev => ({ ...prev, currentTime: time }));
    }
  };

  const toggleShuffle = () => {
    setPlayerState(prev => ({ ...prev, isShuffled: !prev.isShuffled }));
  };

  const toggleRepeat = () => {
    const modes: Array<'none' | 'one' | 'all'> = ['none', 'all', 'one'];
    const currentIndex = modes.indexOf(playerState.repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setPlayerState(prev => ({ ...prev, repeatMode: nextMode }));
  };

  const toggleFavorite = (songId: string) => {
    // This would typically update the song in a database or state management system
    console.log('Toggle favorite for song:', songId);
  };

  const currentSong = playerState.currentSong;
  if (!currentSong) return null;

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background Animation */}
      <BackgroundAnimation 
        color={currentSong.color} 
        coverUrl={currentSong.coverUrl} 
      />

      {/* Hidden YouTube Player */}
      <div id="youtube-player" className="youtube-player" />

      {/* Circular Carousel */}
      <CircularCarousel
        songs={songs}
        currentIndex={currentSongIndex}
        onSongSelect={handleSongSelect}
      />

      {/* Main Player Interface */}
      <div className={`fixed bottom-0 left-0 right-0 transition-all duration-500 ease-in-out ${
        isMinimized ? 'translate-y-[calc(100%-80px)]' : 'translate-y-0'
      }`}>
        <div className="glassmorphic border-t border-white/20 p-6 mx-4 mb-4 rounded-t-3xl">
          {/* Minimize/Maximize Button */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 p-2 glassmorphic rounded-full hover:bg-white/20 transition-colors"
          >
            {isMinimized ? (
              <ChevronUp className="w-5 h-5 text-white" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white" />
            )}
          </button>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-white/70 mb-2">
              <span>{formatTime(playerState.currentTime)}</span>
              <span>{formatTime(currentSong.duration)}</span>
            </div>
            <div 
              className="h-1 bg-white/20 rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = x / rect.width;
                handleSeek(percentage * currentSong.duration);
              }}
            >
              <div 
                className="h-full bg-gradient-to-r from-white to-white/80 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(playerState.currentTime / currentSong.duration) * 100}%` 
                }}
              />
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Song Info */}
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden mr-4 animate-float">
                  <img 
                    src={currentSong.coverUrl} 
                    alt={currentSong.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-lg font-semibold truncate text-shadow">
                    {currentSong.title}
                  </h3>
                  <p className="text-white/70 text-sm truncate">
                    {currentSong.artist} • {currentSong.album}
                  </p>
                </div>
                <button
                  onClick={() => toggleFavorite(currentSong.id)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      currentSong.isFavorite 
                        ? 'text-red-400 fill-current' 
                        : 'text-white/70'
                    }`} 
                  />
                </button>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center space-x-6 mb-6">
                <button
                  onClick={toggleShuffle}
                  className={`p-2 rounded-full transition-colors ${
                    playerState.isShuffled 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Shuffle className="w-5 h-5" />
                </button>

                <button
                  onClick={handlePrevious}
                  className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <SkipBack className="w-6 h-6" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="p-4 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 hover:scale-105"
                >
                  {playerState.isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <SkipForward className="w-6 h-6" />
                </button>

                <button
                  onClick={toggleRepeat}
                  className={`p-2 rounded-full transition-colors ${
                    playerState.repeatMode !== 'none'
                      ? 'bg-white/20 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {playerState.repeatMode === 'one' ? (
                    <Repeat1 className="w-5 h-5" />
                  ) : (
                    <Repeat className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-3 mb-6">
                <button
                  onClick={() => handleVolumeChange(playerState.volume > 0 ? 0 : 50)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {playerState.volume > 0 ? (
                    <Volume2 className="w-5 h-5" />
                  ) : (
                    <VolumeX className="w-5 h-5" />
                  )}
                </button>
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={playerState.volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                <span className="text-white/70 text-sm w-8">
                  {playerState.volume}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowLibrary(!showLibrary)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    showLibrary 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Search className="w-4 h-4 mr-2 inline" />
                  Library
                </button>
                <button
                  onClick={() => setShowPlaylists(!showPlaylists)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    showPlaylists 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <List className="w-4 h-4 mr-2 inline" />
                  Playlists
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Song Library Overlay */}
      {showLibrary && (
        <SongLibrary
          songs={filteredSongs}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSongSelect={(song) => {
            const index = songs.findIndex(s => s.id === song.id);
            if (index !== -1) handleSongSelect(index);
            setShowLibrary(false);
          }}
          onClose={() => setShowLibrary(false)}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {/* Playlists Overlay */}
      {showPlaylists && (
        <PlaylistView
          playlists={playlists}
          onClose={() => setShowPlaylists(false)}
          onSongSelect={(song) => {
            const index = songs.findIndex(s => s.id === song.id);
            if (index !== -1) handleSongSelect(index);
            setShowPlaylists(false);
          }}
        />
      )}
    </div>
  );
}