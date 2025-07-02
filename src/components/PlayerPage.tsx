import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, MoreHorizontal } from 'lucide-react';
import { Song, PlayerState } from '../types/music';

interface PlayerPageProps {
  currentSong: Song;
  playerState: PlayerState;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onToggleFavorite: (songId: string) => void;
}

export default function PlayerPage({
  currentSong,
  playerState,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onToggleFavorite
}: PlayerPageProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full max-w-sm mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
          <span className="text-gray-500 text-sm font-medium">NOW PLAYING</span>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Artist Info */}
      <div className="px-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Best Artist</h1>
        <p className="text-gray-500">18 Compositions</p>
      </div>

      {/* Album Cover */}
      <div className="px-6 mb-8">
        <div 
          className="w-full aspect-square rounded-3xl overflow-hidden shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${currentSong.color}, ${currentSong.color}80)`,
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div 
              className="w-4/5 h-4/5 rounded-2xl bg-cover bg-center shadow-inner"
              style={{
                backgroundImage: `url(${currentSong.coverUrl})`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>{formatTime(playerState.currentTime)}</span>
          <span>{formatTime(currentSong.duration)}</span>
        </div>
        <div 
          className="h-1 bg-gray-200 rounded-full cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = x / rect.width;
            onSeek(percentage * currentSong.duration);
          }}
        >
          <div 
            className="h-full bg-gray-800 rounded-full transition-all duration-300"
            style={{ 
              width: `${(playerState.currentTime / currentSong.duration) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-8 px-6 pb-8">
        <button
          onClick={onPrevious}
          className="p-3 hover:bg-gray-100 rounded-full transition-colors"
        >
          <SkipBack className="w-6 h-6 text-gray-600" />
        </button>

        <button
          onClick={onPlayPause}
          className="p-4 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
        >
          {playerState.isPlaying ? (
            <Pause className="w-8 h-8 text-white" />
          ) : (
            <Play className="w-8 h-8 text-white ml-1" />
          )}
        </button>

        <button
          onClick={onNext}
          className="p-3 hover:bg-gray-100 rounded-full transition-colors"
        >
          <SkipForward className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Song Info */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {currentSong.title}
            </h3>
            <p className="text-gray-500 text-sm truncate">
              {currentSong.artist}
            </p>
          </div>
          <button
            onClick={() => onToggleFavorite(currentSong.id)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-4"
          >
            <Heart 
              className={`w-5 h-5 ${
                currentSong.isFavorite 
                  ? 'text-red-500 fill-current' 
                  : 'text-gray-400'
              }`} 
            />
          </button>
        </div>
      </div>
    </div>
  );
}