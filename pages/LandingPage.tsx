import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Page } from '../types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Icon } from '../components/Icon';

export const LandingPage: React.FC = () => {
  const { navigateTo } = useAppContext();

  const features = [
    { icon: 'music' as const, title: 'Retro Music Player', description: 'Hear the hits from your favorite years.' },
    { icon: 'film' as const, title: 'Curated Timelines', description: 'Explore pop culture year by year.' },
    { icon: 'chat' as const, title: 'Share Memories', description: 'Connect with others in the community.' },
  ];

  return (
    <main className="bg-xp-gray">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://picsum.photos/seed/nostalgia/1920/1080" alt="Nostalgic collage" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 p-4">
          <h1 className="text-[40px] leading-[48px] md:text-6xl font-sans font-bold mb-4" style={{textShadow: '0 2px 6px rgba(0,0,0,0.5)'}}>Scroll through time.</h1>
          <p className="text-lg md:text-xl font-sans max-w-3xl mx-auto leading-relaxed">Relive the sound, style, and stories from 1998–2005. A curated nostalgia timeline just for you.</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" onClick={() => navigateTo(Page.Preferences)} className="w-full sm:w-auto">Start Your Journey</Button>
            <Button variant="secondary" onClick={() => navigateTo(Page.Timeline)} className="w-full sm:w-auto text-white !border-white hover:bg-white/20">Continue as Guest</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-xp-gray">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {features.map((feature) => (
              <div key={feature.title} className="p-6">
                <div className="flex items-center justify-center mb-4">
                    <div className="bg-xp-gray p-4 border-2 border-t-xp-border-light border-l-xp-border-light border-r-xp-border-dark border-b-xp-border-dark">
                        <Icon name={feature.icon} className="h-8 w-8 text-xp-blue-dark" />
                    </div>
                </div>
                <h3 className="text-[28px] leading-9 font-sans font-semibold text-xp-text mb-2">{feature.title}</h3>
                <p className="text-xp-text/80 text-base leading-6">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};