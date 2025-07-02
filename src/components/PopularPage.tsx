import React from 'react';
import { Play, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { Song } from '../types/music';

interface PopularPageProps {
  songs: Song[];
  onSongSelect: (song: Song) => void;
  onBack: () => void;
}

export default function PopularPage({ songs, onSongSelect, onBack }: PopularPageProps) {
  const formatPlays = (plays: number) => {
    if (plays >= 1000000) {
      return `${(plays / 1000000).toFixed(1)}M`;
    }
    if (plays >= 1000) {
      return `${(plays / 1000).toFixed(0)}K`;
    }
    return plays.toString();
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
        <h1 className="text-xl font-bold text-gray-900">Popular Songs</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Song List */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="space-y-3">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group"
              onClick={() => onSongSelect(song)}
            >
              {/* Color indicator */}
              <div 
                className="w-4 h-4 rounded-full mr-4 flex-shrink-0"
                style={{ backgroundColor: song.color }}
              />

              {/* Song info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate group-hover:text-gray-700">
                  {song.title}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {song.artist} • {formatPlays(song.plays || 0)} plays
                </p>
              </div>

              {/* Play button */}
              <button className="p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded-full transition-all ml-4">
                <Play className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}