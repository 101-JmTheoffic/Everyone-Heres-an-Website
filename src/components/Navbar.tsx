import React from 'react';
import { Youtube, Flame, Users, Sparkles, Trophy, BookOpen, MessageSquare, Plus, Bell, Radio } from 'lucide-react';
import { CreatorUser } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: CreatorUser;
  onOpenProfile: () => void;
  onOpenNewPost: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenProfile,
  onOpenNewPost,
}) => {
  const navItems = [
    { id: 'lounge', label: 'Creator Lounge', icon: MessageSquare, badge: 'Live' },
    { id: 'arena', label: 'Thumbnail & Title Arena', icon: Flame, badge: 'A/B Test' },
    { id: 'collab', label: 'Collab Hub', icon: Users, badge: 'Match' },
    { id: 'ai-lab', label: 'AI Growth Lab', icon: Sparkles, badge: 'Gemini' },
    { id: 'velocity', label: 'Channel Velocity', icon: Trophy, badge: 'YPP' },
    { id: 'academy', label: 'Growth Academy', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0f0f12]/95 backdrop-blur-md border-b border-zinc-800/80">
      {/* Top micro ticker */}
      <div className="bg-zinc-950/80 border-b border-zinc-900/60 text-xs text-zinc-400 py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              14,820 Creators Online
            </span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-300">
              <strong className="text-red-400">4,390</strong> Thumbnails Split-Tested
            </span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-300">
              <strong className="text-amber-400">890+</strong> Channels Crossed 1K Subs This Month
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-zinc-400">
            <span className="inline-flex items-center gap-1 text-zinc-400 hover:text-zinc-200 cursor-pointer">
              <Radio className="w-3 h-3 text-red-500" />
              Community Guidelines
            </span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-400">YouTube Partner Program (YPP) 2026 Ready</span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div 
            id="brand-logo"
            onClick={() => setActiveTab('lounge')}
            className="flex items-center gap-2.5 cursor-pointer select-none group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-700 via-red-600 to-rose-500 flex items-center justify-center shadow-lg shadow-red-600/25 group-hover:scale-105 transition-transform duration-200">
              <Youtube className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-white font-['Outfit']">
                  Yo<span className="text-red-500">Grow</span><span className="text-xs font-semibold text-zinc-400">.com</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/40">
                  Creators
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block">YouTube Growth Community</p>
            </div>
          </div>

          {/* Nav links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-zinc-800/90 text-white shadow-sm border border-zinc-700'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-500' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded-full ${
                        item.badge === 'Live'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                          : item.badge === 'Gemini'
                          ? 'bg-violet-950 text-violet-300 border border-violet-800/50'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-red-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right actions: Post button + Creator Profile button */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              id="btn-quick-create-post"
              onClick={onOpenNewPost}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors shadow-md shadow-red-600/30"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create Post</span>
            </button>

            {/* Creator Profile Chip */}
            <button
              id="btn-user-profile-toggle"
              onClick={onOpenProfile}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800/80 border border-zinc-800 transition-colors text-left"
              title="Edit Creator Profile"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-red-500/50"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-zinc-200 leading-tight flex items-center gap-1">
                  <span>{currentUser.channelName}</span>
                </div>
                <div className="text-[10px] text-zinc-400 leading-none">
                  {currentUser.subscribers.toLocaleString()} subs • Streak {currentUser.uploadStreak}w 🔥
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile secondary navigation strip */}
        <div className="lg:hidden flex items-center space-x-1 overflow-x-auto py-2 border-t border-zinc-900 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? 'bg-zinc-800 text-white border border-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-500' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
