import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Eye, 
  TrendingUp, 
  ShieldCheck,
  ChevronRight,
  X
} from 'lucide-react';
import { GrowthPlaybook } from '../types';

interface GrowthAcademyProps {
  playbooks: GrowthPlaybook[];
}

export const GrowthAcademy: React.FC<GrowthAcademyProps> = ({ playbooks }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePlaybook, setActivePlaybook] = useState<GrowthPlaybook | null>(null);

  const categories = ['All', 'CTR & Packaging', 'Retention & Hook', 'Shorts to Long-form', 'Algorithm Secrets'];

  const filteredPlaybooks = playbooks.filter(
    (pb) => selectedCategory === 'All' || pb.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-zinc-900/90 border border-zinc-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-red-500" />
            Creator Growth Academy & Algorithm Playbooks
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Battle-tested frameworks reverse-engineered from top 1% channels. No fluffy theory—pure actionable tactics.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white shadow'
                  : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Playbooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredPlaybooks.map((pb) => (
          <div
            key={pb.id}
            id={`playbook-card-${pb.id}`}
            onClick={() => setActivePlaybook(pb)}
            className="bg-zinc-900/80 border border-zinc-800/90 rounded-2xl p-5 hover:border-zinc-700 cursor-pointer transition-all flex flex-col justify-between group shadow-sm hover:shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/40">
                  {pb.category}
                </span>
                <span className="text-zinc-400 flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" />
                  {pb.readTime}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors leading-snug">
                {pb.title}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                {pb.subtitle}
              </p>

              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Core Takeaways:</span>
                {pb.keyTakeaways.slice(0, 2).map((takeaway, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 mt-4 flex items-center justify-between text-xs font-bold text-red-400 group-hover:text-red-300">
              <span>Read Masterclass</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Playbook Reading Modal */}
      {activePlaybook && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-900/40">
                    {activePlaybook.category}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">• {activePlaybook.readTime}</span>
                  <span className="text-xs text-zinc-400 font-mono">• Difficulty: {activePlaybook.difficulty}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">{activePlaybook.title}</h2>
                <p className="text-xs text-zinc-400 mt-1">{activePlaybook.subtitle}</p>
              </div>

              <button
                onClick={() => setActivePlaybook(null)}
                className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Summary Box */}
            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs text-zinc-300 leading-relaxed">
              <strong className="text-white block mb-1 text-sm font-semibold">Executive Overview:</strong>
              {activePlaybook.summary}
            </div>

            {/* Key Takeaways */}
            <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Non-Negotiable Creator Rules</span>
              </h4>
              <ul className="space-y-2">
                {activePlaybook.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-200">
                    <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-300 font-mono text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-800">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Sections */}
            <div className="space-y-4">
              {activePlaybook.sections.map((section, idx) => (
                <div key={idx} className="space-y-2 border-t border-zinc-800/80 pt-4">
                  <h4 className="text-sm font-bold text-white">{section.heading}</h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {section.content}
                  </p>
                  {section.actionableTip && (
                    <div className="bg-red-950/30 p-3 rounded-xl border border-red-900/40 text-xs text-zinc-300 flex items-start gap-2">
                      <Zap className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-red-400">Action Step: </strong>
                        {section.actionableTip}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer close */}
            <div className="pt-4 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setActivePlaybook(null)}
                className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Close Masterclass
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
