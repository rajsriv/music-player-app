import React from 'react';
import { Search, Heart, Play, X } from 'lucide-react';
import { Song } from '../types/music';

interface SongLibraryProps {
  songs: Song[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSongSelect: (song: Song) => void;
  onClose: () => void;
  onToggleFavorite: (songId: string) => void;
}

export default function SongLibrary({
  songs,
  searchQuery,
  onSearchChange,
  onSongSelect,
  onClose,
  onToggleFavorite
}: SongLibraryProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl max-h-[80vh] glassmorphic rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white text-shadow">Music Library</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
            <input
              type="text"
              placeholder="Search songs, artists, albums..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Song List */}
        <div className="p-6 overflow-y-auto custom-scrollbar max-h-96">
          {songs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/70 text-lg">No songs found</p>
              <p className="text-white/50 text-sm mt-2">Try adjusting your search query</p>
            </div>
          ) : (
            <div className="space-y-2">
              {songs.map((song, index) => (
                <div
                  key={song.id}
                  className="group flex items-center p-4 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  onClick={() => onSongSelect(song)}
                >
                  {/* Album Cover */}
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-4">
                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate group-hover:text-white/90">
                      {song.title}
                    </h3>
                    <p className="text-white/60 text-sm truncate">
                      {song.artist} • {song.album}
                    </p>
                  </div>

                  {/* Duration */}
                  <div className="text-white/50 text-sm mr-4">
                    {formatTime(song.duration)}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(song.id);
                    }}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        song.isFavorite
                          ? 'text-red-400 fill-current'
                          : 'text-white/50 hover:text-white'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/20">
          <p className="text-white/50 text-sm text-center">
            {songs.length} song{songs.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>
    </div>
  );
}