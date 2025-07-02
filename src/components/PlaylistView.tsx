import React, { useState } from 'react';
import { X, Play, Heart, Music, ChevronRight } from 'lucide-react';
import { Playlist, Song } from '../types/music';

interface PlaylistViewProps {
  playlists: Playlist[];
  onClose: () => void;
  onSongSelect: (song: Song) => void;
}

export default function PlaylistView({ playlists, onClose, onSongSelect }: PlaylistViewProps) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalDuration = (songs: Song[]) => {
    return songs.reduce((total, song) => total + song.duration, 0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl max-h-[85vh] glassmorphic rounded-3xl overflow-hidden">
        {!selectedPlaylist ? (
          // Playlist Grid View
          <>
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white text-shadow">Your Playlists</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playlists.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="group glassmorphic-dark rounded-2xl p-6 cursor-pointer hover:bg-white/15 transition-all duration-300 hover:scale-105"
                    onClick={() => setSelectedPlaylist(playlist)}
                  >
                    <div className="relative mb-4">
                      <div 
                        className="w-full aspect-square rounded-xl overflow-hidden"
                        style={{
                          backgroundImage: `url(${playlist.coverUrl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                            <Play className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-white font-semibold text-lg mb-2 text-shadow">
                      {playlist.name}
                    </h3>
                    <p className="text-white/60 text-sm flex items-center">
                      <Music className="w-4 h-4 mr-1" />
                      {playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      {formatTime(getTotalDuration(playlist.songs))} total
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          // Selected Playlist Detail View
          <>
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <button
                    onClick={() => setSelectedPlaylist(null)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors mr-3"
                  >
                    <ChevronRight className="w-5 h-5 text-white rotate-180" />
                  </button>
                  <h2 className="text-2xl font-bold text-white text-shadow">
                    {selectedPlaylist.name}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div 
                  className="w-20 h-20 rounded-xl overflow-hidden"
                  style={{
                    backgroundImage: `url(${selectedPlaylist.coverUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <div>
                  <p className="text-white/70 text-sm">
                    {selectedPlaylist.songs.length} song{selectedPlaylist.songs.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-white/50 text-xs">
                    {formatTime(getTotalDuration(selectedPlaylist.songs))} total duration
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar max-h-96">
              <div className="space-y-2">
                {selectedPlaylist.songs.map((song, index) => (
                  <div
                    key={song.id}
                    className="group flex items-center p-4 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    onClick={() => onSongSelect(song)}
                  >
                    {/* Track Number */}
                    <div className="w-8 text-center mr-4">
                      <span className="text-white/50 text-sm group-hover:hidden">
                        {index + 1}
                      </span>
                      <Play className="w-4 h-4 text-white hidden group-hover:block mx-auto" />
                    </div>

                    {/* Album Cover */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden mr-4">
                      <img
                        src={song.coverUrl}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Song Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate group-hover:text-white/90">
                        {song.title}
                      </h3>
                      <p className="text-white/60 text-sm truncate">
                        {song.artist}
                      </p>
                    </div>

                    {/* Album */}
                    <div className="hidden md:block text-white/50 text-sm mr-4 min-w-0 flex-1">
                      <p className="truncate">{song.album}</p>
                    </div>

                    {/* Duration */}
                    <div className="text-white/50 text-sm mr-4">
                      {formatTime(song.duration)}
                    </div>

                    {/* Favorite Indicator */}
                    {song.isFavorite && (
                      <Heart className="w-4 h-4 text-red-400 fill-current" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}