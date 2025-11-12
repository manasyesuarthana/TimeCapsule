import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Icon } from './Icon';

export const MusicPlayer: React.FC = () => {
  const { currentTrack, setCurrentTrack } = useAppContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentTrack) {
      setIsPlaying(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            // Optionally move to next track here
            return 100;
          }
          return prev + 10; // Simulate 10s clip
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
        setIsPlaying(false);
        setProgress(0);
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
    }
  };

  if (!currentTrack) {
    return null; // Don't render if no track is selected
  }

  const Equalizer = () => (
    <div className="flex items-end space-x-1 h-5">
        <span className={`w-1 bg-neon-pink ${isPlaying ? 'animate-equalizer-1' : 'h-1'}`}></span>
        <span className={`w-1 bg-neon-pink ${isPlaying ? 'animate-equalizer-2' : 'h-1'}`}></span>
        <span className={`w-1 bg-neon-pink ${isPlaying ? 'animate-equalizer-3' : 'h-1'}`}></span>
    </div>
  );
  
  const Button: React.FC<{children: React.ReactNode, onClick?: () => void, 'aria-label': string}> = ({children, ...props}) => (
    <button {...props} className="bg-xp-gray border-2 border-t-xp-border-light border-l-xp-border-light border-r-xp-border-dark border-b-xp-border-dark active:border-t-xp-border-dark active:border-l-xp-border-dark w-8 h-8 flex items-center justify-center">
        {children}
    </button>
  );

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
      <div className="bg-xp-gray text-xp-text p-1 border-2 border-t-xp-border-light border-l-xp-border-light border-r-xp-border-dark border-b-xp-border-dark shadow-window w-80 flex flex-col space-y-1">
        <div className="bg-gradient-to-r from-xp-blue-dark to-xp-blue text-white font-bold py-0.5 px-2 flex items-center justify-between select-none">
            <span>Now Playing...</span>
            <Equalizer />
        </div>

        <div className="p-2">
            <div className="flex items-center space-x-3">
              <img src={`https://picsum.photos/seed/${currentTrack.title}/64/64`} alt="Album Art" className="w-12 h-12 border-2 border-r-xp-border-light border-b-xp-border-light border-l-xp-border-dark border-t-xp-border-dark" />
              <div className="flex-1 overflow-hidden">
                <h4 className="font-bold text-sm truncate" title={currentTrack.title}>{currentTrack.title}</h4>
                <p className="text-xs truncate" title={currentTrack.artist}>{currentTrack.artist}</p>
              </div>
            </div>

            <div className="w-full bg-xp-border-dark mt-2 border-2 border-r-xp-border-light border-b-xp-border-light border-l-xp-border-dark border-t-xp-border-dark h-3 p-0.5">
              <div className="bg-xp-blue h-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <Button aria-label="Previous track"><Icon name="prev" className="w-5 h-5" /></Button>
              <Button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
                <Icon name={isPlaying ? 'pause' : 'play'} className="w-5 h-5"/>
              </Button>
              <Button aria-label="Next track"><Icon name="next" className="w-5 h-5" /></Button>
            </div>
        </div>
      </div>
    </div>
  );
};