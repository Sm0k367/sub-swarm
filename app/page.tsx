'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play } from 'lucide-react';
import { useEchoStore } from '@/lib/store';
import InteractiveEchoScene from '@/components/InteractiveEchoScene';
import FusionLab from '@/components/FusionLab';

export default function EchoCodexApp() {
  const { activeTab, setActiveTab, imperfectionLevel } = useEchoStore();

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
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
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 border border-[#00ff9f]/60 hover:border-[#00ff9f] rounded-2xl text-sm hover:bg-white/5 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            INJECT SOUL
          </button>
        </div>
      </nav>

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
              MULTIMEDIA POLYMATH MASTERY STUDIO — APRIL 2026
            </div>
            
            <h1 className="text-7xl md:text-[92px] leading-[0.95] font-display tracking-tighter neon-text mb-6">
              MASTER<br />EVERYTHING
            </h1>
            
            <p className="text-2xl text-gray-300 max-w-lg">
              Living implementation of the Multimedia Polymath Mastery Codex.<br />
              Real-time XR • Echo Fusion • Authenticity Engine
            </p>

            <div className="flex gap-4 mt-12">
              <button
                onClick={() => setActiveTab('xr')}
                className="px-10 py-5 bg-white text-black rounded-2xl font-semibold flex items-center gap-3 hover:scale-105 active:scale-95 transition-transform"
              >
                <Play className="w-5 h-5" />
                ENTER THE EXPERIENCE
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-24 -mt-10 relative z-20">
        <div className="cosmic-card rounded-3xl p-10 shadow-2xl">
          {activeTab === 'xr' && (
            <div>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-5xl font-display tracking-tight">Echoes of Becoming</h2>
                  <p className="text-gray-400 text-lg">Real-time WebXR Experience • Click anywhere on the entity to fracture it</p>
                </div>
                <div className="text-right">
                  <div className="text-xs tracking-widest text-[#ff2e63]">IMPERFECTION</div>
                  <div className="text-6xl font-mono text-[#ff2e63] tabular-nums">{imperfectionLevel}</div>
                </div>
              </div>
              <div className="h-[640px] rounded-3xl overflow-hidden border border-white/10 bg-black relative">
                <InteractiveEchoScene />
              </div>
            </div>
          )}

          {activeTab === 'lab' && <FusionLab />}

          {activeTab === 'codex' && (
            <div className="prose prose-invert max-w-none">
              <h2 className="text-5xl font-display mb-6">Multimedia Polymath Mastery Codex 2026</h2>
              <p className="text-xl leading-relaxed text-gray-300 border-l-4 border-[#00ff9f] pl-8 italic">
                This entire application is a living, breathing implementation of the Codex.<br />
                Every interaction demonstrates Echo Fusion: AI + Human Imperfection.
              </p>
              
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="cosmic-card p-8 rounded-2xl">
                  <div className="text-[#00ff9f] text-xs tracking-widest mb-2">CORE META-TECHNIQUE</div>
                  <h3 className="text-2xl font-semibold">Echo Fusion</h3>
                  <p className="mt-4 text-gray-400">AI rapidly prototypes. Humans inject soul, imperfection, and luxury craft. This is how we master everything in 2026.</p>
                </div>
                <div className="cosmic-card p-8 rounded-2xl">
                  <div className="text-[#00ff9f] text-xs tracking-widest mb-2">FLAGship PROJECT</div>
                  <h3 className="text-2xl font-semibold">Echoes of Becoming</h3>
                  <p className="mt-4 text-gray-400">A real-time digital entity that evolves from synthetic perfection into glorious human chaos based on your input. Now running live in your browser.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center py-16 text-xs text-white/30 border-t border-white/5">
        EchoCodex 2026 • Built incrementally, one file at a time • 
        A living demonstration of the Multimedia Polymath Mastery Codex
      </footer>
    </div>
  );
}
