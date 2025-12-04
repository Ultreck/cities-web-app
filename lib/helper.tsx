// Mock data for the MCity application
import * as Flags from "country-flag-icons/react/3x2";
import img1 from '../assets/images/Image (1).png';
import img2 from '../assets/images/Image (2).png';
import img3 from '../assets/images/Image.png';
export const initialPosts = [
  {
    id: "1",
    author: 'David Adeleke',
    username: '@davido',
    avatar: img1,
    time: '14 mins ago',
    title: 'Could North Korea handle a Covid-19 outbreak?',
    content: 'Post-Covid-19 committee for creative industry: A writer, gender perspective',
    likes: 2500,
    comments: 420,
    shares: 345,
    views: 45,
    sponsored: false,
    likedByUser: false,
    image: img1
  },
  {
    id: "2",
    author: 'Peter Okoye',
    username: '@peterp',
    avatar: img2,
    time: '28 mins ago',
    title: 'Disturbing Letter About Life in COVID-19 Ward in...',
    content: 'Earlier this week, British medical journal The Lancet published a...',
    likes: 2500,
    comments: 420,
    shares: 345,
    views: 45,
    sponsored: false,
    likedByUser: false,
    image: img2
  },
  {
    id: "3",
    author: 'MTN Nigeria',
    username: '@mtnng',
    avatar: img3,
    time: '1 hour ago',
    title: 'Buy the MTN 5G smartphone',
    content: 'Buy the MTN 5G smartphone and stand a chance to win a Sony headphone',
    likes: 2500,
    comments: 420,
    shares: 345,
    views: 45,
    sponsored: true,
    likedByUser: false,
    image: img3
  }
];

export const initialCommunities = [
  { id: '1', name: 'Lekki Community', members: '35k', image: '🏘️', status: 'Public', joined: false },
  { id: '2', name: 'Victoria Island', members: '235k', image: '🌆', status: 'Public', joined: false },
  { id: '3', name: 'Ikeja', members: '134k', image: '🏙️', status: 'Public', joined: false },
  { id: '4', name: 'Festac', members: '2.19k', image: '🏢', status: 'Public', joined: false },
  { id: '5', name: 'Yaba Community', members: '89k', image: '🏘️', status: 'Public', joined: false },
  { id: '6', name: 'Surulere Community', members: '156k', image: '🏙️', status: 'Public', joined: false },
];

export const initialEvents = [
  {
    id: 1,
    name: 'NIGHT OF MERCY 14 - AMOS FENWA',
    date: 'Sat, Jan 18 • 10:00pm',
    location: 'Lekki',
    price: 'From $5.00',
    organizer: 'Clan Africa'
  },
  {
    id: 2,
    name: 'Election Night Watch Party',
    date: 'Sat, Jan 18 • 10:00pm',
    location: 'Lekki',
    price: 'From $5.00',
    organizer: 'WorQulture'
  },
  {
    id: 3,
    name: 'THE GREATEST SHOW ON EARTH | REVEL SATURDAYS',
    date: 'Sat, Jan 18 • 10:00pm',
    location: 'Lagos',
    price: 'From $10.00',
    organizer: 'Revel Entertainment'
  }
];

export const initialJobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'The Tonic Technologies LTD',
    location: 'Lekki',
    salary: 'N100k a month',
    type: 'Full-time'
  },
  {
    id: 2,
    title: 'Full-stack Software Developer',
    company: 'WorQulture',
    location: 'Lagos',
    salary: 'N350k a month',
    type: 'Full-time'
  },
  {
    id: 3,
    title: 'Administrative/Front Desk Officer',
    company: 'Clan Africa',
    location: 'Lekki',
    salary: 'N150k a month',
    type: 'Full-time'
  },
  {
    id: 4,
    title: 'Online Sales Representative',
    company: 'Shoprite',
    location: 'Lagos',
    salary: 'N80k a month',
    type: 'Part-time'
  }
];

export const initialProperties = [
  {
    id: 1,
    title: '6 bedroom duplex',
    location: 'Lekki',
    price: 'N6,000,000 /month',
    type: 'For rent',
    image: '🏠'
  },
  {
    id: 2,
    title: 'Suny apartment',
    location: 'Los Angeles',
    price: '$233 /per day',
    type: 'For rent',
    image: '🏢'
  },
  {
    id: 3,
    title: '3 bedroom apartment',
    location: 'Victoria Island',
    price: 'N3,500,000 /month',
    type: 'For rent',
    image: '🏘️'
  }
];

