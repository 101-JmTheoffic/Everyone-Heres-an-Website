import { CommunityPost, ThumbnailMatchup, ThumbnailCritique, CollabListing, GrowthPlaybook, CreatorUser } from '../types';

export const initialCurrentUser: CreatorUser = {
  id: 'current-user-1',
  name: 'Alex Rivera',
  channelName: 'CreatorBlueprint',
  handle: '@creatorblueprint',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
  subscribers: 2840,
  niche: 'Tech',
  badges: ['Monetized Partner', 'Thumbnail Wizard', 'Community Mentor'],
  uploadStreak: 6,
  videosCount: 42,
  bio: 'Helping small creators crack the algorithm with data-driven pacing and thumbnail theory. On the road to 10K subs!',
  level: 'Silver Climber (1K-10K)',
};

export const initialPosts: CommunityPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'Marcus Vance',
      channelName: 'Vance Tech Lab',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      subscribers: '14.2K',
      badge: '10K Club'
    },
    category: 'milestone',
    niche: 'Tech',
    title: '🎉 Just hit 10K Subs! The 3 changes that broke me out of the 800-sub rut',
    content: `For almost 14 months, my channel was practically dead. Every video got 70 to 140 views. I was convinced YouTube hated my channel. Here are the 3 non-negotiables that turned everything around in 4 months:

1. Never film a video until the title AND thumbnail sketch exist. If you can’t make a compelling 3-word visual concept, no one is going to click no matter how crisp your 4K B-roll is.
2. The "30-Second Cliff": In my old videos, 45% of people left by second 30. I stopped introducing myself ("Hey guys, today we are...") and started with the immediate consequence. My 30s retention jumped from 52% to 74%.
3. Re-packaging underperforming videos: If a video has good retention (>50%) but 2.4% CTR after 48h, swap the thumbnail and title! Two of my top videos were initially flops that exploded after a title change.

Keep grinding everyone. The flywheel is real once it catches!`,
    timestamp: '2 hours ago',
    likes: 124,
    commentsCount: 38,
    tags: ['Milestone', 'Retention', 'Packaging', 'CaseStudy'],
    highlightBadge: 'Featured Discussion',
    comments: [
      {
        id: 'c-1',
        author: {
          name: 'Elena Rostova',
          channelName: 'Elena Edits',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
          subscribers: '3.1K',
          badge: 'Rising Creator'
        },
        content: 'Number 2 is so painfully true. Cut my intro from 12 seconds to 2 seconds and my latest upload reached 8,000 views in 3 days!',
        timestamp: '1 hour ago',
        likes: 19
      },
      {
        id: 'c-2',
        author: {
          name: 'Devin Cole',
          channelName: 'PixelCraft Gaming',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
          subscribers: '890',
        },
        content: 'Did you notice any negative penalty when swapping titles after 48 hours, or did YouTube re-test the browse traffic seamlessly?',
        timestamp: '45 mins ago',
        likes: 7
      }
    ]
  },
  {
    id: 'post-2',
    author: {
      name: 'Sarah Chen',
      channelName: 'DataVisualized',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80',
      subscribers: '48.6K',
      badge: 'Algorithm Analyst'
    },
    category: 'algorithm',
    niche: 'Education',
    title: 'Deep-dive: Why "Suggested Videos" is treating high-CTR videos differently in 2026',
    content: `We analyzed 250 video analytics curves across 4 channels. Here is what we found about Suggested vs Browse:

Browse features (Home feed) rely heavily on 24-hour CTR + broad appeal.
Suggested videos rely almost exclusively on "Session Time" (did the viewer keep watching YouTube after your video, or close the app?).

If your video ends with an abrupt exit ("Well that's it, thanks for watching!"), YouTube de-ranks you in suggested. Always use a bridging card: "And if you found this mistake dangerous, click here because in this next video..."`,
    timestamp: '5 hours ago',
    likes: 89,
    commentsCount: 22,
    tags: ['Algorithm', 'SuggestedTraffic', 'Retention', 'EndScreens'],
    comments: [
      {
        id: 'c-3',
        author: {
          name: 'Jordan Mills',
          channelName: 'StudioUncut',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80',
          subscribers: '5.4K'
        },
        content: 'The bridging end card doubled my click-through onto the second video. YouTube loves viewer rabbit holes!',
        timestamp: '3 hours ago',
        likes: 12
      }
    ]
  },
  {
    id: 'post-3',
    author: {
      name: 'Kai Nakamura',
      channelName: 'Nakamura Cinema',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80',
      subscribers: '8.2K',
      badge: 'Shorts Pro'
    },
    category: 'shorts',
    niche: 'Entertainment',
    title: 'Shorts to Long-form conversion formula that actually converted 400+ subs in 1 week',
    content: `Everyone says "Shorts subscribers are dead subscribers who never watch long-form." That is true IF you make random disconnected Shorts.

Here is the exact method:
1. Cut the most viral, unresolved question from your long-form video (first 40s).
2. End the Short at the climax with text: "Full experiment linked right below".
3. Use the YouTube Related Video link feature.
Result: 32,000 views on the Short turned into 1,840 long-form views and 410 dedicated subscribers!`,
    timestamp: 'Yesterday',
    likes: 215,
    commentsCount: 45,
    tags: ['Shorts', 'LongFormConversion', 'GrowthHacks'],
    comments: []
  },
  {
    id: 'post-4',
    author: {
      name: 'Liam Gallagher',
      channelName: 'AudioForge',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80',
      subscribers: '1.9K'
    },
    category: 'gear',
    niche: 'Tech',
    title: 'PSA: Stop buying $1,000 cameras. Your $80 mic + acoustic foam is 10x more important',
    content: `Viewers will tolerate 1080p phone footage if the lighting is clean and the audio is rich. But nobody tolerates tinny, echoey microphone audio for more than 5 seconds.

Before you upgrade to a Sony FX3:
- Get a dynamic mic (Rode PodMic / Shure MV7 / Samson Q2U)
- Hang a thick blanket behind your monitor
- Add a $15 lavalier if you are mobile
Watch your average view duration go up instantly!`,
    timestamp: '2 days ago',
    likes: 167,
    commentsCount: 29,
    tags: ['Gear', 'AudioQuality', 'BudgetSetup'],
    comments: []
  }
];

