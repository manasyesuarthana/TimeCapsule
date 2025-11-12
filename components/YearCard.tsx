import React from 'react';
import { YearData, Song } from '../types';
import { Icon } from './Icon';
import { useAppContext } from '../context/AppContext';
import { fetchYearData, generateImage } from '../services/geminiService';

interface YearCardProps {
  yearData: YearData;
  onSelectYear: (year: number) => void;
}

const SkeletonCard: React.FC<{year: number}> = ({year}) => (
    <div className="relative w-80 h-[450px] bg-xp-gray rounded-none shadow-retro overflow-hidden p-4 flex flex-col justify-end animate-pulse">
        <div className="absolute inset-0 bg-xp-gray/30">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        <div className="relative z-10 space-y-3">
            <div className="h-10 w-1/2 bg-gray-400"></div>
            <div className="h-4 w-3/4 bg-gray-400"></div>
            <div className="h-4 w-1/2 bg-gray-400"></div>
        </div>
    </div>
);

export const YearCard: React.FC<{ year: number; onSelectYear: (year: number) => void; }> = ({ year, onSelectYear }) => {
    const { yearDataCache, setCurrentTrack, userPreferences, setYearDataCache } = useAppContext();
    const [isLoadingData, setIsLoadingData] = React.useState(true);
    const [isImageLoading, setIsImageLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        const loadYearData = async () => {
            setIsLoadingData(true);
            setIsImageLoading(true);
            setError(null);

            try {
                let data = yearDataCache[year];
                if (!data) {
                    data = await fetchYearData(year, userPreferences?.interests || ['Music', 'Movies']);
                    setYearDataCache(prev => ({ ...prev, [year]: data }));
                }
                setIsLoadingData(false);

                if (data.imageUrl) {
                    setImageUrl(data.imageUrl);
                    setIsImageLoading(false);
                } else if (data.imagePrompt) {
                    const generatedUrl = await generateImage(data.imagePrompt);
                    setImageUrl(generatedUrl);
                    setYearDataCache(prev => ({
                        ...prev,
                        [year]: { ...data, imageUrl: generatedUrl }
                    }));
                    setIsImageLoading(false);
                } else {
                    // Fallback if no image prompt is available
                    setImageUrl(`https://picsum.photos/seed/${year}/400/600`);
                    setIsImageLoading(false);
                }

            } catch (err) {
                console.error(`Failed to load data for ${year}:`, err);
                setError("Failed to load data.");
                setIsLoadingData(false);
                setIsImageLoading(false);
            }
        };

        loadYearData();
    // FIX: Update dependency array.
    }, [year, userPreferences, setYearDataCache]);

    const data = yearDataCache[year];

    if (isLoadingData) return <SkeletonCard year={year}/>;
    if (error || !data) return <div className="w-80 h-[450px] flex items-center justify-center bg-soft-red/20 text-soft-red font-semibold">{error || `No data for ${year}`}</div>;

    const topSong = data.topSongs?.[0];
    const topMovie = data.topMovies?.[0];

    const handlePlaySong = (e: React.MouseEvent, song: Song) => {
        e.stopPropagation();
        setCurrentTrack(song);
    };

    return (
        <div className="w-80 h-[450px] group relative overflow-hidden bg-black border-2 border-t-xp-border-light border-l-xp-border-light border-r-xp-border-dark border-b-xp-border-dark cursor-pointer" onClick={() => onSelectYear(year)}>
            {isImageLoading || !imageUrl ? (
                 <div className="absolute inset-0 w-full h-full bg-xp-gray animate-pulse"></div>
            ) : (
                <img src={imageUrl} alt={`Pop culture collage for ${year}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <h2 className="text-6xl font-sans font-bold mb-2" style={{textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>{year}</h2>
                <p className="text-lg font-semibold mb-4">{data.tagline}</p>
                <div className="space-y-2 text-sm">
                    {topSong && <div className="flex items-center space-x-2"><Icon name="music" className="w-4 h-4 text-neon-pink"/><span>{topSong.title}</span></div>}
                    {topMovie && <div className="flex items-center space-x-2"><Icon name="film" className="w-4 h-4 text-sky-blue"/><span>{topMovie.title}</span></div>}
                </div>
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {topSong && <button onClick={(e) => handlePlaySong(e, topSong)} className="w-10 h-10 rounded-full bg-neon-pink/80 backdrop-blur-sm flex items-center justify-center hover:bg-neon-pink"><Icon name="play"/></button>}
                    <button onClick={(e) => e.stopPropagation()} className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/50"><Icon name="heart" className="text-white"/></button>
                </div>
            </div>
        </div>
    );
};