export const initialProviders = [
  { id: 1, name: 'Most Famous Supermarket', type: 'Supermarket', location: 'Lekki' },
  { id: 2, name: 'Shoprite', type: 'Supermarket', location: 'Lagos' },
  { id: 3, name: 'Burger kings', type: 'Eatery', location: 'Lekki' },
  { id: 4, name: 'The place', type: 'Hotel', location: 'Lekki' },
  { id: 5, name: 'Cravings', type: 'Eatery', location: 'Amuwo Odofin' },
];

export const initialNotifications = [
  {
    id: 1,
    type: 'like',
    user: 'Sarah Peterson',
    username: '@sarahp',
    action: 'liked your post',
    content: 'Could North Korea handle a Covid-19 outbreak?',
    time: '5 mins ago',
    read: false,
    avatar: '👩'
  },
  {
    id: 2,
    type: 'comment',
    user: 'Peter Okoye',
    username: '@peterp',
    action: 'commented on your post',
    content: 'Great insight! I totally agree with this perspective.',
    time: '15 mins ago',
    read: false,
    avatar: '👨'
  },
  {
    id: 3,
    type: 'follow',
    user: 'Chiamaka',
    username: '@chiamakar',
    action: 'started following you',
    content: null,
    time: '30 mins ago',
    read: false,
    avatar: '👤'
  },
  {
    id: 4,
    type: 'share',
    user: 'John Doe',
    username: '@jdoe',
    action: 'shared your post',
    content: 'Disturbing Letter About Life in COVID-19 Ward',
    time: '1 hour ago',
    read: true,
    avatar: '👨'
  },
  {
    id: 5,
    type: 'community',
    user: 'Lekki Community',
    username: '@lekkicomm',
    action: 'posted a new event',
    content: 'NIGHT OF MERCY 14 - AMOS FENWA',
    time: '2 hours ago',
    read: true,
    avatar: '🏘️'
  }
];

export const initialMessages = [
  {
    id: 1,
    user: 'Chiamaka',
    username: '@chiamakar',
    avatar: '👤',
    lastMessage: 'Hello! I\'m looking forward to having you stay in my apartment...',
    time: '2 hours ago',
    unread: 3,
    online: true,
    messages: [
      { id: 1, sender: 'them', text: 'Hello! I\'m looking forward to having you stay in my apartment. Please let me know when you come to your new appartment', time: '3 Dec 2015' },
      { id: 2, sender: 'me', text: 'Thank you for sharing', time: '3 Dec 2015' },
      { id: 3, sender: 'them', text: 'You\'re welcome! Feel free to ask any questions.', time: '2 hours ago' }
    ]
  },
  {
    id: 2,
    user: 'Peter Okoye',
    username: '@peterp',
    avatar: '👨',
    lastMessage: 'Hey! On Friday the 10th between 1:55 and 2:00 pm.',
    time: '3:03pm',
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: 'them', text: 'Hey! On Friday the 10th between 1:55 and 2:00 pm.', time: '3:03pm' },
      { id: 2, sender: 'me', text: 'Perfect! See you then.', time: '3:05pm' }
    ]
  },
  {
    id: 3,
    user: 'Lilian',
    username: '@lilian',
    avatar: '👩',
    lastMessage: 'Hey! On Friday the 10th between 1:55 and 2:00 pm.',
    time: '3:03pm',
    unread: 0,
    online: true,
    messages: [
      { id: 1, sender: 'them', text: 'Hey! On Friday the 10th between 1:55 and 2:00 pm.', time: '3:03pm' }
    ]
  },
  {
    id: 4,
    user: 'Sarah Peterson',
    username: '@sarahp',
    avatar: '👩',
    lastMessage: 'Thank you for sharing',
    time: '30 min ago',
    unread: 1,
    online: false,
    messages: [
      { id: 1, sender: 'them', text: 'Thank you for sharing', time: '30 min ago' }
    ]
  }
];

