import React from 'react';
import { MOCK_REVIVAL_STORIES } from '../constants';
import { Card } from '../components/Card';

export const RevivalPage: React.FC = () => {
    return (
        <main className="bg-xp-gray py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-12">
                    <h2 className="text-3xl font-sans font-bold text-xp-text">Revival Stories</h2>
                    <p className="text-xp-text/80 mt-2 text-base leading-6">See how the classics are making a comeback.</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_REVIVAL_STORIES.map(story => (
                        <Card key={story.brand} title={story.brand} className="group">
                            <div className="relative border-t-2 border-xp-border-dark">
                                <img src={story.nowImage} alt={`${story.brand} now`} className="w-full h-56 object-cover" />
                                <div className="absolute top-0 left-0 w-1/2 h-full opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                                     <img src={story.thenImage} alt={`${story.brand} then`} className="w-full h-full object-cover"/>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-xp-blue-dark font-semibold mt-1">{story.tagline}</p>
                                <p className="text-xp-text/80 mt-4 text-sm leading-5">{story.story}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </main>
    );
};