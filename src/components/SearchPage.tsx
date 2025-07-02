import React, { useState } from 'react';
import { Search, ArrowLeft, TrendingUp } from 'lucide-react';
import { Song } from '../types/music';

interface SearchPageProps {
  songs: Song[];
  onSongSelect: (song: Song) => void;
  onBack: () => void;
}

export default function SearchPage({ songs, onSongSelect, onBack }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredSongs = searchQuery.trim() === '' 
    ? songs.slice(0, 6) // Show trending songs when no search
    : songs.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.album.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const trendingSearches = ['Pop hits', 'Rock classics', 'Indie vibes', 'Electronic', 'Jazz'];

  return (
    <div className="flex flex-col h-full max-w-sm mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center p-6 pb-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-3"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Search</h1>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search songs, artists, albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        {searchQuery.trim() === '' ? (
          <>
            {/* Trending Searches */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Trending Searches
              </h3>
              <div className="space-y-2">
                {trendingSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(search)}
                    className="block w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <span className="text-gray-700">{search}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Songs */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Right Now</h3>
              <div className="space-y-3">
                {filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group"
                    onClick={() => onSongSelect(song)}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl mr-4"
                      style={{
                        backgroundImage: `url(${song.coverUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate group-hover:text-gray-700">
                        {song.title}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {song.artist}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Search Results */
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Results for "{searchQuery}"
            </h3>
            {filteredSongs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No songs found</p>
                <p className="text-sm text-gray-400 mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group"
                    onClick={() => onSongSelect(song)}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl mr-4"
                      style={{
                        backgroundImage: `url(${song.coverUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate group-hover:text-gray-700">
                        {song.title}
                      </h4>
                      <p className="text-sm text-gray-500 truncate">
                        {song.artist} • {song.album}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}