export const currentUser = {
  name: 'David Adeleke',
  username: '@davido',
  email: 'david.adeleke@example.com',
  phone: '+234 706 619 8768',
  location: 'Lagos Nigeria',
  bio: 'Hi! I am David, I really like traveling to really different countries, most often I am looking for flats that have very friendly landlords in a good location.',
  connections: '500+',
  avatar: '👤',
  joinDate: '3 Dec 2015',
  balance: 247034,
  posts: 156,
  communities: 12,
  media: 89
};
export const commentsData = [
  {
    id: 1,
    author: 'Chioma Rowland',
    username: '@chefchi',
    avatar: '/avatars/chioma.png',
    time: '10 mins ago',
    content: 'I totally agree with this post! The message is really clear.',
    likes: 120,
    replies: [
      {
        id: 11,
        author: 'David Adeleke',
        username: '@davido',
        avatar: '/avatars/davido.png',
        time: '8 mins ago',
        content: 'Exactly! People really need to understand this perspective.',
        likes: 42,
        replies: [
          {
            id: 111,
            author: 'Tunde Ednut',
            username: '@tundeednut',
            avatar: '/avatars/tunde.png',
            time: '6 mins ago',
            content: 'Facts only bro! It’s all about awareness.',
            likes: 15
          },
          {
            id: 112,
            author: 'Mercy Johnson',
            username: '@mercyj',
            avatar: '/avatars/mercy.png',
            time: '4 mins ago',
            content: 'Very well said. We need more discussions like this.',
            likes: 19
          }
        ]
      }
    ]
  },
  {
    id: 2,
    author: 'Peter Obi',
    username: '@peterobi',
    avatar: '/avatars/obi.png',
    time: '20 mins ago',
    content: 'Interesting point of view, but I think there’s more to it.',
    likes: 230,
    replies: [
      {
        id: 21,
        author: 'Reno Omokri',
        username: '@renoomokri',
        avatar: '/avatars/reno.png',
        time: '18 mins ago',
        content: 'I respect that, but can you expand on what you mean?',
        likes: 31,
        replies: [
          {
            id: 211,
            author: 'Peter Obi',
            username: '@peterobi',
            avatar: '/avatars/obi.png',
            time: '15 mins ago',
            content: 'Sure — I’m referring to the policy impact, not just the people.',
            likes: 22
          },
          {
            id: 212,
            author: 'Reno Omokri',
            username: '@renoomokri',
            avatar: '/avatars/reno.png',
            time: '13 mins ago',
            content: 'Got it! That’s a fair distinction.',
            likes: 10
          }
        ]
      }
    ]
  },
  {
    id: 3,
    author: 'Funke Akindele',
    username: '@funkejenifa',
    avatar: '/avatars/funke.png',
    time: '35 mins ago',
    content: 'This topic really touches on what we’re facing in the industry.',
    likes: 178,
    replies: [
      {
        id: 31,
        author: 'Mr Macaroni',
        username: '@mrmacaroni',
        avatar: '/avatars/macaroni.png',
        time: '30 mins ago',
        content: 'You’re absolutely right! It’s affecting creators deeply.',
        likes: 40,
        replies: [
          {
            id: 311,
            author: 'Taaooma',
            username: '@taaooma',
            avatar: '/avatars/taaooma.png',
            time: '27 mins ago',
            content: 'So true. Collaboration is the way forward.',
            likes: 12
          },
          {
            id: 312,
            author: 'Falz',
            username: '@falzthebahdguy',
            avatar: '/avatars/falz.png',
            time: '25 mins ago',
            content: 'Exactly. We all need to support each other.',
            likes: 14
          }
        ]
      }
    ]
  },
  {
    id: 4,
    author: 'Don Jazzy',
    username: '@donjazzy',
    avatar: '/avatars/donjazzy.png',
    time: '50 mins ago',
    content: 'Let’s all remember that consistency is key to success.',
    likes: 312,
    replies: [
      {
        id: 41,
        author: 'Rema',
        username: '@heisrema',
        avatar: '/avatars/rema.png',
        time: '45 mins ago',
        content: 'Boss, I’ve learned this from you every single day!',
        likes: 88,
        replies: [
          {
            id: 411,
            author: 'Ayra Starr',
            username: '@ayrastarr',
            avatar: '/avatars/ayra.png',
            time: '43 mins ago',
            content: 'Same here, OG! We move with grace.',
            likes: 51
          },
          {
            id: 412,
            author: 'Crayon',
            username: '@crayonthis',
            avatar: '/avatars/crayon.png',
            time: '41 mins ago',
            content: 'No lies detected 🔥🔥',
            likes: 22
          }
        ]
      }
    ]
  },
  {
    id: 5,
    author: 'Tech Guru',
    username: '@techg',
    avatar: '/avatars/tech.png',
    time: '1 hour ago',
    content: 'AI is changing the way we think about work entirely.',
    likes: 540,
    replies: [
      {
        id: 51,
        author: 'Emmanuel Adetutu',
        username: '@emmanuelcodes',
        avatar: '/avatars/emmanuel.png',
        time: '55 mins ago',
        content: 'Exactly! Developers need to adapt quickly.',
        likes: 77,
        replies: [
          {
            id: 511,
            author: 'John Doe',
            username: '@johnny',
            avatar: '/avatars/john.png',
            time: '52 mins ago',
            content: 'I agree, especially with the new AI frameworks.',
            likes: 19
          },
          {
            id: 512,
            author: 'Jane Doe',
            username: '@janedoe',
            avatar: '/avatars/jane.png',
            time: '49 mins ago',
            content: 'And it’s making some jobs easier too.',
            likes: 25
          }
        ]
      }
    ]
  },
  {
    id: 6,
    author: 'Wizkid',
    username: '@wizkidayo',
    avatar: '/avatars/wizkid.png',
    time: '2 hours ago',
    content: 'Big love to everyone supporting the movement 🌍',
    likes: 789,
    replies: [
      {
        id: 61,
        author: 'Burna Boy',
        username: '@burnaboy',
        avatar: '/avatars/burna.png',
        time: '1 hour 45 mins ago',
        content: 'Na we we! Keep doing your thing, bro.',
        likes: 121,
        replies: [
          {
            id: 611,
            author: 'Tems',
            username: '@temsbaby',
            avatar: '/avatars/tems.png',
            time: '1 hour 30 mins ago',
            content: 'Love to see real unity 🔥',
            likes: 56
          },
          {
            id: 612,
            author: 'Omah Lay',
            username: '@omahlay',
            avatar: '/avatars/omah.png',
            time: '1 hour 28 mins ago',
            content: '100%! Africa to the world 🌍',
            likes: 48
          }
        ]
      }
    ]
  },
  {
    id: 7,
    author: 'Elon Musk',
    username: '@elonmusk',
    avatar: '/avatars/elon.png',
    time: '3 hours ago',
    content: 'SpaceX just hit another milestone 🚀',
    likes: 1100,
    replies: [
      {
        id: 71,
        author: 'Mark Zuckerberg',
        username: '@zuck',
        avatar: '/avatars/zuck.png',
        time: '2 hours 50 mins ago',
        content: 'Congrats, man! Next stop — Mars?',
        likes: 88,
        replies: [
          {
            id: 711,
            author: 'Bill Gates',
            username: '@billgates',
            avatar: '/avatars/bill.png',
            time: '2 hours 45 mins ago',
            content: 'Innovation at its finest 👏',
            likes: 62
          },
          {
            id: 712,
            author: 'Jeff Bezos',
            username: '@jeffbezos',
            avatar: '/avatars/jeff.png',
            time: '2 hours 43 mins ago',
            content: 'Great achievement! Let’s collaborate someday.',
            likes: 71
          }
        ]
      }
    ]
  },
  {
    id: 8,
    author: 'Taylor Swift',
    username: '@taylorswift',
    avatar: '/avatars/taylor.png',
    time: '4 hours ago',
    content: 'Writing songs all night again 🎶',
    likes: 960,
    replies: [
      {
        id: 81,
        author: 'Selena Gomez',
        username: '@selenagomez',
        avatar: '/avatars/selena.png',
        time: '3 hours 50 mins ago',
        content: 'Drop a new one soon please 🥺',
        likes: 110,
        replies: [
          {
            id: 811,
            author: 'Ariana Grande',
            username: '@arianagrande',
            avatar: '/avatars/ariana.png',
            time: '3 hours 45 mins ago',
            content: 'Same here!! We’re waiting 🎵',
            likes: 90
          },
          {
            id: 812,
            author: 'Billie Eilish',
            username: '@billieeilish',
            avatar: '/avatars/billie.png',
            time: '3 hours 42 mins ago',
            content: 'I know the feeling 😅 creativity never sleeps.',
            likes: 84
          }
        ]
      }
    ]
  }
];

interface CountryFlagProps {
  code: string; 
  size?: string;
}

export default function CountryFlag({ code, size = "w-6 h-6" }: CountryFlagProps) {
  
const Flag = (
  Flags as unknown as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>
)[code];

return Flag ? <Flag className={size} aria-label={code} /> : null;
}
