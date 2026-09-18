export interface CreatorUser {
  id: string;
  name: string;
  channelName: string;
  handle: string;
  avatar: string;
  subscribers: number;
  niche: 'Tech' | 'Gaming' | 'Education' | 'Vlog & Lifestyle' | 'Finance' | 'Shorts' | 'Entertainment';
  badges: string[];
  uploadStreak: number;
  videosCount: number;
  bio: string;
  level: string;
}

export interface CommentItem {
  id: string;
  author: {
    name: string;
    channelName: string;
    avatar: string;
    subscribers: string;
    badge?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    channelName: string;
    avatar: string;
    subscribers: string;
    badge?: string;
  };
  category: 'algorithm' | 'milestone' | 'thumbnail' | 'monetization' | 'shorts' | 'gear' | 'case-study';
  niche: string;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
  comments: CommentItem[];
  tags: string[];
  videoThumbnail?: string;
  videoTitle?: string;
  userLiked?: boolean;
  isBookmarked?: boolean;
  highlightBadge?: string;
}

export interface ThumbnailMatchup {
  id: string;
  videoTitle: string;
  creator: {
    name: string;
    channelName: string;
    avatar: string;
    subscribers: string;
  };
  niche: string;
  variantA: {
    title: string;
    imageUrl: string;
    concept: string;
    votes: number;
    colorAccent: string;
  };
  variantB: {
    title: string;
    imageUrl: string;
    concept: string;
    votes: number;
    colorAccent: string;
  };
  totalVotes: number;
  userVoted?: 'A' | 'B';
  keyInsight: string;
  createdAt: string;
}

export interface ThumbnailCritique {
  id: string;
  videoTitle: string;
  targetNiche: string;
  thumbnailUrl: string;
  creator: {
    name: string;
    channelName: string;
    avatar: string;
    subscribers: string;
  };
  scores: {
    clarity: number; // 1-10
    mobileReadability: number;
    curiosity: number;
    overall: number;
  };
  feedbackCount: number;
  reviews: Array<{
    id: string;
    author: string;
    avatar: string;
    subs: string;
    score: number;
    comment: string;
    timestamp: string;
  }>;
  createdAt: string;
}

export interface CollabListing {
  id: string;
  creator: {
    name: string;
    channelName: string;
    avatar: string;
    subscribers: number;
    niche: string;
  };
  title: string;
  format: 'Podcast' | 'Challenge Video' | 'Shorts Swap' | 'Guest Feature' | 'Gaming Co-op' | 'Discussion';
  description: string;
  idealPartner: string;
  subRange: '0 - 1K' | '1K - 10K' | '10K - 50K' | '50K+';
  contactPlatform: 'Discord' | 'Email' | 'Twitter/X' | 'In-App';
  contactHandle: string;
  status: 'Open' | 'Matched';
  createdAt: string;
  applicantCount: number;
}

export interface GrowthPlaybook {
  id: string;
  title: string;
  subtitle: string;
  category: 'CTR & Packaging' | 'Retention & Hook' | 'Algorithm Secrets' | 'Shorts to Long-form' | 'Monetization';
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  keyTakeaways: string[];
  sections: Array<{
    heading: string;
    content: string;
    actionableTip?: string;
  }>;
}

export interface GeneratedTitle {
  title: string;
  predictedCtr: number;
  characterCount: number;
  hookType: string;
  whyItWorks: string;
}

export interface HookAnalysis {
  retentionScore: number;
  hookVelocity: string;
  verdict: string;
  flaws: string[];
  strengths: string[];
  rewrites: Array<{
    style: string;
    script: string;
    visualCues: string;
  }>;
  proTip: string;
}

export interface OutlierIdea {
  title: string;
  angle: string;
  thumbnailConcept: string;
  retentionHook: string;
  targetAudience: string;
  difficulty: string;
}
