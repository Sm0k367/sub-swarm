'use client';

import React, { useState } from 'react';
import { useEchoStore } from '@/lib/store';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Zap, RefreshCw } from 'lucide-react';

export default function FusionLab() {
  const { imperfectionLevel, setImperfectionLevel, codex } = useEchoStore();
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
          prompt: prompt + "\n\nRespond as the Echo Entity from 2026.",
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
              if (content) setResponse((prev) => prev + content);
            } catch {
              if (data && data !== '[DONE]') setResponse((prev) => prev + data);
            }
          }
        }
      }
      toast.success("Echo Fusion complete. The entity has spoken.");
    } catch (error) {
      toast.error("The entity could not be reached.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-10">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Zap className="w-10 h-10 text-purple-400" />
            <div>
              <CardTitle className="text-5xl">Echo Fusion Lab</CardTitle>
              <p className="text-gray-400 mt-2">Speak to the 2026 Entity. Imperfection shapes its voice.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <div className="flex justify-between text-xs uppercase tracking-widest mb-3">
              <span>Imperfection Intensity</span>
              <span className="text-[#ff2e63] font-mono text-lg">{imperfectionLevel}%</span>
            </div>
            <Slider
              value={[imperfectionLevel]}
              onValueChange={(value) => setImperfectionLevel(value[0])}
              min={0}
              max={100}
              step={1}
            />
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want the Echo Entity to become... (e.g. Tell me about authenticity in the age of synthetic abundance)"
            className="w-full h-40 bg-black/60 border border-white/10 rounded-3xl p-6 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00ff9f]/50 resize-none font-light"
          />

          <Button
            variant="cosmic"
            size="lg"
            onClick={runFusion}
            disabled={isGenerating}
            className="w-full h-16 text-lg"
          >
            {isGenerating ? (
              <>Generating from the Void...</>
            ) : (
              <>
                RUN ECHO FUSION <RefreshCw className="ml-3 w-5 h-5" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {response && (
        <Card>
          <CardHeader>
            <CardTitle className="text-[#00ff9f]">The Entity Responds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black/80 border border-white/10 rounded-3xl p-8 leading-relaxed text-lg font-light whitespace-pre-wrap min-h-[200px]">
              {response}
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setResponse('');
                setPrompt('');
              }}
              className="mt-6"
            >
              Reset Entity
            </Button>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-white/30 text-center">
        Powered by the {codex.title} • The higher the imperfection, the more chaotic and human the response becomes.
      </p>
    </div>
  );
}
