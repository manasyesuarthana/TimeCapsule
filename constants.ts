
import { Page, CommunityPost } from './types';

export const NAV_LINKS = [
  { name: 'Timeline', page: Page.Timeline },
  { name: 'Community', page: Page.Community },
  { name: 'Revival', page: Page.Revival },
  { name: 'Profile', page: Page.Profile },
];

export const YEARS_RANGE = [1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005];

export const INTERESTS = ['Music', 'Movies', 'Games', 'Fashion', 'Ads', 'World Events'];

export const RETRO_AVATARS = [
    '/avatar1.png',
    '/avatar2.png',
    '/avatar3.png',
    '/avatar4.png',
    '/avatar5.png',
    '/avatar6.png',
];

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
    { id: '1', author: 'RetroFan99', avatar: `https://picsum.photos/seed/1/40/40`, timestamp: '2h ago', content: '2001 — I remember making mixed CDs for road trips! The burn speed was so slow.', yearTag: 2001, reactions: { ' nostalgia': 12, '❤️': 5 }, isUser: false },
    { id: '2', author: 'You', avatar: `https://picsum.photos/seed/user/40/40`, timestamp: '1h ago', content: 'Totally! And waiting for your favorite song to come on the radio just to record it to a cassette tape.', yearTag: 2001, reactions: { '😂': 8 }, isUser: true },
    { id: '3', author: 'GamerX2003', avatar: `https://picsum.photos/seed/3/40/40`, timestamp: '30m ago', content: 'Anyone else spend hours on dial-up internet playing Neopets? The dial-up sound is forever burned into my memory.', yearTag: 2003, reactions: { ' nostalgia': 25 }, isUser: false },
    { id: '4', author: 'StyleQueen00', avatar: `https://picsum.photos/seed/4/40/40`, timestamp: '15m ago', content: 'Low-rise jeans and chunky highlights were EVERYTHING in 2004. Don\'t know if I could pull it off today though!', yearTag: 2004, reactions: { '💅': 15, '😂': 4 }, isUser: false },
];

export const MOCK_REVIVAL_STORIES = [
    {
        brand: 'Polaroid',
        tagline: 'Instant film\'s iconic comeback.',
        story: 'From its peak in the late 20th century to a near-disappearance in the 2000s, Polaroid has made a stunning revival, captivating a new generation with the magic of instant photography.',
        thenImage: 'https://picsum.photos/seed/polaroidthen/400/300',
        nowImage: 'https://picsum.photos/seed/polaroidnow/400/300',
        relatedYears: [1998, 1999]
    },
    {
        brand: 'Vinyl Records',
        tagline: 'The analog resurgence in a digital world.',
        story: 'Once thought to be obsolete, vinyl records have spun their way back into the mainstream, celebrated for their warm sound quality and tangible listening experience.',
        thenImage: 'https://picsum.photos/seed/vinylthen/400/300',
        nowImage: 'https://picsum.photos/seed/vinylnow/400/300',
        relatedYears: [1998, 2000]
    },
    {
        brand: 'Care Bears',
        tagline: 'From 80s cartoons to modern collectibles.',
        story: 'The Care Bears first captured hearts in the 1980s. After several revivals, they\'ve returned with new shows and merchandise, proving that caring never goes out of style.',
        thenImage: 'https://picsum.photos/seed/carebearsthen/400/300',
        nowImage: 'https://picsum.photos/seed/carebearsnow/400/300',
        relatedYears: [2002, 2004]
    }
];

export const FALLBACK_YEAR_DATA: { [key: number]: any } = {
  1998: {
    year: 1998,
    tagline: "The year of Titanic and the birth of Google.",
    topSongs: [{ title: "My Heart Will Go On", artist: "Celine Dion" }],
    topMovies: [{ title: "Titanic", synopsis: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic." }],
    fashionTrends: [{ name: "Cargo Pants", description: "Utilitarian and baggy trousers became a staple."}],
    worldEvents: [{ description: "Google is founded in Menlo Park, California.", date: "September 4, 1998" }]
  }
};
