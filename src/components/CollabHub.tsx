import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  MessageSquare, 
  Filter, 
  Plus, 
  CheckCircle2, 
  Send, 
  ExternalLink,
  Gamepad2,
  Mic,
  Video,
  Flame,
  Mail,
  MessageCircle
} from 'lucide-react';
import { CollabListing, CreatorUser } from '../types';

interface CollabHubProps {
  collabs: CollabListing[];
  currentUser: CreatorUser;
  onApplyCollab: (collabId: string, pitch: string) => void;
  onOpenCreateCollab: () => void;
}

export const CollabHub: React.FC<CollabHubProps> = ({
  collabs,
  currentUser,
  onApplyCollab,
  onOpenCreateCollab,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [selectedSubTier, setSelectedSubTier] = useState<string>('all');
  const [activeModalCollab, setActiveModalCollab] = useState<CollabListing | null>(null);
  const [pitchText, setPitchText] = useState<string>('');
  const [pitchSuccess, setPitchSuccess] = useState<boolean>(false);

  const formats = ['All Formats', 'Podcast', 'Challenge Video', 'Shorts Swap', 'Gaming Co-op', 'Guest Feature', 'Discussion'];
  const niches = ['All Niches', 'Tech', 'Gaming', 'Education', 'Vlog & Lifestyle', 'Finance'];
  const subTiers = ['All Tiers', '0 - 1K', '1K - 10K', '10K - 50K', '50K+'];

  const filteredCollabs = collabs.filter((c) => {
    if (selectedFormat !== 'all' && selectedFormat !== 'All Formats' && c.format !== selectedFormat) return false;
    if (selectedNiche !== 'all' && selectedNiche !== 'All Niches' && c.creator.niche !== selectedNiche) return false;
    if (selectedSubTier !== 'all' && selectedSubTier !== 'All Tiers' && c.subRange !== selectedSubTier) return false;
    return true;
  });

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalCollab || !pitchText.trim()) return;
    onApplyCollab(activeModalCollab.id, pitchText);
    setPitchSuccess(true);
    setTimeout(() => {
      setPitchSuccess(false);
      setActiveModalCollab(null);
      setPitchText('');
    }, 1800);
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'Podcast': return <Mic className="w-3.5 h-3.5 text-purple-400" />;
      case 'Gaming Co-op': return <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Shorts Swap': return <Flame className="w-3.5 h-3.5 text-rose-400" />;
      default: return <Video className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/90 p-5 rounded-2xl border border-zinc-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-red-500" />
            Creator Matchmaking & Collaboration Hub
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Cross-pollinate audiences. Collaborating with creators in your sub tier is the fastest organic growth hack.
          </p>
        </div>

        <button
          id="btn-open-create-collab"
          onClick={onOpenCreateCollab}
          className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-md shadow-red-600/25 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post a Collab Request</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-2.5 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80 text-xs">
        {/* Format */}
        <select
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value)}
          aria-label="Filter by Collaboration Format"
          className="bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-red-500 cursor-pointer"
        >
          {formats.map((f) => (
            <option key={f} value={f === 'All Formats' ? 'all' : f}>{f}</option>
          ))}
        </select>

        {/* Niche */}
        <select
          value={selectedNiche}
          onChange={(e) => setSelectedNiche(e.target.value)}
          aria-label="Filter by Creator Niche"
          className="bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-red-500 cursor-pointer"
        >
          {niches.map((n) => (
            <option key={n} value={n === 'All Niches' ? 'all' : n}>{n}</option>
          ))}
        </select>

        {/* Sub Tier */}
        <select
          value={selectedSubTier}
          onChange={(e) => setSelectedSubTier(e.target.value)}
          aria-label="Filter by Subscriber Range"
          className="bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-red-500 cursor-pointer"
        >
          {subTiers.map((t) => (
            <option key={t} value={t === 'All Tiers' ? 'all' : t}>Sub Tier: {t}</option>
          ))}
        </select>

        {(selectedFormat !== 'all' || selectedNiche !== 'all' || selectedSubTier !== 'all') && (
          <button
            onClick={() => { setSelectedFormat('all'); setSelectedNiche('all'); setSelectedSubTier('all'); }}
            className="text-zinc-400 hover:text-zinc-200 underline ml-2"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCollabs.map((collab) => (
          <div
            key={collab.id}
            id={`collab-card-${collab.id}`}
            className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-5 shadow-md flex flex-col justify-between hover:border-zinc-700 transition-all space-y-4"
          >
            <div>
              {/* Creator header */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src={collab.creator.avatar}
                    alt={collab.creator.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-zinc-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-zinc-100">{collab.creator.channelName}</h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                      <span>{collab.creator.subscribers.toLocaleString()} subs</span>
                      <span>•</span>
                      <span className="text-zinc-300">{collab.creator.niche}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-zinc-950 text-zinc-300 text-[11px] font-semibold border border-zinc-800">
                  {getFormatIcon(collab.format)}
                  <span>{collab.format}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                {collab.title}
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3 mb-3">
                {collab.description}
              </p>

              {/* Requirements box */}
              <div className="bg-zinc-950/70 p-2.5 rounded-xl border border-zinc-800/60 text-xs space-y-1">
                <div className="text-[10px] uppercase font-bold text-zinc-400">Ideal Creator Partner:</div>
                <div className="text-zinc-300">{collab.idealPartner}</div>
                <div className="text-[10px] text-red-400 font-semibold pt-1">
                  Target Channel Size: {collab.subRange} subscribers
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
              <div className="text-[11px] text-zinc-400">
                Via <strong className="text-zinc-200">{collab.contactPlatform}</strong> ({collab.contactHandle})
              </div>

              <button
                id={`btn-pitch-collab-${collab.id}`}
                onClick={() => {
                  setActiveModalCollab(collab);
                  setPitchText(`Hey ${collab.creator.channelName}! I run ${currentUser.channelName} (${currentUser.subscribers} subs in ${currentUser.niche}). Love the "${collab.title}" concept. Let's team up!`);
                }}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors shadow-sm shadow-red-600/20 flex items-center gap-1.5"
              >
                <Send className="w-3 h-3" />
                <span>Propose Collab</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Propose Collab Modal */}
      {activeModalCollab && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2.5">
                <img
                  src={activeModalCollab.creator.avatar}
                  alt={activeModalCollab.creator.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-bold text-white">Send Pitch to {activeModalCollab.creator.channelName}</h3>
                  <p className="text-[11px] text-zinc-400">{activeModalCollab.title}</p>
                </div>
              </div>

              <button
                onClick={() => setActiveModalCollab(null)}
                className="text-zinc-400 hover:text-zinc-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {pitchSuccess ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-white">Pitch Sent Successfully!</h4>
                <p className="text-xs text-zinc-300">
                  {activeModalCollab.creator.channelName} has been notified via their {activeModalCollab.contactPlatform} handle!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendProposal} className="space-y-4">
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs space-y-1">
                  <div className="text-zinc-400">Sending as:</div>
                  <div className="font-bold text-zinc-200">
                    {currentUser.channelName} ({currentUser.subscribers.toLocaleString()} subs • {currentUser.niche})
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">
                    Your Pitch & Collaboration Idea
                  </label>
                  <textarea
                    rows={4}
                    value={pitchText}
                    onChange={(e) => setPitchText(e.target.value)}
                    placeholder="Describe how your audiences align, what value you bring to the video, and when you can record..."
                    className="w-full bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 p-3 rounded-xl focus:outline-none focus:border-red-500 placeholder-zinc-400"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalCollab(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-colors shadow-md shadow-red-600/20 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Collaboration Offer</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
