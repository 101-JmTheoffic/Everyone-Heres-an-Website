/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LoungeFeed } from './components/LoungeFeed';
import { ThumbnailArena } from './components/ThumbnailArena';
import { CollabHub } from './components/CollabHub';
import { AiGrowthLab } from './components/AiGrowthLab';
import { ChannelVelocity } from './components/ChannelVelocity';
import { GrowthAcademy } from './components/GrowthAcademy';
import { 
  NewPostModal, 
  SubmitMatchupModal, 
  NewCollabModal, 
  ProfileModal 
} from './components/Modals';
import { 
  initialCurrentUser, 
  initialPosts, 
  initialMatchups, 
  initialCritiques, 
  initialCollabs, 
  initialPlaybooks 
} from './data/initialData';
import { 
  CreatorUser, 
  CommunityPost, 
  ThumbnailMatchup, 
  ThumbnailCritique, 
  CollabListing 
} from './types';
import { CheckCircle2, Heart, Sparkles, Youtube } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('lounge');

  // Persistent user & data state
  const [currentUser, setCurrentUser] = useState<CreatorUser>(() => {
    const saved = localStorage.getItem('tubegrow_user');
    return saved ? JSON.parse(saved) : initialCurrentUser;
  });

  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('tubegrow_posts');
    return saved ? JSON.parse(saved) : initialPosts;
  });

  const [matchups, setMatchups] = useState<ThumbnailMatchup[]>(() => {
    const saved = localStorage.getItem('tubegrow_matchups');
    return saved ? JSON.parse(saved) : initialMatchups;
  });

  const [critiques, setCritiques] = useState<ThumbnailCritique[]>(() => {
    const saved = localStorage.getItem('tubegrow_critiques');
    return saved ? JSON.parse(saved) : initialCritiques;
  });

  const [collabs, setCollabs] = useState<CollabListing[]>(() => {
    const saved = localStorage.getItem('tubegrow_collabs');
    return saved ? JSON.parse(saved) : initialCollabs;
  });

  // Modal controls
  const [isNewPostOpen, setIsNewPostOpen] = useState<boolean>(false);
  const [isSubmitMatchupOpen, setIsSubmitMatchupOpen] = useState<boolean>(false);
  const [isNewCollabOpen, setIsNewCollabOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('tubegrow_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('tubegrow_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('tubegrow_matchups', JSON.stringify(matchups));
  }, [matchups]);

  useEffect(() => {
    localStorage.setItem('tubegrow_critiques', JSON.stringify(critiques));
  }, [critiques]);

  useEffect(() => {
    localStorage.setItem('tubegrow_collabs', JSON.stringify(collabs));
  }, [collabs]);

  // Handlers
  const handleLikePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const userLiked = !p.userLiked;
          return {
            ...p,
            userLiked,
            likes: userLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const handleBookmarkPost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const isBookmarked = !p.isBookmarked;
          showToast(isBookmarked ? 'Post saved to bookmarks' : 'Post removed from bookmarks');
          return { ...p, isBookmarked };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string, content: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      author: {
        name: currentUser.name,
        channelName: currentUser.channelName,
        avatar: currentUser.avatar,
        subscribers: `${(currentUser.subscribers / 1000).toFixed(1)}K`,
        badge: currentUser.badges[0],
      },
      content,
      timestamp: 'Just now',
      likes: 0,
    };

    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );
    showToast('Reply added to discussion!');
  };

  const handleCreatePost = (postData: Omit<CommunityPost, 'id' | 'timestamp' | 'likes' | 'commentsCount' | 'comments'>) => {
    const newPost: CommunityPost = {
      ...postData,
      id: `post-${Date.now()}`,
      timestamp: 'Just now',
      likes: 1,
      userLiked: true,
      commentsCount: 0,
      comments: [],
    };
    setPosts(prev => [newPost, ...prev]);
    showToast('Discussion posted to Creator Lounge!');
  };

  const handleVoteMatchup = (matchupId: string, variant: 'A' | 'B') => {
    setMatchups(prev =>
      prev.map(m => {
        if (m.id === matchupId) {
          if (m.userVoted === variant) return m; // already voted for this
          const isSwitch = !!m.userVoted && m.userVoted !== variant;

          const updatedA = { ...m.variantA };
          const updatedB = { ...m.variantB };

          if (variant === 'A') {
            updatedA.votes += 1;
            if (isSwitch) updatedB.votes = Math.max(0, updatedB.votes - 1);
          } else {
            updatedB.votes += 1;
            if (isSwitch) updatedA.votes = Math.max(0, updatedA.votes - 1);
          }

          const totalVotes = m.totalVotes + (isSwitch ? 0 : 1);
          return {
            ...m,
            userVoted: variant,
            variantA: updatedA,
            variantB: updatedB,
            totalVotes,
          };
        }
        return m;
      })
    );
    showToast(`Voted for Variant ${variant}!`);
  };

  const handleAddReview = (critiqueId: string, score: number, comment: string) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      author: currentUser.channelName,
      avatar: currentUser.avatar,
      subs: `${(currentUser.subscribers / 1000).toFixed(1)}K`,
      score,
      comment,
      timestamp: 'Just now',
    };

    setCritiques(prev =>
      prev.map(c => {
        if (c.id === critiqueId) {
          return {
            ...c,
            feedbackCount: c.feedbackCount + 1,
            reviews: [newReview, ...c.reviews],
          };
        }
        return c;
      })
    );
    showToast('Roast feedback added!');
  };

  const handleCreateMatchup = (matchupData: Omit<ThumbnailMatchup, 'id' | 'totalVotes' | 'createdAt'>) => {
    const newMatchup: ThumbnailMatchup = {
      ...matchupData,
      id: `matchup-${Date.now()}`,
      totalVotes: 2,
      createdAt: 'Just now',
    };
    setMatchups(prev => [newMatchup, ...prev]);
    showToast('Thumbnail split-test launched in Arena!');
  };

  const handleCreateCollab = (collabData: Omit<CollabListing, 'id' | 'createdAt' | 'applicantCount' | 'status'>) => {
    const newCollab: CollabListing = {
      ...collabData,
      id: `collab-${Date.now()}`,
      createdAt: 'Just now',
      applicantCount: 0,
      status: 'Open',
    };
    setCollabs(prev => [newCollab, ...prev]);
    showToast('Collab opportunity published in Collab Hub!');
  };

  const handleApplyCollab = (collabId: string, _pitch: string) => {
    setCollabs(prev =>
      prev.map(c => {
        if (c.id === collabId) {
          return { ...c, applicantCount: c.applicantCount + 1 };
        }
        return c;
      })
    );
  };

  const handleUpdateSubs = (newSubs: number) => {
    setCurrentUser(prev => ({ ...prev, subscribers: newSubs }));
    showToast(`Updated subscriber count to ${newSubs.toLocaleString()}!`);
  };

  const handleSaveProfile = (updated: Partial<CreatorUser>) => {
    setCurrentUser(prev => ({ ...prev, ...updated }));
    showToast('Creator profile updated!');
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-zinc-100 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenNewPost={() => setIsNewPostOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'lounge' && (
          <LoungeFeed
            posts={posts}
            currentUser={currentUser}
            onLikePost={handleLikePost}
            onBookmarkPost={handleBookmarkPost}
            onAddComment={handleAddComment}
            onOpenNewPost={() => setIsNewPostOpen(true)}
          />
        )}

        {activeTab === 'arena' && (
          <ThumbnailArena
            matchups={matchups}
            critiques={critiques}
            currentUser={currentUser}
            onVoteMatchup={handleVoteMatchup}
            onAddReview={handleAddReview}
            onOpenSubmitMatchup={() => setIsSubmitMatchupOpen(true)}
            onOpenSubmitCritique={() => setIsSubmitMatchupOpen(true)}
          />
        )}

        {activeTab === 'collab' && (
          <CollabHub
            collabs={collabs}
            currentUser={currentUser}
            onApplyCollab={handleApplyCollab}
            onOpenCreateCollab={() => setIsNewCollabOpen(true)}
          />
        )}

        {activeTab === 'ai-lab' && <AiGrowthLab />}

        {activeTab === 'velocity' && (
          <ChannelVelocity
            currentUser={currentUser}
            onUpdateSubs={handleUpdateSubs}
          />
        )}

        {activeTab === 'academy' && <GrowthAcademy playbooks={initialPlaybooks} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/80 py-8 px-4 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center text-white">
              <Youtube className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="font-bold text-zinc-300">YoGrow.com</span>
            <span>— The collaborative platform for YouTube creators.</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span>Built for Creators Scaling to 10K+</span>
            <span>•</span>
            <span>Algorithm Grounded (2026)</span>
          </div>
        </div>
      </footer>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <NewPostModal
        isOpen={isNewPostOpen}
        onClose={() => setIsNewPostOpen(false)}
        currentUser={currentUser}
        onSubmit={handleCreatePost}
      />

      <SubmitMatchupModal
        isOpen={isSubmitMatchupOpen}
        onClose={() => setIsSubmitMatchupOpen(false)}
        currentUser={currentUser}
        onSubmit={handleCreateMatchup}
      />

      <NewCollabModal
        isOpen={isNewCollabOpen}
        onClose={() => setIsNewCollabOpen(false)}
        currentUser={currentUser}
        onSubmit={handleCreateCollab}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
