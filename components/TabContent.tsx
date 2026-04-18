'use client';

import React from 'react';
import { useEchoStore } from '@/lib/store';
import InteractiveEchoScene from './InteractiveEchoScene';
import FusionLab from './FusionLab';
import CodexExplorer from './CodexExplorer';

export default function TabContent() {
  const { activeTab, imperfectionLevel } = useEchoStore();

  return (
    <>
      {activeTab === 'xr' && (
        <div>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-5xl font-display tracking-tight">Echoes of Becoming</h2>
              <p className="text-gray-400">Real-time WebXR Experience • Click the entity to trigger fracture</p>
            </div>
            <div className="text-right">
              <div className="text-xs tracking-widest text-[#ff2e63]">IMPERFECTION LEVEL</div>
              <div className="text-6xl font-mono text-[#ff2e63] tabular-nums">{imperfectionLevel}</div>
            </div>
          </div>
          <div className="h-[660px] rounded-3xl overflow-hidden border border-white/10 bg-black">
            <InteractiveEchoScene />
          </div>
        </div>
      )}

      {activeTab === 'lab' && <FusionLab />}

      {activeTab === 'codex' && <CodexExplorer />}
    </>
  );
}
