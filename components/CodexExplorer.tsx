'use client';

import React from 'react';
import { useEchoStore } from '@/lib/store';
import { BookOpen, Sparkles, Zap } from 'lucide-react';

const categoryColors = {
  ai: 'from-blue-400 to-cyan-400',
  rendering: 'from-emerald-400 to-teal-400',
  xr: 'from-purple-400 to-pink-400',
  authenticity: 'from-amber-400 to-orange-400',
  workflow: 'from-rose-400 to-violet-400',
};

export default function CodexExplorer() {
  const { codex } = useEchoStore();

  return (
    <div className="space-y-12">
      <div>
        <div className="flex items-center gap-4 mb-6">
          <BookOpen className="w-10 h-10 text-yellow-400" />
          <div>
            <h2 className="text-5xl font-display tracking-tighter">Multimedia Polymath Mastery Codex 2026</h2>
            <p className="text-gray-400 mt-1">v{codex.version} • Living Document</p>
          </div>
        </div>
        
        <div className="prose prose-invert max-w-none">
          <div className="p-8 border-l-4 border-[#00ff9f] bg-black/40 rounded-r-3xl italic text-xl leading-relaxed text-gray-200">
            {codex.philosophy}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-3xl font-display">Pioneer Techniques</h3>
          <div className="text-xs px-4 py-2 bg-white/5 rounded-2xl text-[#00ff9f] flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            6 TECHNIQUES ACTIVE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {codex.techniques.map((tech) => (
            <div
              key={tech.id}
              className="group cosmic-card p-8 rounded-3xl hover:scale-[1.02] transition-all duration-500 border border-white/10 hover:border-white/30"
            >
              <div className={`inline-flex items-center gap-2 text-xs uppercase tracking-widest px-4 py-1.5 rounded-2xl bg-gradient-to-r ${categoryColors[tech.category]} text-black font-medium mb-6`}>
                {tech.category}
              </div>
              
              <h4 className="text-2xl font-semibold group-hover:text-[#00ff9f] transition-colors">
                {tech.title}
              </h4>
              
              <p className="mt-5 text-gray-400 leading-relaxed text-[15px]">
                {tech.description}
              </p>

              {tech.examplePrompt && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="text-[10px] text-[#00ff9f]/70 tracking-widest mb-2">EXAMPLE PROMPT</div>
                  <div className="font-mono text-xs leading-relaxed text-emerald-300/80 bg-black/60 p-5 rounded-2xl">
                    {tech.examplePrompt}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-zinc-950 to-black border border-white/10 rounded-3xl p-10">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="text-[#ff00aa]" />
          <h4 className="text-2xl font-display">Flagship Project</h4>
        </div>
        <h3 className="text-4xl font-display text-white mb-4">{codex.flagshipProject.title}</h3>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
          {codex.flagshipProject.description}
        </p>
        <div className="mt-8 text-xs text-white/40">
          Platforms: {codex.flagshipProject.platforms.join(" • ")}
        </div>
        <div className="mt-6 inline-block px-5 py-2 text-xs border border-[#ff00aa]/30 text-[#ff00aa] rounded-2xl">
          {codex.flagshipProject.pioneeringEdge}
        </div>
      </div>

      <div className="text-center text-xs text-white/30 pt-8 border-t border-white/10">
        This Codex is alive. Every interaction in this app demonstrates its principles.
      </div>
    </div>
  );
}