export const initialMatchups: ThumbnailMatchup[] = [
  {
    id: 'matchup-1',
    videoTitle: 'I Tested The Top 5 AI Video Editors (One Blew Me Away)',
    creator: {
      name: 'Elena Rostova',
      channelName: 'Elena Edits',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
      subscribers: '3.1K'
    },
    niche: 'Tech / AI',
    variantA: {
      title: 'Variant A (Clean Software UI + Shock Face)',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=640&h=360&q=80',
      concept: 'Shows glowing comparison timeline with big red "NOT EVEN CLOSE" label',
      votes: 142,
      colorAccent: '#ef4444'
    },
    variantB: {
      title: 'Variant B (Minimalist vs Logos Grid)',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=640&h=360&q=80',
      concept: 'High contrast black & gold theme with "THE WINNER" stamp and 5 tool logos',
      votes: 284,
      colorAccent: '#eab308'
    },
    totalVotes: 426,
    keyInsight: 'Variant B wins with 67% of votes because the logos trigger immediate recognition in the browse feed, whereas generic shock faces are experiencing ad fatigue.',
    createdAt: '3 hours ago'
  },
  {
    id: 'matchup-2',
    videoTitle: 'How to Build a $5,000/Month Faceless Channel from Scratch',
    creator: {
      name: 'Ryan Vance',
      channelName: 'Vance Capital',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
      subscribers: '19.4K'
    },
    niche: 'Finance',
    variantA: {
      title: 'Variant A (Revenue Graph + Question Mark)',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=640&h=360&q=80',
      concept: 'Green upward hockey-stick graph with "$0 to $5K" and masked face silhouette',
      votes: 210,
      colorAccent: '#10b981'
    },
    variantB: {
      title: 'Variant B (Real Bank Screenshot Proof)',
      imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=640&h=360&q=80',
      concept: 'High-contrast mobile notification screenshot: "Direct Deposit +$5,120.00"',
      votes: 315,
      colorAccent: '#3b82f6'
    },
    totalVotes: 525,
    keyInsight: 'Variant B crushed Variant A by 60/40. Authentic concrete proof (the notification style) builds instant trust over generic vector stock graphs.',
    createdAt: 'Yesterday'
  }
];

