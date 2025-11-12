import React from 'react';
import { useAppContext } from '../context/AppContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Card } from '../components/Card';
import { Icon } from '../components/Icon';
import { Song, Movie, Trend, EventItem } from '../types';

export const YearDetailPage: React.FC = () => {
    const { pageContext, yearDataCache, setCurrentTrack } = useAppContext();
    const year = pageContext?.year;
    const data = yearDataCache[year];

    if (!year || !data) {
        return <div className="py-20 text-center"><LoadingSpinner text={`Loading data for ${year}...`} /></div>;
    }

    const { tagline, topSongs, topMovies, fashionTrends, worldEvents } = data;

    const MediaListItem: React.FC<{item: Song | Movie, type: 'song' | 'movie'}> = ({ item, type }) => (
        <div className="flex items-center space-x-4 p-2 hover:bg-blue-100 transition-colors duration-200">
            <img src={`https://picsum.photos/seed/${item.title}/80/80`} alt={item.title} className="w-12 h-12 border-2 border-t-xp-border-dark border-l-xp-border-dark border-b-xp-border-light border-r-xp-border-light object-cover"/>
            <div className="flex-1">
                <p className="font-bold text-xp-text text-base leading-6">{item.title}</p>
                {'artist' in item && <p className="text-sm text-xp-text/80 leading-5">{item.artist}</p>}
            </div>
            {type === 'song' && (
                <button onClick={() => setCurrentTrack(item as Song)} className="w-8 h-8 flex items-center justify-center bg-xp-gray border-2 border-t-xp-border-light border-l-xp-border-light border-r-xp-border-dark border-b-xp-border-dark text-xp-blue-dark hover:bg-gray-200 transition">
                    <Icon name="play" className="w-5 h-5"/>
                </button>
            )}
        </div>
    );

    return (
        <main className="bg-xp-gray">
            {/* Hero Section */}
            <section className="relative h-64 md:h-80 flex items-end p-6 md:p-8 text-white">
                 <img src={`https://picsum.photos/seed/${year}-detail/1920/500`} alt={`${year} collage`} className="absolute inset-0 w-full h-full object-cover"/>
                 <div className="absolute inset-0 bg-black/50"></div>
                 <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-sans font-bold" style={{textShadow: '0 2px 4px rgba(0,0,0,0.8)'}}>{year}</h1>
                    <p className="text-lg md:text-xl mt-2 leading-relaxed" style={{textShadow: '0 1px 2px rgba(0,0,0,0.8)'}}>{tagline}</p>
                 </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Top Songs */}
                        <Card title="Top Songs">
                            <div className="divide-y divide-xp-border-dark/50 p-2">
                                {topSongs.map(song => <MediaListItem key={song.title} item={song} type="song" />)}
                            </div>
                        </Card>
                         {/* Top Movies */}
                         <Card title="Top Movies">
                            <div className="p-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {topMovies.map(movie => (
                                        <div key={movie.title} className="text-center group">
                                            <img src={`https://picsum.photos/seed/${movie.title}/200/300`} alt={movie.title} className="border-2 border-t-xp-border-light border-l-xp-border-light border-r-xp-border-dark border-b-xp-border-dark mb-2 aspect-[2/3] object-cover"/>
                                            <p className="font-semibold text-sm leading-5">{movie.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-8">
                        {/* Fashion Trends */}
                        <Card title="Fashion Trends">
                            <ul className="space-y-3 p-4">
                                {fashionTrends.map(trend => (
                                    <li key={trend.name} className="flex items-start space-x-3">
                                        <Icon name="shirt" className="w-5 h-5 mt-1 text-xp-blue flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-base leading-6">{trend.name}</p>
                                            <p className="text-sm text-xp-text/80 leading-5">{trend.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                        {/* World Events */}
                        <Card title="World Events">
                             <ul className="space-y-4 p-4">
                                {worldEvents.map((event, index) => (
                                    <li key={index} className="border-l-4 border-xp-blue-dark pl-4">
                                        <p className="font-semibold text-base leading-6">{event.description}</p>
                                        <p className="text-sm text-xp-text/80 leading-5">{event.date}</p>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
};