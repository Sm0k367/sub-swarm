'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Sparkles, BookOpen, Zap, Globe, Play } from 'lucide-react';

function EchoEntity() {
  const meshRef = useRef<any>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    meshRef.current.position.x = mouse.x * 0.8;
    meshRef.current.position.y = mouse.y * 0.8;
  });

  return (
    <Sphere ref={meshRef} args={[1.8, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#00ff9f"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0}
        metalness={0.9}
      />
    </Sphere>
  );
}

export default function EchoCodex() {
  const [activeTab, setActiveTab] = useState<'codex' | 'lab' | 'xr'>('xr');
  const [imperfectionLevel, setImperfectionLevel] = useState(42);

  const triggerAuthenticityFeedback = () => {
    const messages = [
      "Human imperfection detected. Enhancing soul resonance...",
      "Craft-as-luxury protocol activated. Glitch aesthetic applied.",
      "Authenticity score: 94.2%. Echo Fusion successful.",
      "The fracture was beautiful. Viewers will feel this."
    ];
    toast.success(messages[Math.floor(Math.random() * messages.length)], {
      description: "The digital entity has absorbed your input.",
      action: {
        label: "Save Moment",
        onClick: () => toast.info("Moment saved to your personal Codex."),
      },
    });
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00ff9f] to-[#c026d3] flex items-center justify-center">
              <span className="text-black text-xl font-bold">E</span>
            </div>
            <div className="font-display text-3xl tracking-tighter neon-text">ECHOCODEX</div>
          </div>
          
          <div className="flex gap-8 text-sm uppercase tracking-widest">
            <button onClick={() => setActiveTab('codex')} className={`hover:text-[#00ff9f] transition-colors ${activeTab === 'codex' ? 'text-[#00ff9f]' : ''}`}>Codex</button>
            <button onClick={() => setActiveTab('lab')} className={`hover:text-[#00ff9f] transition-colors ${activeTab === 'lab' ? 'text-[#00ff9f]' : ''}`}>Fusion Lab</button>
            <button onClick={() => setActiveTab('xr')} className={`hover:text-[#00ff9f] transition-colors ${activeTab === 'xr' ? 'text-[#00ff9f]' : ''}`}>Experience XR</button>
          </div>

          <button
            onClick={triggerAuthenticityFeedback}
            className="px-6 py-2.5 border border-[#00ff9f]/50 hover:bg-[#00ff9f]/10 rounded-full text-sm flex items-center gap-2 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            INJECT SOUL
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="pt-32 pb-20 hero-bg relative flex items-center justify-center min-h-[90vh] flex-col">
        <div className="absolute inset-0 imperfection-texture" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center z-10 px-6 max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#00ff9f]/30 text-[#00ff9f] text-sm mb-6 tracking-[4px]">
            APRIL 2026 • MULTIMEDIA POLYMATH STUDIO
          </div>
          
          <h1 className="text-7xl md:text-8xl font-display leading-none mb-6 neon-text">
            MASTER<br />EVERYTHING
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-10">
            The living implementation of the Multimedia Polymath Mastery Codex.<br />
            Echo Fusion • Real-time WebXR • Human Imperfection Engine
          </p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setActiveTab('xr')}
              className="px-10 py-4 bg-white text-black rounded-full font-medium flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <Play className="w-5 h-5" />
              ENTER THE EXPERIENCE
            </button>
            <button
              onClick={triggerAuthenticityFeedback}
              className="px-8 py-4 border border-white/40 hover:border-white/80 rounded-full transition-colors"
            >
              Feel the Fracture
            </button>
          </div>
        </motion.div>

        {/* 3D Teaser */}
        <div className="absolute bottom-12 right-12 w-80 h-80 hidden xl:block">
          <Canvas camera={{ position: [0, 0, 8] }} className="rounded-3xl">
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ff9f" />
            <EchoEntity />
            <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.4} />
          </Canvas>
          <div className="text-center text-[10px] text-[#00ff9f]/50 tracking-widest mt-3">LIVE ECHO ENTITY • MOVE MOUSE</div>
        </div>
      </div>

      {/* TABBED CONTENT */}
      <div className="max-w-7xl mx-auto px-8 pb-24">
        <div className="cosmic-card rounded-3xl p-10">
          {activeTab === 'xr' && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Globe className="w-8 h-8 text-[#00ff9f]" />
                <div>
                  <h2 className="text-4xl font-display">Echoes of Becoming — WebXR Experience</h2>
                  <p className="text-gray-400">Real-time digital entity. Watch perfection fracture into glorious imperfection.</p>
                </div>
              </div>
              
              <div className="bg-black rounded-2xl aspect-video flex items-center justify-center border border-white/10 relative overflow-hidden">
                <Canvas className="w-full h-full" camera={{ position: [0, 0, 6] }}>
                  <ambientLight intensity={0.8} />
                  <pointLight position={[-10, -10, -10]} color="#ff00aa" />
                  <EchoEntity />
                  <OrbitControls />
                </Canvas>
                <div className="absolute bottom-8 left-8 bg-black/70 px-6 py-3 rounded-xl border border-[#00ff9f]/30 text-sm">
                  Drag to orbit • Scroll to zoom • Click to inject imperfection
                </div>
              </div>
            </div>
          )}

          {activeTab === 'lab' && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Zap className="w-8 h-8 text-[#c026d3]" />
                <div>
                  <h2 className="text-4xl font-display">Echo Fusion Lab</h2>
                  <p className="text-gray-400">Generate. Distort. Humanize.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest mb-2 block">Imperfection Level</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={imperfectionLevel}
                      onChange={(e) => setImperfectionLevel(parseInt(e.target.value))}
                      className="w-full accent-[#ff2e63]"
                    />
                    <div className="text-right text-sm text-[#ff2e63]">{imperfectionLevel}%</div>
                  </div>
                  
                  <button
                    onClick={triggerAuthenticityFeedback}
                    className="w-full py-6 bg-gradient-to-r from-[#00ff9f] to-[#c026d3] text-black font-medium rounded-2xl text-lg hover:brightness-110 transition"
                  >
                    RUN ECHO FUSION
                  </button>
                </div>

                <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 font-mono text-sm leading-relaxed text-[#00ff9f]/80">
                  Prompt: A hyperreal digital entity born in 2026, transitioning from pristine synthetic perfection into glorious hand-crafted chaos with stop-motion textures and controlled hallucination aesthetic, cinematic volumetric lighting, authenticity feedback loop active...
                </div>
              </div>
            </div>
          )}

          {activeTab === 'codex' && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <BookOpen className="w-8 h-8 text-[#facc15]" />
                <div>
                  <h2 className="text-4xl font-display">Multimedia Polymath Mastery Codex 2026</h2>
                </div>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <h3 className="text-2xl text-[#00ff9f]">Core Philosophy</h3>
                <p>Master “everything” through layered skill lattices. AI accelerates. Human imperfection creates luxury. This entire application is a living embodiment of the Codex.</p>
                
                <h3 className="text-2xl text-[#00ff9f] mt-10">Pioneer Techniques Active In This Build</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <li className="cosmic-card p-6">• AI-First Post with Human Imperfection Layer</li>
                  <li className="cosmic-card p-6">• Real-Time Spatial Rendering (Web)</li>
                  <li className="cosmic-card p-6">• Adaptive Interactive XR Experiences</li>
                  <li className="cosmic-card p-6">• Hyper-Personalized Video Engines</li>
                  <li className="cosmic-card p-6">• Craft-as-Luxury Aesthetic</li>
                  <li className="cosmic-card p-6">• Echo Fusion Workflow v2.0</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center py-12 text-xs text-white/30 border-t border-white/10">
        Built one file at a time • EchoCodex 2026 • Master Coordinator Protocol
      </footer>
    </div>
  );
}
