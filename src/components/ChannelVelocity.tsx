import React, { useState } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Youtube, 
  Flame, 
  DollarSign, 
  Award,
  Sparkles,
  Sliders,
  Calendar
} from 'lucide-react';
import { CreatorUser } from '../types';

interface ChannelVelocityProps {
  currentUser: CreatorUser;
  onUpdateSubs: (newSubs: number) => void;
}

export const ChannelVelocity: React.FC<ChannelVelocityProps> = ({
  currentUser,
  onUpdateSubs,
}) => {
  const [watchHours, setWatchHours] = useState<number>(1850);
  const [videoDuration, setVideoDuration] = useState<number>(10); // in minutes
  const [retentionPct, setRetentionPct] = useState<number>(46); // in percentage
  const [daysActive, setDaysActive] = useState<Record<string, boolean>>({
    Mon: true,
    Tue: true,
    Wed: false,
    Thu: true,
    Fri: true,
    Sat: false,
    Sun: false,
  });

  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    check1: true,
    check2: true,
    check3: false,
    check4: true,
    check5: false,
    check6: true,
  });

  // Calculations
  const subs = currentUser.subscribers;
  const pctTo500 = Math.min(100, Math.round((subs / 500) * 100));
  const pctTo1K = Math.min(100, Math.round((subs / 1000) * 100));
  const pctHoursTo4K = Math.min(100, Math.round((watchHours / 4000) * 100));
  const avgViewDurationSecs = Math.round((videoDuration * 60 * retentionPct) / 100);
  const avgViewDurationMins = (avgViewDurationSecs / 60).toFixed(1);

  // Retention algorithm assessment
  const getRetentionRating = (pct: number) => {
    if (pct >= 55) return { grade: 'A+ (Outlier Velocity)', color: 'text-emerald-400', desc: 'Browse algorithm heavily pushes videos with >50% retention for 10m+ content.' };
    if (pct >= 42) return { grade: 'B+ (Healthy Browse Push)', color: 'text-amber-400', desc: 'Good baseline. Will steadily circulate in suggested videos and niche searches.' };
    return { grade: 'C (High Drop-off Warning)', color: 'text-rose-400', desc: 'Videos under 40% retention experience steep impression throttling after 48 hours.' };
  };

  const retentionInsight = getRetentionRating(retentionPct);

  const toggleChecklist = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleDay = (day: string) => {
    setDaysActive(prev => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Channel Velocity & Monetization Milestone Tracker
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time readiness for YouTube Partner Program (YPP), retention analytics simulation, and upload consistency.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs flex-shrink-0">
          <div>
            <span className="text-[10px] text-zinc-400">Current Subscribers:</span>
            <div className="text-sm font-extrabold text-white">{subs.toLocaleString()}</div>
          </div>
          <button
            onClick={() => {
              const input = prompt('Enter your current subscriber count:', subs.toString());
              if (input && !isNaN(parseInt(input))) {
                onUpdateSubs(parseInt(input));
              }
            }}
            className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold"
          >
            Update
          </button>
        </div>
      </div>

      {/* YPP Milestone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tier 1: 500 Subs */}
        <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900/40">
              YPP Level 1 (500 Subs)
            </span>
            <DollarSign className="w-4 h-4 text-zinc-400" />
          </div>

          <div>
            <div className="text-xl font-black text-white">{subs >= 500 ? 'UNLOCKED' : `${subs} / 500`}</div>
            <p className="text-[11px] text-zinc-400 mt-0.5">Fan Funding, Super Thanks, & Community Tab</p>
          </div>

          <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
            <div
              style={{ width: `${pctTo500}%` }}
              className={`h-full ${subs >= 500 ? 'bg-emerald-500' : 'bg-red-500'}`}
            />
          </div>
          <div className="text-[10px] text-right text-zinc-400 font-mono">{pctTo500}% completed</div>
        </div>

        {/* Tier 2: 1,000 Subs + 4k Hours */}
        <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/40">
              YPP Level 2 (1,000 Subs)
            </span>
            <Youtube className="w-4 h-4 text-red-500" />
          </div>

          <div>
            <div className="text-xl font-black text-white">{subs >= 1000 ? 'QUALIFIED' : `${subs} / 1,000`}</div>
            <p className="text-[11px] text-zinc-400 mt-0.5">AdSense Video Revenue Share Enabled</p>
          </div>

          <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
            <div
              style={{ width: `${pctTo1K}%` }}
              className={`h-full ${subs >= 1000 ? 'bg-emerald-500' : 'bg-red-500'}`}
            />
          </div>
          <div className="text-[10px] text-right text-zinc-400 font-mono">{pctTo1K}% completed</div>
        </div>

        {/* Watch Hours */}
        <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-900/40">
              4,000 Watch Hours
            </span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>

          <div>
            <div className="text-xl font-black text-white">{watchHours.toLocaleString()} / 4,000</div>
            <p className="text-[11px] text-zinc-400 mt-0.5">Last 365 Days Public Long-form Watch Time</p>
          </div>

          <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
            <div
              style={{ width: `${pctHoursTo4K}%` }}
              className={`h-full ${watchHours >= 4000 ? 'bg-emerald-500' : 'bg-blue-500'}`}
            />
          </div>
          <div className="text-[10px] text-right text-zinc-400 font-mono">{pctHoursTo4K}% completed</div>
        </div>

        {/* Tier 3: 100K Silver Play Button */}
        <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded">
              100K Silver Award
            </span>
            <Award className="w-4 h-4 text-zinc-300" />
          </div>

          <div>
            <div className="text-xl font-black text-white">{((subs / 100000) * 100).toFixed(1)}%</div>
            <p className="text-[11px] text-zinc-400 mt-0.5">Silver Creator Award & Dedicated Partner Manager</p>
          </div>

          <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
            <div
              style={{ width: `${Math.min(100, (subs / 100000) * 100)}%` }}
              className="h-full bg-zinc-400"
            />
          </div>
          <div className="text-[10px] text-right text-zinc-400 font-mono">{(100000 - subs).toLocaleString()} subs left</div>
        </div>
      </div>

      {/* Retention Curve Simulator */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-red-500" />
              Interactive Retention & Average View Duration (AVD) Simulator
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Simulate how video length and retention percentage trigger YouTube browse vs suggested recommendations.
            </p>
          </div>

          <div className="bg-zinc-950 px-3.5 py-1.5 rounded-xl border border-zinc-800 text-xs">
            <span className="text-zinc-400">Predicted AVD: </span>
            <strong className="text-white">{avgViewDurationMins} minutes</strong>
            <span className="text-zinc-400"> ({avgViewDurationSecs}s)</span>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-zinc-300">Video Total Length: {videoDuration} minutes</span>
              <span className="text-zinc-400 font-mono">({videoDuration * 60} seconds)</span>
            </div>
            <input
              type="range"
              min="3"
              max="45"
              value={videoDuration}
              onChange={(e) => setVideoDuration(parseInt(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>3 mins (Quick tip)</span>
              <span>12 mins (Optimal mid-rolls)</span>
              <span>45 mins (Deep documentary)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-zinc-300">Average Percentage Viewed: {retentionPct}%</span>
              <span className={`font-bold ${retentionInsight.color}`}>{retentionInsight.grade}</span>
            </div>
            <input
              type="range"
              min="20"
              max="85"
              value={retentionPct}
              onChange={(e) => setRetentionPct(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>20% (Low)</span>
              <span>45% (Average)</span>
              <span>70%+ (Viral tier)</span>
            </div>
          </div>
        </div>

        {/* Visual Simulated Retention Curve SVG */}
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Simulated Retention Curve Graph</span>
            <span className="text-emerald-400 font-medium">0:00 to {videoDuration}:00</span>
          </div>

          <div className="h-32 w-full relative">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 100">
              {/* Grid lines */}
              <line x1="0" y1="20" x2="500" y2="20" stroke="#27272a" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="500" y2="50" stroke="#27272a" strokeDasharray="3 3" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#27272a" strokeDasharray="3 3" />

              {/* Dynamic Retention curve */}
              {/* Starts at 100% (y=5), drops at second 30 (x=50, y=35), plateaus, drops at end */}
              <path
                d={`M 0 5 Q 50 ${100 - retentionPct * 1.1} 150 ${100 - retentionPct * 0.9} T 450 ${100 - retentionPct * 0.75} L 500 95`}
                fill="none"
                stroke={retentionPct >= 50 ? '#10b981' : '#f59e0b'}
                strokeWidth="3"
              />
              <path
                d={`M 0 5 Q 50 ${100 - retentionPct * 1.1} 150 ${100 - retentionPct * 0.9} T 450 ${100 - retentionPct * 0.75} L 500 95 L 500 100 L 0 100 Z`}
                fill={retentionPct >= 50 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(245, 158, 11, 0.08)'}
              />
            </svg>

            {/* Marker annotations */}
            <div className="absolute top-1 left-2 text-[10px] text-zinc-400 font-mono">100% (Intro)</div>
            <div className="absolute bottom-2 left-10 text-[10px] text-red-400 font-mono">0:30 Cliff Zone</div>
            <div className="absolute bottom-2 right-2 text-[10px] text-zinc-400 font-mono">End Screen</div>
          </div>

          <div className="bg-zinc-900/90 p-3 rounded-lg border border-zinc-800 text-xs text-zinc-300">
            <strong className="text-amber-400">Algorithmic Diagnosis: </strong>
            {retentionInsight.desc}
          </div>
        </div>
      </div>

      {/* Upload Habit & Pre-Flight Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly upload consistency */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-red-500" />
              Upload Consistency Tracker
            </h3>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900/40">
              6-Week Streak 🔥
            </span>
          </div>

          <p className="text-xs text-zinc-400">
            The algorithm tracks channel velocity. Regular cadences condition your core audience to expect content on specific days.
          </p>

          <div className="grid grid-cols-7 gap-2">
            {Object.keys(daysActive).map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`py-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                  daysActive[day]
                    ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/20'
                    : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                <span className="text-xs">{day}</span>
                <span className="text-[10px]">{daysActive[day] ? '✓' : '—'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pre-Publish Quality Checklist */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Pre-Flight Video Checklist
            </h3>
            <span className="text-xs text-zinc-400">Before hitting "Publish"</span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { id: 'check1', label: 'Thumbnail tested at 10% zoom (Mobile feed readability check)' },
              { id: 'check2', label: 'Title is under 55 characters to avoid mobile "..." truncation' },
              { id: 'check3', label: 'Removed all "Hey guys welcome back" intros in seconds 0-5' },
              { id: 'check4', label: 'Audio normalized to -14 LUFS (no whispering or deafening clips)' },
              { id: 'check5', label: 'Added End-Screen Card linking directly to your next best video' },
              { id: 'check6', label: 'Pinned comment asking an open-ended debate question to trigger comments' }
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-zinc-950 hover:bg-zinc-850 cursor-pointer transition-colors border border-zinc-850"
              >
                {checklist[item.id] ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                )}
                <span className={checklist[item.id] ? 'text-zinc-300 line-through' : 'text-zinc-200'}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
