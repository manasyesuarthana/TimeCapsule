import React from 'react';
import { MOCK_COMMUNITY_POSTS } from '../constants';
import { CommunityPost } from '../types';
import { Card } from '../components/Card';
import { Icon } from '../components/Icon';
import { Button } from '../components/Button';

const PostCard: React.FC<{ post: CommunityPost }> = ({ post }) => (
    <div className={`flex items-start space-x-4 p-2 ${post.isUser ? 'justify-end' : ''}`}>
        {!post.isUser && <img src={post.avatar} alt={post.author} className="w-10 h-10" />}
        <div className={`max-w-md ${post.isUser ? 'text-right' : ''}`}>
            <div className={`px-4 py-2 border-2 ${post.isUser ? 'bg-blue-200 border-xp-border-dark' : 'bg-xp-border-light border-xp-border-dark'}`}>
                <div className={`flex items-baseline space-x-2 ${post.isUser ? 'justify-end' : ''}`}>
                    {!post.isUser && <p className="font-bold text-sm">{post.author}</p>}
                    <p className="text-xs text-xp-text/70">{post.timestamp}</p>
                    {post.yearTag && <span className="text-xs font-bold text-xp-blue-dark">#{post.yearTag}</span>}
                </div>
                <p className="mt-1 text-base leading-6">{post.content}</p>
            </div>
             <div className={`flex items-center space-x-2 mt-2 ${post.isUser ? 'justify-end' : ''}`}>
                {Object.entries(post.reactions).map(([emoji, count]) => (
                    <button key={emoji} className="text-xs bg-xp-gray px-2 py-1 border border-xp-border-dark">{emoji} {count}</button>
                ))}
            </div>
        </div>
         {post.isUser && <img src={post.avatar} alt={post.author} className="w-10 h-10" />}
    </div>
);


export const CommunityPage: React.FC = () => {
  return (
    <main className="bg-xp-desktop">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-3xl font-sans font-bold text-center mb-8 text-white" style={{textShadow: '2px 2px 2px #000'}}>Community Memory Wall</h2>
            <div className="max-w-3xl mx-auto">
                <Card title="Chat Room" className="flex flex-col h-[70vh]">
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-xp-border-light border-t-2 border-xp-border-dark">
                        {MOCK_COMMUNITY_POSTS.map(post => <PostCard key={post.id} post={post}/>)}
                    </div>
                    <div className="p-2 border-t-2 border-xp-border-light bg-xp-gray">
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <input
                                type="text"
                                placeholder="Share a memory from the past..."
                                className="flex-1 px-4 py-2 bg-xp-border-light border-2 border-t-xp-border-dark border-l-xp-border-dark border-b-xp-border-light border-r-xp-border-light focus:outline-none"
                            />
                            <Button variant="primary" className="!px-4 !py-2">
                                Send
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </main>
  );
};