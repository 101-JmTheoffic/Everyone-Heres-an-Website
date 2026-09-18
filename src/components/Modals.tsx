import React, { useState } from 'react';
import { X, Sparkles, Image, Flame, Users, User, Send, Tag } from 'lucide-react';
import { CreatorUser, CommunityPost, ThumbnailMatchup, ThumbnailCritique, CollabListing } from '../types';

// 1. Create Discussion Post Modal
interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CreatorUser;
  onSubmit: (post: Omit<CommunityPost, 'id' | 'timestamp' | 'likes' | 'commentsCount' | 'comments'>) => void;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({ isOpen, onClose, currentUser, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CommunityPost['category']>('milestone');
  const [niche, setNiche] = useState(currentUser.niche);
  const [tagInput, setTagInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    onSubmit({
      author: {
        name: currentUser.name,
        channelName: currentUser.channelName,
        avatar: currentUser.avatar,
        subscribers: `${(currentUser.subscribers / 1000).toFixed(1)}K`,
        badge: currentUser.badges[0]
      },
      category,
      niche,
      title,
      content,
      tags: tags.length ? tags : ['CreatorGrowth', category]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-805 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-500" />
            Start a Creator Community Discussion
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white font-bold text-sm">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Post Title</label>
            <input
              type="text"
              required
              placeholder="e.g. How I fixed my 30-second retention cliff..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2.5 rounded-xl focus:outline-none focus:border-red-500 placeholder-zinc-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2 rounded-xl focus:outline-none focus:border-red-500"
              >
                <option value="milestone">🎉 Milestone Celebration</option>
                <option value="algorithm">📈 Algorithm & Traffic</option>
                <option value="thumbnail">🎨 Thumbnail & Title Advice</option>
                <option value="shorts">⚡ Shorts Strategy</option>
                <option value="gear">🎙️ Gear & Setup</option>
                <option value="monetization">💰 Monetization</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Niche</label>
              <select
                value={niche}
                onChange={e => setNiche(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2 rounded-xl focus:outline-none focus:border-red-500"
              >
                <option value="Tech">Tech</option>
                <option value="Gaming">Gaming</option>
                <option value="Education">Education</option>
                <option value="Vlog & Lifestyle">Vlog & Lifestyle</option>
                <option value="Finance">Finance</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Content / Insights</label>
            <textarea
              required
              rows={5}
              placeholder="Share concrete lessons, analytics breakdowns, or questions for fellow creators..."
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2.5 rounded-xl focus:outline-none focus:border-red-500 placeholder-zinc-400"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              placeholder="Milestone, Retention, CTR, 1KClub"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2.5 rounded-xl focus:outline-none focus:border-red-500 placeholder-zinc-400"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold shadow-md shadow-red-600/20"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. Submit A/B Matchup Modal
interface SubmitMatchupModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CreatorUser;
  onSubmit: (matchup: Omit<ThumbnailMatchup, 'id' | 'totalVotes' | 'createdAt'>) => void;
}

export const SubmitMatchupModal: React.FC<SubmitMatchupModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSubmit
}) => {
  const [videoTitle, setVideoTitle] = useState('');
  const [niche, setNiche] = useState(currentUser.niche);
  const [conceptA, setConceptA] = useState('');
  const [imageA, setImageA] = useState('');
  const [conceptB, setConceptB] = useState('');
  const [imageB, setImageB] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle.trim()) return;

    onSubmit({
      videoTitle,
      creator: {
        name: currentUser.name,
        channelName: currentUser.channelName,
        avatar: currentUser.avatar,
        subscribers: `${(currentUser.subscribers / 1000).toFixed(1)}K`
      },
      niche,
      variantA: {
        title: 'Option A',
        imageUrl: imageA || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=640&h=360&q=80',
        concept: conceptA || 'Option A Concept',
        votes: 1,
        colorAccent: '#ef4444'
      },
      variantB: {
        title: 'Option B',
        imageUrl: imageB || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=640&h=360&q=80',
        concept: conceptB || 'Option B Concept',
        votes: 1,
        colorAccent: '#eab308'
      },
      keyInsight: 'Community voting in progress to determine the packaging winner.'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-red-500" />
            Submit Thumbnail A/B Split Test
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white font-bold text-sm">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Video Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Why I Quit My Job for YouTube in 2026"
              value={videoTitle}
              onChange={e => setVideoTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2.5 rounded-xl focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Option A */}
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-2">
              <span className="font-bold text-red-400">Variant A</span>
              <input
                type="text"
                placeholder="Image URL or Unsplash link"
                value={imageA}
                onChange={e => setImageA(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 p-1.5 rounded text-[11px]"
              />
              <input
                type="text"
                placeholder="Concept (e.g. Red background + shock)"
                value={conceptA}
                onChange={e => setConceptA(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 p-1.5 rounded text-[11px]"
              />
            </div>

            {/* Option B */}
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-2">
              <span className="font-bold text-amber-400">Variant B</span>
              <input
                type="text"
                placeholder="Image URL or Unsplash link"
                value={imageB}
                onChange={e => setImageB(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 p-1.5 rounded text-[11px]"
              />
              <input
                type="text"
                placeholder="Concept (e.g. Clean screenshot)"
                value={conceptB}
                onChange={e => setConceptB(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-200 p-1.5 rounded text-[11px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold shadow-md shadow-red-600/20"
            >
              Launch Matchup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. Post Collab Request Modal
interface NewCollabModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CreatorUser;
  onSubmit: (collab: Omit<CollabListing, 'id' | 'createdAt' | 'applicantCount' | 'status'>) => void;
}

export const NewCollabModal: React.FC<NewCollabModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSubmit
}) => {
  const [title, setTitle] = useState('');
  const [format, setFormat] = useState<CollabListing['format']>('Podcast');
  const [description, setDescription] = useState('');
  const [idealPartner, setIdealPartner] = useState('');
  const [subRange, setSubRange] = useState<CollabListing['subRange']>('1K - 10K');
  const [contactPlatform, setContactPlatform] = useState<CollabListing['contactPlatform']>('Discord');
  const [contactHandle, setContactHandle] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onSubmit({
      creator: {
        name: currentUser.name,
        channelName: currentUser.channelName,
        avatar: currentUser.avatar,
        subscribers: currentUser.subscribers,
        niche: currentUser.niche
      },
      title,
      format,
      description,
      idealPartner: idealPartner || 'Creators in similar niche with consistent upload habit',
      subRange,
      contactPlatform,
      contactHandle: contactHandle || '@' + currentUser.channelName.toLowerCase()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-red-500" />
            Post a Creator Collaboration Request
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white font-bold text-sm">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Collaboration Project Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Looking for 2 Gaming creators for a Speedrun Challenge"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2.5 rounded-xl focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Format</label>
              <select
                value={format}
                onChange={e => setFormat(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2 rounded-xl focus:outline-none focus:border-red-500"
              >
                <option value="Podcast">Podcast</option>
                <option value="Challenge Video">Challenge Video</option>
                <option value="Shorts Swap">Shorts Swap</option>
                <option value="Gaming Co-op">Gaming Co-op</option>
                <option value="Guest Feature">Guest Feature</option>
                <option value="Discussion">Discussion</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Target Sub Tier</label>
              <select
                value={subRange}
                onChange={e => setSubRange(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2 rounded-xl focus:outline-none focus:border-red-500"
              >
                <option value="0 - 1K">0 - 1K Subscribers</option>
                <option value="1K - 10K">1K - 10K Subscribers</option>
                <option value="10K - 50K">10K - 50K Subscribers</option>
                <option value="50K+">50K+ Subscribers</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Project Concept & Video Scope</label>
            <textarea
              required
              rows={3}
              placeholder="Explain what the video is about, how each channel benefits, and recording timeline..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2.5 rounded-xl focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Ideal Partner Requirements</label>
            <input
              type="text"
              placeholder="e.g. Good microphone, Minecraft Java edition, funny commentary"
              value={idealPartner}
              onChange={e => setIdealPartner(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2.5 rounded-xl focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Contact Platform</label>
              <select
                value={contactPlatform}
                onChange={e => setContactPlatform(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2 rounded-xl focus:outline-none focus:border-red-500"
              >
                <option value="Discord">Discord</option>
                <option value="Twitter/X">Twitter/X</option>
                <option value="Email">Email</option>
                <option value="In-App">In-App</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Contact Handle</label>
              <input
                type="text"
                required
                placeholder="e.g. Alex#1234 or @channel"
                value={contactHandle}
                onChange={e => setContactHandle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2 rounded-xl focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold shadow-md shadow-red-600/20"
            >
              Post Collab
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 4. Edit Creator Profile Modal
interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CreatorUser;
  onSave: (updated: Partial<CreatorUser>) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSave
}) => {
  const [name, setName] = useState(currentUser.name);
  const [channelName, setChannelName] = useState(currentUser.channelName);
  const [subscribers, setSubscribers] = useState(currentUser.subscribers);
  const [niche, setNiche] = useState(currentUser.niche);
  const [bio, setBio] = useState(currentUser.bio);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      channelName,
      subscribers: Number(subscribers),
      niche: niche as any,
      bio
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-red-500" />
            Edit Creator Channel Profile
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white font-bold text-sm">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Creator Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2.5 rounded-xl focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">YouTube Channel Name</label>
            <input
              type="text"
              value={channelName}
              onChange={e => setChannelName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2.5 rounded-xl focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Subscribers</label>
              <input
                type="number"
                value={subscribers}
                onChange={e => setSubscribers(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2.5 rounded-xl focus:outline-none focus:border-red-500"
              >
              </input>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Channel Niche</label>
              <select
                value={niche}
                onChange={e => setNiche(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2 rounded-xl focus:outline-none focus:border-red-500"
              >
                <option value="Tech">Tech</option>
                <option value="Gaming">Gaming</option>
                <option value="Education">Education</option>
                <option value="Vlog & Lifestyle">Vlog & Lifestyle</option>
                <option value="Finance">Finance</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Channel Bio & Goals</label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 p-2.5 rounded-xl focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold shadow-md shadow-red-600/20"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
