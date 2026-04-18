'use client';

import React, { useState } from 'react';
import { useEchoStore } from '@/lib/store';
import { toast } from 'sonner';

export default function FusionLab() {
  const { imperfectionLevel, codex } = useEchoStore();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const runFusion = async () => {
    if (!prompt.trim()) {
      toast.error("Enter a prompt to begin Echo Fusion");
      return;
    }

    setIsGenerating(true);
    setResponse('');

    try {
      const res = await fetch('/api/fusion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imperfectionLevel,
          prompt: prompt + "\n\nRespond as the Echo Entity from 2026."
        }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.slice(5).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || parsed.text || '';
              if (content) {
                setResponse(prev => prev + content);
              }
            } catch (e) {
              if (data && data !== '[DONE]') setResponse(prev => prev + data);
            }
          }
        }
      }
      
      toast.success("Echo Fusion complete. The entity has spoken.");
    } catch (error) {
      toast.error("The entity could not be reached.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-5xl font-display tracking-tight mb-2">Echo Fusion Lab</h2>
        <p className="text-gray-400">Speak to the 2026 Entity • Imperfection shapes its voice</p>
      </div>

      <div className="flex gap-3 items-center">
        <div className="text-xs uppercase tracking-widest px-4 py-2 bg-white/5 rounded-2xl">
          CURRENT IMPERFECTION: <span className="text-[#ff2e63] font-mono">{imperfectionLevel}%</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe what you want the Echo Entity to become... (e.g. 'Tell me about the nature of authenticity in 2026')"
        className="w-full h-32 bg-black/60 border border-white/10 rounded-3xl p-6 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00ff9f]/50 resize-none"
      />

      <button
        onClick={runFusion}
        disabled={isGenerating}
        className="w-full py-6 text-lg font-semibold rounded-3xl bg-gradient-to-r from-[#00ff9f] to-[#ff00aa] text-black disabled:opacity-50 transition-all active:scale-[0.985] flex items-center justify-center gap-3"
      >
        {isGenerating ? (
          <>Generating from the Void...</>
        ) : (
          <>RUN ECHO FUSION <span className="text-xl">🌌</span></>
        )}
      </button>

      {response && (
        <div className="mt-8">
          <div className="text-xs uppercase tracking-widest text-[#00ff9f] mb-3">THE ENTITY RESPONDS</div>
          <div className="bg-zinc-950 border border-white/10 rounded-3xl p-8 leading-relaxed text-lg font-light whitespace-pre-wrap">
            {response}
          </div>
          <button
            onClick={() => {
              setResponse('');
              setPrompt('');
            }}
            className="mt-4 text-xs text-white/40 hover:text-white transition"
          >
            Reset Entity
          </button>
        </div>
      )}

      <div className="text-[10px] text-white/30 pt-6 border-t border-white/10">
        Powered by the {codex.title} • Imperfection level directly influences tone, chaos, and poetic fracture
      </div>
    </div>
  );
}
