import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Page, UserPreferences } from '../types';
import { INTERESTS, YEARS_RANGE } from '../constants';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Card } from '../components/Card';

const InterestToggle: React.FC<{ icon: any; label: string; isSelected: boolean; onToggle: () => void; }> = ({ icon, label, isSelected, onToggle }) => (
    <button onClick={onToggle} className={`flex flex-col items-center justify-center space-y-2 p-4 w-28 h-28 border-2 transition-all duration-200 ${isSelected ? 'bg-blue-200 border-t-xp-border-dark border-l-xp-border-dark border-b-xp-border-light border-r-xp-border-light' : 'bg-xp-gray border-t-xp-border-light border-l-xp-border-light border-r-xp-border-dark border-b-xp-border-dark'}`}>
        <Icon name={icon} className={`w-8 h-8 ${isSelected ? 'text-xp-blue' : 'text-xp-text'}`} />
        <span className={`font-medium text-sm leading-5 ${isSelected ? 'text-xp-blue' : 'text-xp-text'}`}>{label}</span>
    </button>
);

const interestIcons: { [key: string]: any } = {
    Music: 'music', Movies: 'film', Games: 'gamepad', Fashion: 'shirt', Ads: 'megaphone', WorldEvents: 'globe'
};

export const PreferencesPage: React.FC = () => {
    const { navigateTo, setUserPreferences } = useAppContext();
    
    const [era, setEra] = useState<[number, number]>([1998, 2005]);
    const [selectedInterests, setSelectedInterests] = useState<string[]>(['Music', 'Movies']);
    const [nickname, setNickname] = useState('');
    const [validationError, setValidationError] = useState('');

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev => 
            prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
        );
    };

    const handleContinue = () => {
        if (selectedInterests.length === 0) {
            setValidationError('Please select at least one interest.');
            return;
        }
        setValidationError('');
        const preferences: UserPreferences = {
            era,
            interests: selectedInterests,
            nickname: nickname || 'Guest',
            avatar: `https://picsum.photos/seed/${nickname || 'guest'}/100/100`,
        };
        setUserPreferences(preferences);
        navigateTo(Page.Timeline);
    };

    return (
        <div className="min-h-screen bg-xp-desktop py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <header className="text-center mb-12">
                     <div className="inline-block bg-xp-gray p-4 border-2 border-t-xp-border-light border-l-xp-border-light border-r-xp-border-dark border-b-xp-border-dark">
                        <h2 className="text-2xl md:text-3xl font-sans font-bold text-xp-text">Personalize your TimeCapsule</h2>
                        <p className="text-xp-text/80 mt-2 text-base leading-6">Pick an era and topics you love — we’ll tailor the timeline.</p>
                     </div>
                </header>

                <Card title="Settings">
                  <div className="p-8">
                    <div className="space-y-10">
                        {/* Era Selector */}
                        <div>
                            <h3 className="text-[18px] font-sans font-bold mb-3 text-left">1. Choose Your Era</h3>
                             <p className="text-center font-bold text-3xl text-xp-blue-dark">{era[0]} - {era[1]}</p>
                            <div className="mt-4">
                               <p className="text-center text-sm text-xp-text/80 leading-5">Era slider functionality is complex for a demo. Defaulting to 1998-2005.</p>
                            </div>
                        </div>

                        {/* Interests Selector */}
                        <div>
                            <h3 className="text-[18px] font-sans font-bold mb-4 text-left">2. Select Your Interests</h3>
                            <div className="flex flex-wrap gap-4 justify-center">
                                {INTERESTS.map(interest => (
                                    <InterestToggle
                                        key={interest}
                                        icon={interestIcons[interest.replace(' ', '')]}
                                        label={interest}
                                        isSelected={selectedInterests.includes(interest)}
                                        onToggle={() => toggleInterest(interest)}
                                    />
                                ))}
                            </div>
                            {validationError && <p className="text-soft-red text-sm mt-2 text-center">{validationError}</p>}
                        </div>

                        {/* Nickname */}
                        <div>
                            <h3 className="text-[18px] font-sans font-bold mb-3 text-left">3. Enter a Nickname (Optional)</h3>
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="RetroExplorer"
                                className="w-full px-4 py-2 bg-xp-border-light border-2 border-t-xp-border-dark border-l-xp-border-dark border-b-xp-border-light border-r-xp-border-light focus:outline-none"
                            />
                        </div>
                    </div>
                  </div>
                </Card>
                
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Button onClick={handleContinue} className="w-full sm:w-auto">OK</Button>
                    <button onClick={() => navigateTo(Page.Timeline)} className="text-white hover:underline font-semibold">Skip for now</button>
                </div>
            </div>
        </div>
    );
};