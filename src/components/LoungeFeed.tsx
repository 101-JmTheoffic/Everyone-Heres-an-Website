import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  TrendingUp, 
  Search, 
  Sparkles, 
  Filter, 
  Trophy, 
  Tag, 
  Send,
  CheckCircle2,
  Check
} from 'lucide-react';
import { CommunityPost, CreatorUser } from '../types';

interface LoungeFeedProps {
  posts: CommunityPost[];
  currentUser: CreatorUser;
  onLikePost: (postId: string) => void;
  onBookmarkPost: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onOpenNewPost: () => void;
}

export const LoungeFeed: React.FC<LoungeFeedProps> = ({
  posts,
  currentUser,
  onLikePost,
  onBookmarkPost,
  onAddComment,
  onOpenNewPost,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({ 'post-1': true });
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Discussions' },
    { id: 'milestone', label: '🎉 Milestones' },
    { id: 'algorithm', label: '📈 Algorithm & Traffic' },
    { id: 'thumbnail', label: '🎨 Thumbnail & Titles' },
    { id: 'shorts', label: '⚡ Shorts Strategies' },
    { id: 'gear', label: '🎙️ Gear & Audio' },
    { id: 'monetization', label: '💰 Monetization' },
  ];

  const niches = ['All Niches', 'Tech', 'Gaming', 'Education', 'Vlog & Lifestyle', 'Finance', 'Entertainment'];

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
    if (selectedNiche !== 'All Niches' && selectedNiche !== 'all' && post.niche !== selectedNiche) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchContent = post.content.toLowerCase().includes(q);
      const matchTags = post.tags.some(t => t.toLowerCase().includes(q));
      const matchAuthor = post.author.channelName.toLowerCase().includes(q);
      return matchTitle || matchContent || matchTags || matchAuthor;
    }
    return true;
  });

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    onAddComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    setExpandedComments(prev => ({ ...prev, [postId]: true }));
  };

  const handleShare = (postId: string) => {
    setCopiedPostId(postId);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Quick Post Trigger */}
      <div className="rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-5 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-radial from-red-600/10 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-12 h-12 rounded-full object-cover ring-2 ring-red-500/60"
            />
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                What are you testing on your channel this week, {currentUser.name}?
              </h2>
              <p className="text-xs text-zinc-400">
                Share a milestone, request feedback on a packaging dilemma, or drop an algorithm case study.
              </p>
            </div>
          </div>

          <button
            id="btn-lounge-start-discussion"
            onClick={onOpenNewPost}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md shadow-red-600/20 flex items-center gap-2 flex-shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Start a Discussion</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-cat-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Niche & Search */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="relative">
            <select
              id="select-niche-filter"
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              aria-label="Filter by Niche"
              className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs rounded-lg px-2.5 py-1.5 pr-7 focus:outline-none focus:border-red-500 appearance-none cursor-pointer"
            >
              {niches.map((n) => (
                <option key={n} value={n === 'All Niches' ? 'all' : n}>{n}</option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-zinc-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          <div className="relative flex-1 md:w-56">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              id="input-lounge-search"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-red-500 placeholder-zinc-400"
            />
          </div>
        </div>
      </div>

      {/* Feed list */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-zinc-900/40 rounded-xl border border-zinc-800/80">
            <TrendingUp className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-zinc-300">No discussions match your filter</p>
            <p className="text-xs text-zinc-400 mt-1">Try changing category or clearing your search term.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedNiche('all'); setSearchQuery(''); }}
              className="mt-3 px-3 py-1.5 bg-zinc-800 text-zinc-300 text-xs rounded-lg hover:bg-zinc-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isCommentsOpen = !!expandedComments[post.id];
            return (
              <article
                key={post.id}
                id={`post-card-${post.id}`}
                className="bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800/90 rounded-xl p-5 transition-all shadow-sm"
              >
                {/* Header: Author + Meta */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-zinc-700"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-zinc-100">{post.author.channelName}</span>
                        {post.author.badge && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800/50">
                            {post.author.badge}
                          </span>
                        )}
                        <span className="text-[11px] text-zinc-400">
                          {post.author.subscribers} subs
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                        <span>{post.timestamp}</span>
                        <span>•</span>
                        <span className="text-zinc-400">{post.niche}</span>
                      </div>
                    </div>
                  </div>

                  {post.highlightBadge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60 flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      {post.highlightBadge}
                    </span>
                  )}
                </div>

                {/* Post Title */}
                <h3 className="text-base font-bold text-zinc-100 mb-2 leading-snug">
                  {post.title}
                </h3>

                {/* Post Content */}
                <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line mb-4 font-normal">
                  {post.content}
                </div>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-400 border border-zinc-700/60"
                    >
                      <Tag className="w-2.5 h-2.5 text-zinc-400" />
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action footer: Like, Comments, Bookmark, Share */}
                <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs text-zinc-400">
                  <div className="flex items-center gap-4">
                    <button
                      id={`btn-like-post-${post.id}`}
                      onClick={() => onLikePost(post.id)}
                      className={`flex items-center gap-1.5 font-medium transition-colors ${
                        post.userLiked ? 'text-red-500 font-bold' : 'hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.userLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    <button
                      id={`btn-toggle-comments-${post.id}`}
                      onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                      className="flex items-center gap-1.5 hover:text-zinc-200 font-medium transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-zinc-400" />
                      <span>{post.comments.length} Comments</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      id={`btn-bookmark-post-${post.id}`}
                      onClick={() => onBookmarkPost(post.id)}
                      className={`p-1.5 rounded-md transition-colors ${
                        post.isBookmarked ? 'text-amber-400 bg-amber-950/40' : 'hover:text-zinc-200'
                      }`}
                      title={post.isBookmarked ? 'Bookmarked' : 'Bookmark post'}
                    >
                      <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-amber-400' : ''}`} />
                    </button>

                    <button
                      id={`btn-share-post-${post.id}`}
                      onClick={() => handleShare(post.id)}
                      className="p-1.5 rounded-md hover:text-zinc-200 transition-colors relative"
                      title="Share link"
                    >
                      {copiedPostId === post.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Comment Section (Collapsible) */}
                {isCommentsOpen && (
                  <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-3">
                    {/* Comments list */}
                    {post.comments.length > 0 ? (
                      <div className="space-y-2.5">
                        {post.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="bg-zinc-950/60 rounded-lg p-3 border border-zinc-800/60 flex items-start gap-2.5"
                          >
                            <img
                              src={comment.author.avatar}
                              alt={comment.author.name}
                              className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap text-xs">
                                <span className="font-bold text-zinc-200">{comment.author.channelName}</span>
                                <span className="text-[10px] text-zinc-400">({comment.author.subscribers} subs)</span>
                                <span className="text-[10px] text-zinc-400">• {comment.timestamp}</span>
                              </div>
                              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-zinc-400 italic">No comments yet. Be the first creator to share your thoughts!</p>
                    )}

                    {/* New comment input */}
                    <form
                      onSubmit={(e) => handleCommentSubmit(post.id, e)}
                      className="flex items-center gap-2 mt-2"
                    >
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                      />
                      <input
                        type="text"
                        id={`input-comment-${post.id}`}
                        placeholder="Add constructive creator feedback..."
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                        className="flex-1 bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-red-500 placeholder-zinc-400"
                      />
                      <button
                        type="submit"
                        id={`btn-submit-comment-${post.id}`}
                        disabled={!commentInputs[post.id]?.trim()}
                        className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Send className="w-3 h-3" />
                        <span>Reply</span>
                      </button>
                    </form>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
