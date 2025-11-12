
import React, { useEffect, useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { YEARS_RANGE } from '../constants';
import { Page, YearData } from '../types';
import { YearCard } from '../components/YearCard';
import { fetchYearData } from '../services/geminiService';
import { Icon } from '../components/Icon';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const TimelinePage: React.FC = () => {
    const { navigateTo, userPreferences, yearDataCache, setYearDataCache } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadInitialData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch just the first few years for a faster initial load
                const initialYearsToFetch = YEARS_RANGE.slice(0, 3).filter(year => !yearDataCache[year]);
                if (initialYearsToFetch.length > 0) {
                    const promises = initialYearsToFetch.map(year =>
                        fetchYearData(year, userPreferences?.interests || ['Music', 'Movies'])
                    );
                    const results = await Promise.all(promises);

                    const newCache: Record<number, YearData> = {};
                    results.forEach(data => {
                        newCache[data.year] = data;
                    });
                    setYearDataCache(prev => ({ ...prev, ...newCache }));
                }
            } catch (err) {
                setError("Could not load timeline. Please try again later.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userPreferences]);

    const handleSelectYear = (year: number) => {
        navigateTo(Page.YearDetail, { year });
    };
    
    const scroll = (direction: 'left' | 'right') => {
        if(scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -350 : 350;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    if (isLoading && Object.keys(yearDataCache).length < 3) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] bg-xp-desktop">
                <LoadingSpinner text="Curating your timeline..."/>
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-20 text-soft-red bg-xp-desktop">{error}</div>;
    }

    return (
        <main className="bg-xp-desktop py-12 md:py-20 relative overflow-hidden">
            <div className="container mx-auto">
                <div className="text-center mb-12 px-4">
                    <h2 className="text-3xl md:text-4xl font-sans font-bold text-white" style={{textShadow: '2px 2px 2px #000'}}>Your Time Capsule</h2>
                    <p className="text-white/90 mt-2 text-base leading-6" style={{textShadow: '1px 1px 1px #000'}}>Scroll or use the arrows to journey through the years.</p>
                </div>
            </div>

            <div className="relative flex items-center">
                <button onClick={() => scroll('left')} className="hidden md:block absolute left-4 z-20 w-12 h-12 bg-xp-gray/80 hover:bg-xp-gray rounded-none text-xp-text border-2 border-t-xp-border-light border-l-xp-border-light border-r-xp-border-dark border-b-xp-border-dark transition">
                    <Icon name="chevron-left" className="mx-auto" />
                </button>
                <div 
                    ref={scrollContainerRef}
                    className="flex space-x-8 px-4 md:px-20 py-4 overflow-x-auto snap-x snap-mandatory"
                    // FIX: Use camelCase for CSS properties in React style objects.
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {YEARS_RANGE.map(year => (
                        <div key={year} className="snap-center shrink-0">
                            <YearCard year={year} onSelectYear={handleSelectYear} />
                        </div>
                    ))}
                </div>
                <button onClick={() => scroll('right')} className="hidden md:block absolute right-4 z-20 w-12 h-12 bg-xp-gray/80 hover:bg-xp-gray rounded-none text-xp-text border-2 border-t-xp-border-light border-l-xp-border-light border-r-xp-border-dark border-b-xp-border-dark transition">
                    <Icon name="chevron-right" className="mx-auto" />
                </button>
            </div>
        </main>
    );
};
