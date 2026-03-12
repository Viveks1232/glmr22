// @ts-nocheck
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Float } from '@react-three/drei';

function MovingGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);
  
  useFrame((state) => {
    if (!gridRef.current) return;
    const speed = 2.0;
    gridRef.current.position.z = (state.clock.elapsedTime * speed) % 2;
  });

  return (
    <gridHelper 
      ref={gridRef} 
      args={[150, 75, '#00E5FF', '#3a208e']} 
      position={[0, -12, 0]} 
    />
  );
}

function GrowthGraph() {
  // Create a growth curve
  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i < 25; i++) {
      const x = -35 + i * 3;
      // Exponential-like growth curve with some noise
      const y = -10 + Math.pow(i, 1.25) * 0.4 + Math.sin(i * 0.8) * 1.5;
      const z = Math.sin(i * 0.4) * 4 - 5;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const linePoints = useMemo(() => curve.getPoints(150), [curve]);
  
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(linePoints);
    return geometry;
  }, [linePoints]);

  const dataParticles = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!dataParticles.current) return;
    const time = state.clock.elapsedTime;
    
    // Animate particles along the curve
    dataParticles.current.children.forEach((child, i) => {
      const t = ((time * 0.08) + (i / 20)) % 1;
      const pos = curve.getPointAt(t);
      child.position.copy(pos);
    });
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
        {/* Main Growth Line */}
        <line geometry={lineGeometry}>
          <lineBasicMaterial color="#00E5FF" linewidth={2} transparent opacity={0.9} />
        </line>
        
        {/* Area under the curve (vertical lines) */}
        {curve.points.map((p, i) => {
          const points = [p, new THREE.Vector3(p.x, -12, p.z)];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          return (
            <line key={`drop-${i}`} geometry={geometry}>
              <lineBasicMaterial color="#7A5FFF" transparent opacity={0.25} />
            </line>
          );
        })}

        {/* Nodes at key points */}
        {curve.points.map((p, i) => (
          <mesh key={`node-${i}`} position={p}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="#FFFFFF" />
            <pointLight color="#00E5FF" intensity={0.8} distance={8} />
          </mesh>
        ))}

        {/* Data flowing along the line */}
        <group ref={dataParticles}>
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh key={`particle-${i}`}>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshBasicMaterial color="#FF00FF" />
              <pointLight color="#FF00FF" intensity={0.5} distance={3} />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
}

function FloatingNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create random nodes
  const nodes = useMemo(() => {
    return Array.from({ length: 40 }).map(() => new THREE.Vector3(
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 50 - 20
    ));
  }, []);

  // Create lines between close nodes
  const lineGeometries = useMemo(() => {
    const geometries = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 18) {
          geometries.push(new THREE.BufferGeometry().setFromPoints([nodes[i], nodes[j]]));
        }
      }
    }
    return geometries;
  }, [nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 2;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={`net-node-${i}`} position={pos}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial color="#7A5FFF" transparent opacity={0.5} />
        </mesh>
      ))}
      {lineGeometries.map((geometry, i) => (
        <line key={`net-line-${i}`} geometry={geometry}>
          <lineBasicMaterial color="#3a208e" transparent opacity={0.2} />
        </line>
      ))}
    </group>
  );
}

export default function Background3D() {
  const { scrollY } = useScroll();
  
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0.2]);

  return (
    <motion.div 
      style={{ y, opacity }}
      className="fixed inset-0 z-0 pointer-events-none bg-[#050507]"
    >
      <Canvas camera={{ position: [0, 2, 25], fov: 60 }}>
        <fog attach="fog" args={['#050507', 15, 50]} />
        <MovingGrid />
        <GrowthGraph />
        <FloatingNetwork />
        <Sparkles count={300} scale={60} size={2.5} speed={0.5} opacity={0.3} color="#00E5FF" />
      </Canvas>

      {/* Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#7A5FFF]/15 rounded-full blur-[150px] mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#00E5FF]/15 rounded-full blur-[150px] mix-blend-screen" />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_10%,#050507_100%)] z-10" />
    </motion.div>
  );
}
