import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  Lightbulb, 
  Copy, 
  Check, 
  ArrowRight, 
  AlertTriangle, 
  TrendingUp,
  Zap,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { GeneratedTitle, HookAnalysis, OutlierIdea } from '../types';

export const AiGrowthLab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'titles' | 'hook' | 'ideas'>('titles');
  
  // Title generator state
  const [titleTopic, setTitleTopic] = useState<string>('How to grow on YouTube with zero views');
  const [titleNiche, setTitleNiche] = useState<string>('Tech & Productivity');
  const [titleTone, setTitleTone] = useState<string>('Curiosity Gap');
  const [isGeneratingTitles, setIsGeneratingTitles] = useState<boolean>(false);
  const [generatedTitles, setGeneratedTitles] = useState<GeneratedTitle[]>([
    {
      title: "I Tested 100 Small Channels (Here's What Blew Up)",
      predictedCtr: 9.4,
      characterCount: 47,
      hookType: "Curiosity Gap & Social Proof",
      whyItWorks: "Pairs massive testing volume (100) with concrete data for creators looking for shortcuts."
    },
    {
      title: "Stop Making This 1 Mistake in 2026",
      predictedCtr: 8.9,
      characterCount: 34,
      hookType: "Loss Aversion & Urgency",
      whyItWorks: "Creators fear they are wasting effort on the wrong strategy, triggering immediate clicks."
    },
    {
      title: "How 1 Tiny Tweak Doubled My Impressions Overnight",
      predictedCtr: 8.7,
      characterCount: 49,
      hookType: "High Leverage Asymmetry",
      whyItWorks: "Offers outsized return for minimal friction, highly desirable for busy creators."
    },
    {
      title: "The Brutal Truth About YouTube in 2026",
      predictedCtr: 8.4,
      characterCount: 39,
      hookType: "Contrarian Reality Check",
      whyItWorks: "Positions your channel as raw, authentic, and counter-guru."
    },
    {
      title: "From 0 to 1,000 Subscribers: The Only 3 Rules",
      predictedCtr: 9.1,
      characterCount: 45,
      hookType: "Definitive Roadmap",
      whyItWorks: "Simplifies an overwhelming mountain into 3 digestible rules that viewers want to save."
    }
  ]);
  const [copiedTitleIndex, setCopiedTitleIndex] = useState<number | null>(null);

  // Hook doctor state
  const [hookScript, setHookScript] = useState<string>(
    "Hey guys! Welcome back to my channel. In today's video, I'm going to be reviewing the top 3 productivity apps I've been using this month. Before we begin, don't forget to like and subscribe so you don't miss out on future videos. Let's get right into it."
  );
  const [isAnalyzingHook, setIsAnalyzingHook] = useState<boolean>(false);
  const [hookAnalysis, setHookAnalysis] = useState<HookAnalysis | null>({
    retentionScore: 61,
    hookVelocity: 'Sluggish (High Drop-off Risk)',
    verdict: 'Loses 40% of viewers by second 15. The first 12 seconds contain zero stakes or answers to why the viewer clicked.',
    flaws: [
      'Started with "Hey guys, welcome back"—a guaranteed 10% instant exit trigger.',
      'Begged for likes and subscribes before providing any value.',
      'Did not mention the most exciting app or the big problem it solves.'
    ],
    strengths: [
      'Clear topic scope (top 3 productivity apps).'
    ],
    rewrites: [
      {
        style: 'In Medias Res (Visual Pattern Interrupt)',
        script: 'This $0 app replaced my entire $40 Notion setup in 48 hours—and 90% of people are using it completely backwards. Look at this.',
        visualCues: 'Screen recording of calendar transforming with a quick snap sound effect, zero introductory filler.'
      },
      {
        style: 'High-Stakes Curiosity Loop',
        script: 'I wasted 6 months testing 40 different productivity apps so you do not have to. Two of them were pure snake oil, but the third completely changed how I work.',
        visualCues: 'Red "DELETE" badge stamping onto app logos, followed by a glowing highlight around app #3.'
      }
    ],
    proTip: 'Never beg for subscriptions in the first 2 minutes. The viewer does not know you yet; earn their trust first!'
  });

  // Outlier ideas state
  const [ideaNiche, setIdeaNiche] = useState<string>('Tech');
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState<boolean>(false);
  const [ideas, setIdeas] = useState<OutlierIdea[]>([
    {
      title: 'I Did What Top 1% Channels Do for 30 Days',
      angle: 'Extreme Self-Experimentation',
      thumbnailConcept: 'Split screen: Day 1 exhausted vs Day 30 glowing graph with subscriber surge.',
      retentionHook: 'Starts with the day 30 result, then rewinds to the chaotic day 1 breakdown.',
      targetAudience: 'Aspiring creators looking for inspiration and concrete workflows.',
      difficulty: 'Intermediate'
    },
    {
      title: 'The Secret Metric YouTube Won\'t Tell You About',
      angle: 'Insider Algorithm Breakdown',
      thumbnailConcept: 'YouTube Studio dashboard with a glowing red highlight circle on a hidden metric.',
      retentionHook: 'Shows a direct quote from a YouTube product manager.',
      targetAudience: 'Intermediate creators stuck at the 500-5,000 subscriber plateau.',
      difficulty: 'Beginner'
    },
    {
      title: 'Fixing A Small Creator\'s Channel Live (Brutal Audit)',
      angle: 'Real-world Transformation Case Study',
      thumbnailConcept: 'Face of guest creator looking shocked, big red before-and-after sticker.',
      retentionHook: 'Reveals the 1 mistake that lost 50,000 views within the first 8 seconds.',
      targetAudience: 'Any creator who feels their content is great but not getting pushed.',
      difficulty: 'Advanced'
    },
    {
      title: 'Building A $10,000/mo Channel from Zero (Step-by-Step)',
      angle: 'High-Value Financial Blueprint',
      thumbnailConcept: 'Clean studio background, holding a silver play button mockup with breakdown sheet.',
      retentionHook: 'Lays out the complete spreadsheet within the first 20 seconds.',
      targetAudience: 'Monetization-focused creators and business builders.',
      difficulty: 'Intermediate'
    }
  ]);

  const handleGenerateTitles = async () => {
    setIsGeneratingTitles(true);
    try {
      const res = await fetch('/api/ai-creator-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate-titles',
          topic: titleTopic,
          niche: titleNiche,
          tone: titleTone
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.titles && Array.isArray(data.titles)) {
          setGeneratedTitles(data.titles);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingTitles(false);
    }
  };

  const handleAnalyzeHook = async () => {
    setIsAnalyzingHook(true);
    try {
      const res = await fetch('/api/ai-creator-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze-hook',
          script: hookScript,
          niche: titleNiche
        })
      });
      if (res.ok) {
        const data = await res.json();
        setHookAnalysis(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzingHook(false);
    }
  };

  const handleGenerateIdeas = async () => {
    setIsGeneratingIdeas(true);
    try {
      const res = await fetch('/api/ai-creator-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'brainstorm-ideas',
          niche: ideaNiche
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.ideas && Array.isArray(data.ideas)) {
          setIdeas(data.ideas);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingIdeas(false);
    }
  };

  const copyTitle = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedTitleIndex(index);
    setTimeout(() => setCopiedTitleIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-5 rounded-2xl border border-zinc-800 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-red-600/20 text-red-500">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-lg font-bold text-white">AI Creator Growth Lab</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800/60">
                Gemini 3.8 Flash Powered
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Data-backed title scoring, first-30-second retention diagnostics, and outlier video concept generation.
            </p>
          </div>

          {/* Tool switch tabs */}
          <div className="bg-zinc-950 p-1 rounded-xl border border-zinc-800 flex items-center self-start sm:self-auto">
            <button
              id="tool-tab-titles"
              onClick={() => setActiveTool('titles')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTool === 'titles'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              High-CTR Titles
            </button>
            <button
              id="tool-tab-hook"
              onClick={() => setActiveTool('hook')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTool === 'hook'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              First 30s Hook Doctor
            </button>
            <button
              id="tool-tab-ideas"
              onClick={() => setActiveTool('ideas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTool === 'ideas'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Viral Ideas Spark
            </button>
          </div>
        </div>
      </div>

      {/* TOOL 1: Title Generator */}
      {activeTool === 'titles' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-red-500" />
              Configure Video Angle
            </h3>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Video Topic / Working Title
              </label>
              <input
                type="text"
                id="input-title-topic"
                value={titleTopic}
                onChange={(e) => setTitleTopic(e.target.value)}
                placeholder="e.g. How I gained 1,000 subscribers"
                className="w-full bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 p-2.5 rounded-xl focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Channel Niche
              </label>
              <select
                id="select-title-niche"
                value={titleNiche}
                onChange={(e) => setTitleNiche(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 p-2.5 rounded-xl focus:outline-none focus:border-red-500"
              >
                <option value="Tech & Productivity">Tech & Productivity</option>
                <option value="Gaming">Gaming & Esports</option>
                <option value="Education & Science">Education & Science</option>
                <option value="Finance & Business">Finance & Business</option>
                <option value="Vlog & Lifestyle">Vlog & Lifestyle</option>
                <option value="YouTube Growth">YouTube Growth & Creators</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                Psychological Angle / Tone
              </label>
              <select
                id="select-title-tone"
                value={titleTone}
                onChange={(e) => setTitleTone(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 p-2.5 rounded-xl focus:outline-none focus:border-red-500"
              >
                <option value="Curiosity Gap">Curiosity Gap (Unresolved Question)</option>
                <option value="High Stakes / Extreme">High Stakes (Extreme Challenge / Result)</option>
                <option value="Contrarian Truth">Contrarian Truth (Calling out BS)</option>
                <option value="Loss Aversion">Loss Aversion (Mistake / Warning)</option>
                <option value="Simple Blueprint">Simple Blueprint (Definitive 3 Rules)</option>
              </select>
            </div>

            <button
              id="btn-generate-titles"
              onClick={handleGenerateTitles}
              disabled={isGeneratingTitles || !titleTopic.trim()}
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-red-600/25"
            >
              {isGeneratingTitles ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Optimizing with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate High-CTR Titles</span>
                </>
              )}
            </button>

            <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
              <div className="font-bold text-zinc-300">YouTube Packaging Truth:</div>
              <div>Titles under 50 characters experience 18% higher click completion on mobile devices because long titles are truncated with "..."</div>
            </div>
          </div>

          {/* Generated Results */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="font-bold text-zinc-200">Predicted High-CTR Variations ({generatedTitles.length})</span>
              <span>Click to copy title</span>
            </div>

            <div className="space-y-3">
              {generatedTitles.map((t, idx) => {
                const isOverLimit = t.characterCount > 55;
                return (
                  <div
                    key={idx}
                    id={`title-card-${idx}`}
                    className="bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800/90 rounded-xl p-4 transition-all space-y-2 group relative"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                            CTR ~ {t.predictedCtr}%
                          </span>
                          <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded ${
                            isOverLimit ? 'bg-amber-950 text-amber-400' : 'bg-zinc-950 text-zinc-400'
                          }`}>
                            {t.characterCount} chars {isOverLimit ? '(Mobile truncates!)' : '(Clean mobile)'}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-medium">
                            • {t.hookType}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white leading-snug">
                          {t.title}
                        </h4>
                      </div>

                      <button
                        onClick={() => copyTitle(t.title, idx)}
                        className="p-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors flex-shrink-0"
                        title="Copy title"
                      >
                        {copiedTitleIndex === idx ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-zinc-400 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-850">
                      <strong className="text-zinc-300">Psychology: </strong>
                      {t.whyItWorks}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: Hook Doctor */}
      {activeTool === 'hook' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Script Input */}
          <div className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-zinc-200">First 30 Seconds Script</label>
                <button
                  onClick={() => setHookScript("Hey guys! Welcome back to my channel. In today's video, I'm going to be reviewing the top 3 productivity apps I've been using this month. Before we begin, don't forget to like and subscribe so you don't miss out on future videos. Let's get right into it.")}
                  className="text-[10px] text-red-400 hover:underline"
                >
                  Load Sample Script
                </button>
              </div>
              <textarea
                rows={7}
                id="textarea-hook-script"
                value={hookScript}
                onChange={(e) => setHookScript(e.target.value)}
                placeholder="Paste the exact spoken words of your video's first 30 seconds..."
                className="w-full bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 p-3 rounded-xl focus:outline-none focus:border-red-500 placeholder-zinc-400"
              />
            </div>

            <button
              id="btn-analyze-hook"
              onClick={handleAnalyzeHook}
              disabled={isAnalyzingHook || !hookScript.trim()}
              className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-red-600/25"
            >
              {isAnalyzingHook ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Auditing Retention Curve...</span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4" />
                  <span>Audit First 30s Retention</span>
                </>
              )}
            </button>

            <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800 text-xs text-zinc-400 space-y-1">
              <span className="font-bold text-zinc-300">Why the 30-Second Cliff Matters:</span>
              <p>YouTube measures viewer satisfaction in the first 30 seconds. If more than 35% of people drop off, the algorithm pauses browse feature impressions.</p>
            </div>
          </div>

          {/* Hook Analysis Results */}
          <div className="lg:col-span-2 space-y-4">
            {hookAnalysis && (
              <>
                {/* Score Banner */}
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] uppercase font-bold text-zinc-400">Retention Health Grade</div>
                    <h3 className="text-base font-bold text-white mt-0.5">{hookAnalysis.verdict}</h3>
                    <div className="text-xs text-zinc-400 mt-1">Velocity: <strong className="text-zinc-200">{hookAnalysis.hookVelocity}</strong></div>
                  </div>

                  <div className="flex items-center gap-3 bg-zinc-950 px-4 py-2.5 rounded-xl border border-zinc-800 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-[10px] text-zinc-400">Retention Score</div>
                      <div className="text-2xl font-extrabold text-amber-400">{hookAnalysis.retentionScore}<span className="text-xs text-zinc-400 font-normal">/100</span></div>
                    </div>
                  </div>
                </div>

                {/* Flaws & Strengths */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Drop-off Risks & Flaws
                    </h4>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {hookAnalysis.flaws.map((f, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      Hook Strengths
                    </h4>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {hookAnalysis.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Rewrites */}
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    High-Retention Hook Rewrites (With Camera Directions)
                  </h4>

                  <div className="space-y-3">
                    {hookAnalysis.rewrites.map((rw, i) => (
                      <div key={i} className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-850 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-amber-300">{rw.style}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(rw.script);
                              alert('Copied hook script to clipboard!');
                            }}
                            className="text-[11px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </button>
                        </div>
                        <p className="text-xs font-medium text-white italic">"{rw.script}"</p>
                        <div className="text-[11px] text-zinc-400 bg-zinc-900/90 p-2 rounded border border-zinc-800 flex items-start gap-1.5">
                          <span className="font-bold text-zinc-300 flex-shrink-0">Visual Cues:</span>
                          <span>{rw.visualCues}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {hookAnalysis.proTip && (
                    <div className="text-xs text-zinc-300 bg-red-950/40 p-3 rounded-xl border border-red-900/40">
                      <strong className="text-red-400">Pro Tip: </strong>
                      {hookAnalysis.proTip}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* TOOL 3: Viral Ideas Spark */}
      {activeTool === 'ideas' && (
        <div className="space-y-4">
          <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label className="text-xs font-bold text-zinc-300 whitespace-nowrap">Niche:</label>
              <select
                value={ideaNiche}
                onChange={(e) => setIdeaNiche(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 p-2 rounded-xl focus:outline-none focus:border-red-500"
              >
                <option value="Tech">Tech & Gear</option>
                <option value="Gaming">Gaming & Minecraft</option>
                <option value="Education">Education & Explainers</option>
                <option value="Finance">Personal Finance & Investing</option>
                <option value="Lifestyle">Fitness & Daily Vlogs</option>
              </select>
            </div>

            <button
              onClick={handleGenerateIdeas}
              disabled={isGeneratingIdeas}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 w-full sm:w-auto justify-center"
            >
              {isGeneratingIdeas ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Brainstorming Outliers...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Spark 4 Outlier Concepts</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ideas.map((idea, i) => (
              <div
                key={i}
                className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900/40">
                      {idea.angle}
                    </span>
                    <span className="text-zinc-400">Level: {idea.difficulty}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                    "{idea.title}"
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800/80">
                      <span className="font-bold text-zinc-300 block text-[10px] uppercase">Thumbnail Concept:</span>
                      <p className="text-zinc-400 mt-0.5">{idea.thumbnailConcept}</p>
                    </div>

                    <div className="bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800/80">
                      <span className="font-bold text-zinc-300 block text-[10px] uppercase">Retention Anchor:</span>
                      <p className="text-zinc-400 mt-0.5">{idea.retentionHook}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center justify-between">
                  <span>Target: {idea.targetAudience}</span>
                  <button
                    onClick={() => {
                      setTitleTopic(idea.title);
                      setActiveTool('titles');
                    }}
                    className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                  >
                    <span>Make Titles</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
