
import React, { useState } from 'react';
import { Page, UserPreferences, Song, YearData } from './types';
import { AppContext } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { LandingPage } from './pages/LandingPage';
import { PreferencesPage } from './pages/PreferencesPage';
import { TimelinePage } from './pages/TimelinePage';
import { YearDetailPage } from './pages/YearDetailPage';
import { CommunityPage } from './pages/CommunityPage';
import { ProfilePage } from './pages/ProfilePage';
import { RevivalPage } from './pages/RevivalPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Landing);
  const [pageContext, setPageContext] = useState<any>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Song | null>(null);
  const [yearDataCache, setYearDataCache] = useState<Record<number, YearData>>({});

  const navigateTo = (page: Page, context: any = null) => {
    setCurrentPage(page);
    setPageContext(context);
    window.scrollTo(0, 0);
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case Page.Landing:
        return <LandingPage />;
      case Page.Preferences:
        return <PreferencesPage />;
      case Page.Timeline:
        return <TimelinePage />;
      case Page.YearDetail:
        return <YearDetailPage />;
      case Page.Community:
        return <CommunityPage />;
      case Page.Profile:
        return <ProfilePage />;
      case Page.Revival:
        return <RevivalPage />;
      default:
        return <LandingPage />;
    }
  };

  const contextValue = {
    currentPage,
    navigateTo,
    pageContext,
    userPreferences,
    setUserPreferences,
    currentTrack,
    setCurrentTrack,
    yearDataCache,
    setYearDataCache,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="flex flex-col min-h-screen">
        {currentPage !== Page.Landing && <Header />}
        <div className="flex-grow">
          {renderPage()}
        </div>
        {currentPage !== Page.Landing && <Footer />}
        <MusicPlayer />
      </div>
    </AppContext.Provider>
  );
};

export default App;
