'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';
import { useEchoStore } from '@/lib/store';
import * as THREE from 'three';

function Entity({ imperfection }: { imperfection: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const { isFracturing } = useEchoStore();

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const t = state.clock.elapsedTime;
    
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.25;
    
    const distort = 0.3 + (imperfection / 100) * 0.7;
    const speed = 1.5 + (imperfection / 100) * 2;
    
    if (materialRef.current) {
      materialRef.current.distort = isFracturing ? distort * 2.5 : distort;
      materialRef.current.speed = isFracturing ? speed * 3 : speed;
    }

    if (isFracturing && meshRef.current.scale.x < 1.4) {
      meshRef.current.scale.setScalar(1 + Math.sin(t * 20) * 0.15);
    } else if (meshRef.current.scale.x !== 1) {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <Sphere ref={meshRef} args={[2.2, 128, 128]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#00ff9f"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.95}
        emissive="#002211"
      />
    </Sphere>
  );
}

export default function InteractiveEchoScene() {
  const imperfectionLevel = useEchoStore((state) => state.imperfectionLevel);
  const triggerFracture = useEchoStore((state) => state.triggerFracture);

  useEffect(() => {
    const handleClick = () => triggerFracture();
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [triggerFracture]);

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        className="rounded-3xl"
      >
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00ff9f" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff00aa" />
        
        <Entity imperfection={imperfectionLevel} />
        
        <Environment preset="night" />
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={4}
          maxDistance={18}
          autoRotate={!imperfectionLevel}
          autoRotateSpeed={0.3}
        />
      </Canvas>
      
      <div className="absolute bottom-6 left-6 bg-black/70 text-[#00ff9f] text-xs px-5 py-2.5 rounded-2xl border border-[#00ff9f]/20 font-mono tracking-widest">
        DRAG TO ROTATE • SCROLL TO ZOOM • CLICK TO FRACTURE
      </div>
      
      <div className="absolute top-6 right-6 bg-black/80 text-[10px] px-4 py-2 rounded-xl border border-[#ff2e63]/30 text-[#ff2e63]">
        IMPERFECTION: {imperfectionLevel}%
      </div>
    </div>
  );
}
