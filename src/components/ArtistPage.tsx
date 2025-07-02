import React from 'react';
import { Play, MoreHorizontal, ArrowLeft, Heart } from 'lucide-react';
import { Artist, Song } from '../types/music';

interface ArtistPageProps {
  artist: Artist;
  onSongSelect: (song: Song) => void;
  onBack: () => void;
  onToggleFavorite: (songId: string) => void;
}

export default function ArtistPage({ artist, onSongSelect, onBack, onToggleFavorite }: ArtistPageProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full max-w-sm mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Artist</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Artist Info */}
      <div className="px-6 mb-6">
        <div className="flex items-center mb-4">
          <div 
            className="w-16 h-16 rounded-2xl mr-4"
            style={{
              backgroundImage: `url(${artist.coverUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{artist.name}</h2>
            <p className="text-gray-500">{artist.genre}</p>
          </div>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors">
            FOLLOW
          </button>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {artist.bio || `${artist.name} is a talented artist with ${artist.compositions} compositions spanning multiple genres.`}
        </p>
      </div>

      {/* Top Songs Section */}
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Top Songs</h3>
          <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            See all
          </button>
        </div>
      </div>

      {/* Song List */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="space-y-3">
          {artist.topSongs.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group"
              onClick={() => onSongSelect(song)}
            >
              {/* Color indicator */}
              <div 
                className="w-4 h-4 rounded-full mr-4 flex-shrink-0"
                style={{ backgroundColor: song.color }}
              />

              {/* Song info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate group-hover:text-gray-700">
                  {song.title}
                </h4>
                <p className="text-sm text-gray-500 truncate">
                  {formatTime(song.duration)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(song.id);
                  }}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      song.isFavorite 
                        ? 'text-red-500 fill-current' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                  <Play className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}