export const initialCritiques: ThumbnailCritique[] = [
  {
    id: 'critique-1',
    videoTitle: 'Why 99% of Blender Beginners Quit in 7 Days',
    targetNiche: '3D Art / Design',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=640&h=360&q=80',
    creator: {
      name: 'Toby Ward',
      channelName: 'PolyPixel 3D',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
      subscribers: '1.4K'
    },
    scores: {
      clarity: 8.5,
      mobileReadability: 7.2,
      curiosity: 9.0,
      overall: 8.2
    },
    feedbackCount: 14,
    createdAt: '4 hours ago',
    reviews: [
      {
        id: 'rev-1',
        author: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80',
        subs: '48.6K',
        score: 8.5,
        comment: 'Great color grading! But when you shrink this down to 140px on mobile, the donut wireframe in the corner gets lost. Increase the wireframe scale by 25%.',
        timestamp: '3 hours ago'
      },
      {
        id: 'rev-2',
        author: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
        subs: '2.8K',
        score: 8.0,
        comment: 'Change the text from "DON\'T MAKE THIS" to just "QUIT HERE?". Less words, twice the intrigue.',
        timestamp: '1 hour ago'
      }
    ]
  },
  {
    id: 'critique-2',
    videoTitle: 'The Ultimate Minimalist Desk Setup for Coders 2026',
    targetNiche: 'Tech / Productivity',
    thumbnailUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=640&h=360&q=80',
    creator: {
      name: 'Chloe Lin',
      channelName: 'CodeWithChloe',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
      subscribers: '5.8K'
    },
    scores: {
      clarity: 9.1,
      mobileReadability: 8.8,
      curiosity: 7.5,
      overall: 8.4
    },
    feedbackCount: 8,
    createdAt: '1 day ago',
    reviews: [
      {
        id: 'rev-3',
        author: 'Liam Gallagher',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80',
        subs: '1.9K',
        score: 8.5,
        comment: 'The cable management visual is immaculate. To boost CTR, put a blurred out price tag sticker over the monitor ("$???")',
        timestamp: '18 hours ago'
      }
    ]
  }
];

export const initialCollabs: CollabListing[] = [
  {
    id: 'collab-1',
    creator: {
      name: 'Zack Morales',
      channelName: 'GameTheoryCraft',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&h=150&q=80',
      subscribers: 4200,
      niche: 'Gaming'
    },
    title: 'Looking for 3 creators for a "100 YouTubers in a Hardcore Survival World" Event',
    format: 'Gaming Co-op',
    description: 'We are organizing an episodic Minecraft Hardcore event where creators must trade and form alliances. Each participant gets access to the shared multi-POV camera footage for their own channel editing.',
    idealPartner: 'Gaming or entertainment creators with 1k to 10k subscribers with good mic audio and commentary banter.',
    subRange: '1K - 10K',
    contactPlatform: 'Discord',
    contactHandle: 'ZackCraft#8891',
    status: 'Open',
    createdAt: '2 days ago',
    applicantCount: 7
  },
  {
    id: 'collab-2',
    creator: {
      name: 'Maya Patel',
      channelName: 'The AI Foundry',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
      subscribers: 8900,
      niche: 'Tech'
    },
    title: 'Podcast Co-Host/Guest: Debating "Will AI Replace Indie Creators?"',
    format: 'Podcast',
    description: 'Planning a high-tempo 30-minute debate recorded via Riverside.fm. We will cut 6 collaborative Shorts/Reels tagging both channels to cross-pollinate audiences.',
    idealPartner: 'Tech, design, or video editor creators who have strong opinions on generative AI tools.',
    subRange: '1K - 10K',
    contactPlatform: 'Twitter/X',
    contactHandle: '@MayaFoundry',
    status: 'Open',
    createdAt: '1 day ago',
    applicantCount: 4
  },
  {
    id: 'collab-3',
    creator: {
      name: 'Lucas Brand',
      channelName: 'FitFuel Daily',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80',
      subscribers: 18200,
      niche: 'Vlog & Lifestyle'
    },
    title: 'Cross-Niche Shorts Swap: "Training Like a Pro Gamer vs Pro Athlete"',
    format: 'Shorts Swap',
    description: 'Looking to do a comedic split-screen experiment where I try an esports warmup routine and the gaming creator tries an Olympic lifting session. High viral retention potential!',
    idealPartner: 'Gaming or tech creator (10k-50k subs) based in US or able to record remote footage.',
    subRange: '10K - 50K',
    contactPlatform: 'Email',
    contactHandle: 'collab@fitfueldaily.com',
    status: 'Open',
    createdAt: '3 days ago',
    applicantCount: 9
  }
];

