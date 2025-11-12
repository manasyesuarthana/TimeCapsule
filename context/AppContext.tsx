
import React from 'react';
import { Page, UserPreferences, Song, YearData } from '../types';

interface AppContextType {
  currentPage: Page;
  navigateTo: (page: Page, context?: any) => void;
  pageContext: any;
  userPreferences: UserPreferences | null;
  setUserPreferences: React.Dispatch<React.SetStateAction<UserPreferences | null>>;
  currentTrack: Song | null;
  setCurrentTrack: React.Dispatch<React.SetStateAction<Song | null>>;
  yearDataCache: Record<number, YearData>;
  setYearDataCache: React.Dispatch<React.SetStateAction<Record<number, YearData>>>;
}

export const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
