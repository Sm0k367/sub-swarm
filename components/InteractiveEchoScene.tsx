'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';
import { useEchoStore } from '@/lib/store';
import { generateImperfectionClass, randomFractureMessage } from '@/lib/utils';
import * as THREE from 'three';
import { toast } from 'sonner';

function Entity({ imperfection }: { imperfection: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const { isFracturing, triggerFracture } = useEchoStore();

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.12;
    meshRef.current.rotation.y = t * 0.22;

    const baseDistort = 0.2 + (imperfection / 120);
    const speed = 1.2 + (imperfection / 80);

    materialRef.current.distort = isFracturing ? baseDistort * 3 : baseDistort;
    materialRef.current.speed = isFracturing ? speed * 4 : speed;

    if (isFracturing) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.6, 1.6, 1.6), 0.12);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08);
    }
  });

  return (
    <Sphere ref={meshRef} args={[2.1, 128, 128]}>
      <MeshDistortMaterial
        ref={materialRef}
        color="#00ff9f"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.95}
        emissive="#001a11"
      />
    </Sphere>
  );
}

export default function InteractiveEchoScene() {
  const imperfectionLevel = useEchoStore((state) => state.imperfectionLevel);
  const triggerFracture = useEchoStore((state) => state.triggerFracture);
  const setImperfectionLevel = useEchoStore((state) => state.setImperfectionLevel);

  const handleClick = () => {
    triggerFracture();
    toast.info(randomFractureMessage(), {
      description: `Imperfection increased to ${Math.min(imperfectionLevel + 8, 100)}%`,
      action: {
        label: "Adjust",
        onClick: () => setImperfectionLevel(Math.min(imperfectionLevel + 15, 100)),
      },
    });
  };

  return (
    <div className={`w-full h-full relative ${generateImperfectionClass(imperfectionLevel)}`}>
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        onClick={handleClick}
      >
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.7} />
        <pointLight position={[12, 12, 12]} intensity={2.2} color="#00ff9f" />
        <pointLight position={[-12, -12, -12]} intensity={1.8} color="#ff00aa" />
        
        <Entity imperfection={imperfectionLevel} />
        
        <Environment preset="night" />
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={5}
          maxDistance={22}
          autoRotate={imperfectionLevel < 30}
          autoRotateSpeed={0.25}
        />
      </Canvas>

      <div className="absolute bottom-6 left-6 bg-black/70 text-[#00ff9f]/80 text-[10px] px-5 py-3 rounded-2xl border border-[#00ff9f]/20 font-mono tracking-[1px]">
        CLICK ENTITY TO FRACTURE • DRAG TO ROTATE • SCROLL TO ZOOM
      </div>

      <div className="absolute top-6 right-6 bg-black/80 px-5 py-2.5 rounded-2xl text-xs border border-[#ff2e63]/40 text-[#ff2e63] font-mono">
        CHAOS: {imperfectionLevel}%
      </div>
    </div>
  );
}

