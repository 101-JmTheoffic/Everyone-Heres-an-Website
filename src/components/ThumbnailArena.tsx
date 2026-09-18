import React, { useState } from 'react';
import { 
  Flame, 
  Eye, 
  Smartphone, 
  Monitor, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  Plus, 
  TrendingUp, 
  AlertCircle,
  ThumbsUp,
  Award
} from 'lucide-react';
import { ThumbnailMatchup, ThumbnailCritique, CreatorUser } from '../types';

interface ThumbnailArenaProps {
  matchups: ThumbnailMatchup[];
  critiques: ThumbnailCritique[];
  currentUser: CreatorUser;
  onVoteMatchup: (matchupId: string, variant: 'A' | 'B') => void;
  onAddReview: (critiqueId: string, score: number, comment: string) => void;
  onOpenSubmitMatchup: () => void;
  onOpenSubmitCritique: () => void;
}

export const ThumbnailArena: React.FC<ThumbnailArenaProps> = ({
  matchups,
  critiques,
  currentUser,
  onVoteMatchup,
  onAddReview,
  onOpenSubmitMatchup,
  onOpenSubmitCritique,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'ab-test' | 'critique'>('ab-test');
  const [mobileMode, setMobileMode] = useState<Record<string, boolean>>({});
  const [reviewScore, setReviewScore] = useState<Record<string, number>>({});
  const [reviewText, setReviewText] = useState<Record<string, string>>({});

  const handleReviewSubmit = (critiqueId: string, e: React.FormEvent) => {
    e.preventDefault();
    const score = reviewScore[critiqueId] || 8.0;
    const comment = reviewText[critiqueId]?.trim();
    if (!comment) return;
    onAddReview(critiqueId, score, comment);
    setReviewText(prev => ({ ...prev, [critiqueId]: '' }));
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-Tab Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-500" />
            Thumbnail & Title Packaging Arena
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Test Click-Through-Rate (CTR) before uploading. 70% of a video's success is decided in the feed.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-zinc-950 p-1 rounded-xl border border-zinc-800 flex items-center">
            <button
              id="subtab-ab-test"
              onClick={() => setActiveSubTab('ab-test')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'ab-test'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              A/B Clash Arena
            </button>
            <button
              id="subtab-critique"
              onClick={() => setActiveSubTab('critique')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'critique'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Roast & Score Lab
            </button>
          </div>

          {activeSubTab === 'ab-test' ? (
            <button
              id="btn-submit-ab-matchup"
              onClick={onOpenSubmitMatchup}
              className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-red-400" />
              <span>Submit A/B</span>
            </button>
          ) : (
            <button
              id="btn-submit-critique-req"
              onClick={onOpenSubmitCritique}
              className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-red-400" />
              <span>Request Roast</span>
            </button>
          )}
        </div>
      </div>

      {/* A/B Test Matchups */}
      {activeSubTab === 'ab-test' && (
        <div className="space-y-6">
          {matchups.map((matchup) => {
            const hasVoted = !!matchup.userVoted;
            const pctA = Math.round((matchup.variantA.votes / (matchup.totalVotes || 1)) * 100);
            const pctB = 100 - pctA;
            const isWinnerA = matchup.variantA.votes >= matchup.variantB.votes;

            return (
              <div
                key={matchup.id}
                id={`matchup-card-${matchup.id}`}
                className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-5 shadow-lg space-y-4"
              >
                {/* Creator info & question */}
                <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={matchup.creator.avatar}
                      alt={matchup.creator.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-700"
                    />
                    <div>
                      <div className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                        <span>{matchup.creator.channelName}</span>
                        <span className="text-[10px] text-zinc-400">({matchup.creator.subscribers} subs)</span>
                      </div>
                      <span className="text-[11px] text-zinc-400">Asking community: Which packaging gets your click?</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/40">
                      {matchup.niche}
                    </span>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{matchup.totalVotes} votes cast</p>
                  </div>
                </div>

                {/* Video Title */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Video Title</span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                    "{matchup.videoTitle}"
                  </h3>
                </div>

                {/* Side-by-side variants */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Variant A */}
                  <div
                    id={`btn-vote-a-${matchup.id}`}
                    onClick={() => onVoteMatchup(matchup.id, 'A')}
                    className={`relative rounded-xl border p-3.5 transition-all cursor-pointer group select-none ${
                      matchup.userVoted === 'A'
                        ? 'bg-zinc-800/90 border-red-500 shadow-md shadow-red-600/10'
                        : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="text-zinc-300">Option A</span>
                      {hasVoted && (
                        <span className={`text-xs font-extrabold ${isWinnerA ? 'text-emerald-400' : 'text-zinc-400'}`}>
                          {pctA}% Votes ({matchup.variantA.votes})
                        </span>
                      )}
                    </div>

                    <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 mb-2.5">
                      <img
                        src={matchup.variantA.imageUrl}
                        alt="Thumbnail Option A"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/85 text-white font-mono text-[10px] px-1.5 py-0.5 rounded">
                        14:28
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 font-medium">{matchup.variantA.concept}</p>

                    {/* Voting button / indicator */}
                    <div className="mt-3 pt-2 border-t border-zinc-850 flex items-center justify-between">
                      <button
                        className={`w-full py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                          matchup.userVoted === 'A'
                            ? 'bg-red-600 text-white'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                        }`}
                      >
                        {matchup.userVoted === 'A' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Your Vote (Variant A)</span>
                          </>
                        ) : (
                          <>
                            <ThumbsUp className="w-3.5 h-3.5 text-zinc-400" />
                            <span>I'd Click A</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Variant B */}
                  <div
                    id={`btn-vote-b-${matchup.id}`}
                    onClick={() => onVoteMatchup(matchup.id, 'B')}
                    className={`relative rounded-xl border p-3.5 transition-all cursor-pointer group select-none ${
                      matchup.userVoted === 'B'
                        ? 'bg-zinc-800/90 border-red-500 shadow-md shadow-red-600/10'
                        : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="text-zinc-300">Option B</span>
                      {hasVoted && (
                        <span className={`text-xs font-extrabold ${!isWinnerA ? 'text-emerald-400' : 'text-zinc-400'}`}>
                          {pctB}% Votes ({matchup.variantB.votes})
                        </span>
                      )}
                    </div>

                    <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 mb-2.5">
                      <img
                        src={matchup.variantB.imageUrl}
                        alt="Thumbnail Option B"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/85 text-white font-mono text-[10px] px-1.5 py-0.5 rounded">
                        14:28
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 font-medium">{matchup.variantB.concept}</p>

                    {/* Voting button / indicator */}
                    <div className="mt-3 pt-2 border-t border-zinc-850 flex items-center justify-between">
                      <button
                        className={`w-full py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                          matchup.userVoted === 'B'
                            ? 'bg-red-600 text-white'
                            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                        }`}
                      >
                        {matchup.userVoted === 'B' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Your Vote (Variant B)</span>
                          </>
                        ) : (
                          <>
                            <ThumbsUp className="w-3.5 h-3.5 text-zinc-400" />
                            <span>I'd Click B</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Vote split progress bar & Key Insight */}
                {hasVoted && (
                  <div className="mt-3 pt-3 border-t border-zinc-800/80 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400">
                      <span className={pctA >= pctB ? 'text-emerald-400' : 'text-zinc-400'}>
                        Variant A: {pctA}%
                      </span>
                      <span className={pctB > pctA ? 'text-emerald-400' : 'text-zinc-400'}>
                        Variant B: {pctB}%
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-zinc-950 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${pctA}%` }}
                        className="h-full bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-500"
                      />
                      <div
                        style={{ width: `${pctB}%` }}
                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
                      />
                    </div>

                    <div className="bg-zinc-950/80 rounded-xl p-3 border border-zinc-800/60 flex items-start gap-2.5 text-xs text-zinc-300">
                      <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-300">Community Packaging Analysis: </span>
                        {matchup.keyInsight}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Roast & Critique Lab */}
      {activeSubTab === 'critique' && (
        <div className="space-y-6">
          {critiques.map((critique) => {
            const isMobile = !!mobileMode[critique.id];

            return (
              <div
                key={critique.id}
                id={`critique-card-${critique.id}`}
                className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-5 shadow-lg space-y-4"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={critique.creator.avatar}
                      alt={critique.creator.name}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-700"
                    />
                    <div>
                      <div className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                        <span>{critique.creator.channelName}</span>
                        <span className="text-[10px] text-zinc-400">({critique.creator.subscribers} subs)</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-0.5">"{critique.videoTitle}"</h4>
                    </div>
                  </div>

                  {/* Viewport switch: Desktop vs Mobile simulator */}
                  <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
                    <button
                      onClick={() => setMobileMode(prev => ({ ...prev, [critique.id]: false }))}
                      className={`px-2.5 py-1 rounded flex items-center gap-1 font-medium transition-colors ${
                        !isMobile ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Desktop (480px)</span>
                    </button>
                    <button
                      onClick={() => setMobileMode(prev => ({ ...prev, [critique.id]: true }))}
                      className={`px-2.5 py-1 rounded flex items-center gap-1 font-medium transition-colors ${
                        isMobile ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile Scale (140px)</span>
                    </button>
                  </div>
                </div>

                {/* Thumbnail Display & Live Scores */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                  {/* Visual container */}
                  <div className="lg:col-span-2 flex flex-col items-center justify-center bg-zinc-950/80 rounded-xl p-4 border border-zinc-800/80">
                    <div
                      className={`transition-all duration-300 rounded-lg overflow-hidden border border-zinc-700 shadow-2xl ${
                        isMobile ? 'w-48' : 'w-full max-w-lg'
                      }`}
                    >
                      <img
                        src={critique.thumbnailUrl}
                        alt="Submitted Thumbnail"
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-2">
                      {isMobile ? 'Simulating YouTube Mobile Feed (140px width check)' : 'Full HD 1080p Desktop Preview'}
                    </p>
                  </div>

                  {/* Scorecard */}
                  <div className="bg-zinc-950/60 rounded-xl p-4 border border-zinc-800/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-300">Overall Packaging Score</span>
                      <span className="text-base font-extrabold text-amber-400 flex items-center gap-1">
                        <Award className="w-4 h-4 text-amber-400" />
                        {critique.scores.overall}/10
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <div className="flex justify-between text-zinc-400 mb-1">
                          <span>Visual Clarity & Contrast</span>
                          <span className="font-semibold text-zinc-200">{critique.scores.clarity}/10</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${critique.scores.clarity * 10}%` }}
                            className="h-full bg-emerald-500 rounded-full"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-zinc-400 mb-1">
                          <span>Mobile Readability at 140px</span>
                          <span className="font-semibold text-zinc-200">{critique.scores.mobileReadability}/10</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${critique.scores.mobileReadability * 10}%` }}
                            className="h-full bg-amber-500 rounded-full"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-zinc-400 mb-1">
                          <span>Curiosity Gap & Hook</span>
                          <span className="font-semibold text-zinc-200">{critique.scores.curiosity}/10</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${critique.scores.curiosity * 10}%` }}
                            className="h-full bg-rose-500 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creator reviews & add review form */}
                <div className="pt-3 border-t border-zinc-800/80 space-y-3">
                  <h4 className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Creator Roast Feedback ({critique.reviews.length})</span>
                  </h4>

                  <div className="space-y-2">
                    {critique.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="bg-zinc-950/60 rounded-lg p-3 border border-zinc-800/50 flex items-start gap-2.5 text-xs"
                      >
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-zinc-200">{rev.author}</span>
                            <span className="font-bold text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded border border-amber-900/40">
                              ★ {rev.score}/10
                            </span>
                          </div>
                          <p className="text-zinc-300 mt-1">{rev.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add feedback form */}
                  <form
                    onSubmit={(e) => handleReviewSubmit(critique.id, e)}
                    className="flex flex-col sm:flex-row gap-2 bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800"
                  >
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <label className="text-[11px] text-zinc-400 font-medium">Score:</label>
                      <select
                        value={reviewScore[critique.id] || 8}
                        onChange={(e) => setReviewScore(prev => ({ ...prev, [critique.id]: parseFloat(e.target.value) }))}
                        className="bg-zinc-900 border border-zinc-700 text-xs text-amber-300 rounded px-2 py-1 font-bold"
                      >
                        {[10, 9.5, 9, 8.5, 8, 7.5, 7, 6.5, 6, 5, 4].map((s) => (
                          <option key={s} value={s}>{s}/10</option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="text"
                      placeholder="Add specific constructive feedback (e.g., 'text is too small on mobile', 'increase face brightness')..."
                      value={reviewText[critique.id] || ''}
                      onChange={(e) => setReviewText(prev => ({ ...prev, [critique.id]: e.target.value }))}
                      className="flex-1 bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 px-3 py-1.5 rounded-lg focus:outline-none focus:border-red-500 placeholder-zinc-400"
                    />

                    <button
                      type="submit"
                      disabled={!reviewText[critique.id]?.trim()}
                      className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-colors flex-shrink-0"
                    >
                      Post Roast
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
