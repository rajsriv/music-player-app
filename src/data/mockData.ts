import { Song, Playlist, Artist } from '../types/music';

export const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Time',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    duration: 245,
    coverUrl: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    youtubeId: 'dQw4w9WgXcQ',
    color: '#6366f1',
    isFavorite: true,
    plays: 1250000,
    genre: 'Progressive Rock'
  },
  {
    id: '2',
    title: 'Checkmate',
    artist: 'Conan Gray',
    album: 'Superache',
    duration: 198,
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    youtubeId: 'dQw4w9WgXcQ',
    color: '#ec4899',
    isFavorite: false,
    plays: 890000,
    genre: 'Pop'
  },
  {
    id: '3',
    title: 'Never',
    artist: 'Billie Eilish',
    album: 'Happier Than Ever',
    duration: 267,
    coverUrl: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    youtubeId: 'dQw4w9WgXcQ',
    color: '#06b6d4',
    isFavorite: true,
    plays: 2100000,
    genre: 'Alternative'
  },
  {
    id: '4',
    title: 'London',
    artist: 'The 1975',
    album: 'Being Funny in a Foreign Language',
    duration: 312,
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    youtubeId: 'dQw4w9WgXcQ',
    color: '#8b5cf6',
    isFavorite: false,
    plays: 750000,
    genre: 'Indie Rock'
  },
  {
    id: '5',
    title: 'River',
    artist: 'Taylor Swift',
    album: 'folklore',
    duration: 289,
    coverUrl: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    youtubeId: 'dQw4w9WgXcQ',
    color: '#f59e0b',
    isFavorite: true,
    plays: 3200000,
    genre: 'Folk Pop'
  },
  {
    id: '6',
    title: 'Ring',
    artist: 'Arctic Monkeys',
    album: 'AM',
    duration: 223,
    coverUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    youtubeId: 'dQw4w9WgXcQ',
    color: '#ef4444',
    isFavorite: false,
    plays: 1800000,
    genre: 'Indie Rock'
  },
  {
    id: '7',
    title: 'Bang',
    artist: 'AJR',
    album: 'OK ORCHESTRA',
    duration: 201,
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    youtubeId: 'dQw4w9WgXcQ',
    color: '#10b981',
    isFavorite: true,
    plays: 950000,
    genre: 'Indie Pop'
  },
  {
    id: '8',
    title: 'About',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 234,
    coverUrl: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=300',
    audioUrl: '',
    youtubeId: 'dQw4w9WgXcQ',
    color: '#f97316',
    isFavorite: false,
    plays: 2800000,
    genre: 'R&B'
  }
];

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'John Doe',
    genre: 'Rock, Indie',
    compositions: 18,
    coverUrl: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: '#6366f1',
    topSongs: mockSongs.slice(0, 4),
    bio: 'John Doe is a versatile musician known for his unique blend of rock and indie sounds.'
  },
  {
    id: '2',
    name: 'Luna Waves',
    genre: 'Electronic, Ambient',
    compositions: 24,
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: '#ec4899',
    topSongs: mockSongs.slice(1, 5),
    bio: 'Luna Waves creates ethereal electronic music that transports listeners to otherworldly realms.'
  },
  {
    id: '3',
    name: 'Cosmic Orchestra',
    genre: 'Classical, Cinematic',
    compositions: 32,
    coverUrl: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: '#06b6d4',
    topSongs: mockSongs.slice(2, 6),
    bio: 'Cosmic Orchestra specializes in grand, cinematic compositions that tell stories through music.'
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Rock 80s',
    description: 'Lorem ipsum dolor sit amet',
    songs: mockSongs.filter(song => song.isFavorite),
    coverUrl: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: '#dc2626'
  },
  {
    id: '2',
    name: 'Classic Music',
    description: 'Lorem ipsum dolor sit amet',
    songs: mockSongs.slice(0, 3),
    coverUrl: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: '#2563eb'
  },
  {
    id: '3',
    name: 'Electronic Mix',
    description: 'Lorem ipsum dolor sit amet',
    songs: mockSongs.slice(1, 4),
    coverUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: '#ec4899'
  },
  {
    id: '4',
    name: 'Indie Vibes',
    description: 'Lorem ipsum dolor sit amet',
    songs: mockSongs.slice(3, 7),
    coverUrl: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=300',
    color: '#059669'
  }
];