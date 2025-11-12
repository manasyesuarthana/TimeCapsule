import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Page } from '../types';

export const ProfilePage: React.FC = () => {
    const { userPreferences, navigateTo } = useAppContext();

    if (!userPreferences) {
        return (
            <div className="text-center py-20 flex flex-col items-center justify-center h-[calc(100vh-10rem)] bg-xp-desktop">
                <div className="bg-xp-gray p-8 border-2 border-t-xp-border-light border-l-xp-border-light border-r-xp-border-dark border-b-xp-border-dark">
                    <h2 className="text-2xl font-sans font-semibold">No Profile Found</h2>
                    <p className="text-xp-text/80 mt-2 text-base leading-6">Create a profile to see your personalized space.</p>
                    <Button variant="primary" onClick={() => navigateTo(Page.Preferences)} className="mt-6">Create Profile</Button>
                </div>
            </div>
        );
    }
    
    const { nickname, avatar, era, interests } = userPreferences;

    return (
        <main className="bg-xp-desktop py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Profile Info */}
                    <div className="md:col-span-1">
                        <Card title={nickname}>
                            <div className="p-6 text-center">
                                <img src={avatar} alt={nickname} className="w-32 h-32 mx-auto mb-4 border-2 border-t-xp-border-dark border-l-xp-border-dark border-r-xp-border-light border-b-xp-border-light" />
                                <h2 className="text-2xl font-bold font-sans">{nickname}</h2>
                                <p className="text-xp-text/80 text-sm leading-5">Joined 2024</p>
                                <div className="my-4">
                                    <p className="font-semibold text-xp-blue-dark">Favorite Era</p>
                                    <p className="text-lg font-bold">{era.join(' - ')}</p>
                                </div>
                                <Button variant="secondary" className="w-full text-sm">Edit Profile</Button>
                            </div>
                        </Card>
                    </div>

                    {/* Right Column: Tabs */}
                    <div className="md:col-span-2 space-y-8">
                        <Card title="Your Interests">
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2">
                                    {interests.map(interest => (
                                        <span key={interest} className="bg-blue-200 text-xp-blue-dark font-semibold px-3 py-1 text-sm border border-xp-blue-dark">{interest}</span>
                                    ))}
                                </div>
                            </div>
                        </Card>
                        <Card title="Saved Items">
                             <div className="p-6 text-center text-xp-text/80">
                                 <Icon name="heart" className="w-12 h-12 mx-auto mb-2"/>
                                 <p className="font-semibold">No saved items yet.</p>
                                 <p className="text-sm leading-5">Save something from a year you love!</p>
                             </div>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
};