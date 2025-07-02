import React from 'react';
import { Plus, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { Playlist } from '../types/music';

interface PlaylistsPageProps {
  playlists: Playlist[];
  onPlaylistSelect: (playlist: Playlist) => void;
  onBack: () => void;
}

export default function PlaylistsPage({ playlists, onPlaylistSelect, onBack }: PlaylistsPageProps) {
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
        <h1 className="text-xl font-bold text-gray-900">Playlists</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Playlists Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="grid grid-cols-2 gap-4">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="cursor-pointer group"
              onClick={() => onPlaylistSelect(playlist)}
            >
              <div className="relative mb-3">
                <div 
                  className="w-full aspect-square rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow"
                  style={{
                    background: `linear-gradient(135deg, ${playlist.color}, ${playlist.color}80)`,
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div 
                      className="w-4/5 h-4/5 rounded-xl bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${playlist.coverUrl})`,
                      }}
                    />
                  </div>
                </div>
                
                {/* Add button for first playlist */}
                {playlist.id === '1' && (
                  <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-colors">
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-gray-700 transition-colors">
                  {playlist.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {playlist.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}