export const initialPlaybooks: GrowthPlaybook[] = [
  {
    id: 'pb-1',
    title: 'The 3-Element Thumbnail Rule That Boosts CTR from 3% to 8%',
    subtitle: 'Stop cluttering your packaging. Why simplicity triggers maximum cognitive processing speed.',
    category: 'CTR & Packaging',
    readTime: '6 min read',
    difficulty: 'Beginner',
    summary: 'When a viewer scrolls YouTube Home feed on mobile, you have exactly 0.4 seconds to win their focus. The 3-element composition rule ensures instant processing.',
    keyTakeaways: [
      'Maximum 3 visual elements: Focal Subject, Emotional Reaction, Contextual Prop.',
      'Never put more than 3 words of text. Let the title handle the search keywords.',
      'Test your thumbnail at 10% zoom. If you cannot recognize the story, scrap it.',
      'Complement, do not duplicate: If title says "I Quit Caffeine", thumbnail says "72 HOURS OF HELL".'
    ],
    sections: [
      {
        heading: '1. The Cognitive Load Problem',
        content: 'Beginners make the mistake of trying to tell the entire 15-minute video plot in the thumbnail: 4 logos, 8 words of text, 3 arrows, and a glow effect. The human brain interprets visual chaos as spam and scrolls right past.',
        actionableTip: 'Remove every element from your canvas one by one. If removing an element does not break the curiosity gap, leave it off permanently.'
      },
      {
        heading: '2. Contrast & The Mobile Check',
        content: 'Over 72% of all YouTube watch time originates on mobile devices where thumbnails are rendered between 120px and 220px wide. Bright primary accents (warm golden amber, electric cyan, vibrant lime) against deep desaturated backgrounds dramatically outperform low-contrast pastel gradients.',
        actionableTip: 'Always invert your background to a dark slate (#18181b) before adding light text overlays.'
      }
    ]
  },
  {
    id: 'pb-2',
    title: 'Surviving the 30-Second Retention Cliff',
    subtitle: 'The mathematical breakdown of why 40% of viewers drop off in the opening seconds.',
    category: 'Retention & Hook',
    readTime: '8 min read',
    difficulty: 'Intermediate',
    summary: 'The YouTube recommendation engine evaluates viewer satisfaction primarily within the first 30 to 60 seconds. Learn the "Immediate Stakes" formula.',
    keyTakeaways: [
      'Banish intros and self-introductions forever. The viewer clicked for the promise, not your brand.',
      'Deploy the "Pattern Interrupt" within the first 4 seconds.',
      'Establish a curiosity loop: introduce a question that cannot be answered until the third act.',
      'Match the visual payoff immediately to validate the thumbnail click.'
    ],
    sections: [
      {
        heading: '1. The Disconfirmation Gap',
        content: 'If someone clicks a thumbnail showing a burning car and your video starts with you sitting calmly at a desk talking about cars for 20 seconds, you triggered disconfirmation. The viewer feels misled and clicks the back button immediately.',
        actionableTip: 'Your first frame MUST visually echo the exact scene, color, or prop featured in your thumbnail.'
      },
      {
        heading: '2. The 3-Beat Hook Script',
        content: 'Beat 1 (0-3s): The boldest stake or failure state. Beat 2 (3-8s): Why this affects the viewer directly. Beat 3 (8-15s): The mystery or obstacle that makes the outcome uncertain.',
        actionableTip: 'Write 3 different opening lines before you shoot. Record all 3 and pick the one with the fastest pacing in the edit.'
      }
    ]
  },
  {
    id: 'pb-3',
    title: 'The Search + Shorts Flywheel: From 0 to 1,000 Subscribers',
    subtitle: 'How to break the cold-start algorithm without having an existing audience.',
    category: 'Shorts to Long-form',
    readTime: '7 min read',
    difficulty: 'Beginner',
    summary: 'When your channel has zero authority, browse recommendations won’t trigger. You need high-intent search utility paired with high-velocity Shorts discoverability.',
    keyTakeaways: [
      'Search creates baseline traffic; Shorts introduces your personality at scale.',
      'Target specific "How to [do X] in [Software/Game] 2026" long-tail queries.',
      'Consistency is not daily uploads—it is predictable quality cadence.',
      'Build a community Discord or newsletter starting at 250 subscribers.'
    ],
    sections: [
      {
        heading: '1. Why Browse Ignores Zero-Sub Channels',
        content: 'The YouTube Browse system needs prior audience profile clusters to know who to recommend your video to. Search traffic feeds this data by showing exactly what keywords satisfy viewers first.',
        actionableTip: 'Use search-suggest queries in the YouTube search bar to find underserved question phrases with high search intent.'
      }
    ]
  }
];
