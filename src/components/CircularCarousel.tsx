import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Song } from '../types/music';

interface CircularCarouselProps {
  songs: Song[];
  currentIndex: number;
  onSongSelect: (index: number) => void;
  className?: string;
}

export default function CircularCarousel({ 
  songs, 
  currentIndex, 
  onSongSelect, 
  className = '' 
}: CircularCarouselProps) {
  const [displayedSongs, setDisplayedSongs] = useState<Song[]>([]);
  const radius = 120;
  const itemSize = 60;

  useEffect(() => {
    // Create circular array for infinite scroll effect
    const extendedSongs = [...songs, ...songs, ...songs];
    setDisplayedSongs(extendedSongs);
  }, [songs]);

  const getItemStyle = (index: number, total: number) => {
    const angle = (360 / total) * index - 90; // Start from top
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    
    return {
      transform: `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
      zIndex: index === currentIndex ? 10 : 1,
    };
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1;
    onSongSelect(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < songs.length - 1 ? currentIndex + 1 : 0;
    onSongSelect(newIndex);
  };

  return (
    <div className={`fixed bottom-4 right-4 ${className}`}>
      <div className="relative w-64 h-64 glassmorphic rounded-full p-4">
        {/* Center controls */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Circular song items */}
        <div className="absolute inset-0 flex items-center justify-center">
          {displayedSongs.slice(0, Math.min(8, songs.length)).map((song, index) => (
            <div
              key={`${song.id}-${index}`}
              className="absolute cursor-pointer transition-all duration-300 hover:scale-110"
              style={getItemStyle(index, Math.min(8, songs.length))}
              onClick={() => onSongSelect(index % songs.length)}
            >
              <div 
                className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                  index % songs.length === currentIndex 
                    ? 'border-white scale-125' 
                    : 'border-white/50'
                }`}
                style={{
                  backgroundImage: `url(${song.coverUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          ))}
        </div>

        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            strokeDasharray={`${(currentIndex / songs.length) * 301.59} 301.59`}
            className="transition-all duration-500"
          />
        </svg>
      </div>
    </div>
  );
}