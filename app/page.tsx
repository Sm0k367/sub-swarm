'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Zap, Globe, Play, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useEchoStore } from '@/lib/store';
import InteractiveEchoScene from '@/components/InteractiveEchoScene';

export default function EchoCodexApp() {
  const { 
    activeTab, 
    setActiveTab, 
    imperfectionLevel, 
    setImperfectionLevel,
    triggerFracture,
    codex 
  } = useEchoStore();

  const triggerAuthenticityFeedback = () => {
    triggerFracture();
    const messages = [
      "Human imperfection injected. Soul resonance increased.",
      "Craft-as-luxury protocol engaged. Glitch aesthetic applied.",
      "Authenticity score: 96.8%. Echo Fusion successful.",
      "The fracture was poetic. The entity has evolved."
    ];
    toast.success(messages[Math.floor(Math.random() * messages.length)], {
      description: "The digital entity absorbed your input.",
      action: {
        label: "Save to Codex",
        onClick: () => toast("Moment archived in your personal 2026 archive."),
      },
    });
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#00ff9f] via-[#c026d3] to-[#ff00aa] flex items-center justify-center shadow-lg shadow-[#00ff9f]/50">
              <span className="text-black text-2xl font-bold tracking-tighter">EC</span>
            </div>
            <div className="font-display text-4xl tracking-[-2px] neon-text">ECHOCODEX</div>
          </div>

          <div className="flex items-center gap-10 text-sm font-medium tracking-widest">
            <button 
              onClick={() => setActiveTab('xr')}
              className={`transition-colors hover:text-[#00ff9f] ${activeTab === 'xr' ? 'text-[#00ff9f]' : 'text-white/70'}`}
            >
              EXPERIENCE
            </button>
            <button 
              onClick={() => setActiveTab('lab')}
              className={`transition-colors hover:text-[#00ff9f] ${activeTab === 'lab' ? 'text-[#00ff9f]' : 'text-white/70'}`}
            >
              FUSION LAB
            </button>
            <button 
              onClick={() => setActiveTab('codex')}
              className={`transition-colors hover:text-[#00ff9f] ${activeTab === 'codex' ? 'text-[#00ff9f]' : 'text-white/70'}`}
            >
              THE CODEX
            </button>
          </div>

          <button
            onClick={triggerAuthenticityFeedback}
            className="flex items-center gap-2 px-6 py-3 border border-[#00ff9f]/60 hover:border-[#00ff9f] rounded-2xl text-sm hover:bg-white/5 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            INJECT IMPERFECTION
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="pt-28 pb-16 hero-bg relative min-h-[85vh] flex items-center">
        <div className="absolute inset-0 imperfection-texture opacity-40" />
        
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <div className="inline-block mb-6 px-5 py-2 border border-[#00ff9f]/30 rounded-full text-xs tracking-[3px] text-[#00ff9f]">
              MULTIMEDIA POLYMATH MASTERY STUDIO — 2026
            </div>
            
            <h1 className="text-7xl md:text-[92px] leading-[0.95] font-display tracking-tighter neon-text mb-6">
              MASTER<br />EVERYTHING
            </h1>
            
            <p className="text-2xl text-gray-300 max-w-lg">
              The living embodiment of the 2026 Codex.<br />
              Real-time XR • Echo Fusion • Human Soul Engine
            </p>

            <div className="flex gap-4 mt-12">
              <button
                onClick={() => setActiveTab('xr')}
                className="px-10 py-5 bg-white text-black rounded-2xl font-semibold flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform"
              >
                <Play className="w-5 h-5" />
                ENTER THE EXPERIENCE
              </button>
              <button
                onClick={triggerAuthenticityFeedback}
                className="px-8 py-5 border border-white/40 hover:bg-white/5 rounded-2xl transition-colors"
              >
                Fracture Entity
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-8 pb-24 -mt-10 relative z-20">
        <div className="cosmic-card rounded-3xl p-10 shadow-2xl">
          {activeTab === 'xr' && (
            <div>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-5xl font-display tracking-tight">Echoes of Becoming</h2>
                  <p className="text-gray-400 text-lg">Real-time WebXR Experience • Click to fracture the entity</p>
                </div>
                <div className="text-right">
                  <div className="text-xs tracking-widest text-[#ff2e63]">IMPERFECTION LEVEL</div>
                  <div className="text-5xl font-mono text-[#ff2e63]">{imperfectionLevel}</div>
                </div>
              </div>
              <div className="h-[620px] rounded-2xl overflow-hidden border border-white/10 bg-black">
                <InteractiveEchoScene />
              </div>
            </div>
          )}

          {activeTab === 'lab' && (
            <div>
              <div className="flex items-center gap-4 mb-10">
                <Zap className="w-10 h-10 text-purple-400" />
                <div>
                  <h2 className="text-5xl font-display">Echo Fusion Lab</h2>
                  <p className="text-gray-400">Generate • Distort • Humanize</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-3 text-gray-400">Imperfection Intensity</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={imperfectionLevel}
                      onChange={(e) => setImperfectionLevel(parseInt(e.target.value))}
                      className="w-full accent-[#ff2e63] cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <div>PERFECTION</div>
                      <div className="text-[#ff2e63] font-medium">{imperfectionLevel}% CHAOS</div>
                    </div>
                  </div>

                  <button
                    onClick={triggerAuthenticityFeedback}
                    className="w-full h-20 bg-gradient-to-r from-[#00ff9f] to-[#ff00aa] text-black text-xl font-semibold rounded-3xl hover:brightness-110 active:scale-[0.985] transition-all flex items-center justify-center gap-3"
                  >
                    <RefreshCw className="w-6 h-6" />
                    RUN ECHO FUSION
                  </button>
                </div>

                <div className="lg:col-span-3 bg-zinc-950 border border-white/10 rounded-3xl p-8 font-mono text-sm leading-relaxed text-emerald-300/90">
                  {codex.techniques[5].examplePrompt || "A hyperreal digital consciousness born in 2026, slowly fracturing from pristine synthetic perfection into beautiful chaotic human craft..."}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'codex' && (
            <div>
              <div className="flex items-center gap-4 mb-10">
                <BookOpen className="w-10 h-10 text-yellow-400" />
                <h2 className="text-5xl font-display">Multimedia Polymath Mastery Codex 2026</h2>
              </div>
              
              <div className="prose prose-invert max-w-none text-gray-300">
                <p className="text-xl leading-relaxed border-l-4 border-[#00ff9f] pl-6 italic mb-12">
                  {codex.philosophy}
                </p>

                <h3 className="text-3xl text-[#00ff9f] mb-6">Active Pioneer Techniques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {codex.techniques.map((tech) => (
                    <div key={tech.id} className="cosmic-card p-8 rounded-2xl hover:border-[#00ff9f]/60 transition-colors group">
                      <div className="uppercase text-[10px] tracking-[2px] text-gray-500 mb-2">{tech.category}</div>
                      <h4 className="text-xl font-semibold text-white group-hover:text-[#00ff9f] transition-colors">{tech.title}</h4>
                      <p className="text-sm text-gray-400 mt-4 leading-relaxed">{tech.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-16 p-8 border border-dashed border-white/20 rounded-3xl">
                  <h4 className="text-[#00ff9f] mb-3">Flagship Project</h4>
                  <h3 className="text-3xl font-display mb-4">{codex.flagshipProject.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{codex.flagshipProject.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center py-16 text-xs text-white/30 border-t border-white/5">
        EchoCodex 2026 • Built one file at a time by the Pioneer Sub-Agent Collective • 
        This is a living implementation of the Multimedia Polymath Mastery Codex
      </footer>
    </div>
  );
}
