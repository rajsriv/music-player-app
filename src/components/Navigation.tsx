import React from 'react';
import { Home, TrendingUp, User, List, Search } from 'lucide-react';
import { AppPage } from '../types/music';

interface NavigationProps {
  currentPage: AppPage;
  onPageChange: (page: AppPage) => void;
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const navItems = [
    { id: 'player' as AppPage, icon: Home, label: 'Home' },
    { id: 'popular' as AppPage, icon: TrendingUp, label: 'Popular' },
    { id: 'search' as AppPage, icon: Search, label: 'Search' },
    { id: 'artist' as AppPage, icon: User, label: 'Artists' },
    { id: 'playlists' as AppPage, icon: List, label: 'Playlists' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-t border-white/20">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onPageChange(id)}
            className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300 ${
              currentPage === id
                ? 'bg-white/20 text-white scale-105'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}