
export enum Page {
  Landing = 'LANDING',
  Preferences = 'PREFERENCES',
  Timeline = 'TIMELINE',
  YearDetail = 'YEAR_DETAIL',
  Community = 'COMMUNITY',
  Profile = 'PROFILE',
  Revival = 'REVIVAL',
}

export interface Song {
  title: string;
  artist: string;
}

export interface Movie {
  title: string;
  synopsis: string;
}

export interface Trend {
    name: string;
    description: string;
}

export interface EventItem {
  description: string;
  date: string;
}

export interface YearData {
  year: number;
  tagline: string;
  topSongs: Song[];
  topMovies: Movie[];
  fashionTrends: Trend[];
  worldEvents: EventItem[];
  imagePrompt?: string;
  imageUrl?: string;
}

export interface UserPreferences {
  era: [number, number];
  interests: string[];
  nickname: string;
  avatar: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  yearTag?: number;
  reactions: Record<string, number>;
  isUser: boolean;
}
