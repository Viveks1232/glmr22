import { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const PARTICLE_COUNT = 15000;

function MorphingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Generate geometries
  const { positions, aCube, aTorus, aLogo, aRandom } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const cube = new Float32Array(PARTICLE_COUNT * 3);
    const torus = new Float32Array(PARTICLE_COUNT * 3);
    const logo = new Float32Array(PARTICLE_COUNT * 3);
    const rand = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      
      // 1. Sphere (Radius 2)
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0;
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);

      // 2. Cube (Size 3)
      const face = Math.floor(Math.random() * 6);
      const c1 = (Math.random() - 0.5) * 3;
      const c2 = (Math.random() - 0.5) * 3;
      const c3 = 1.5 * (Math.random() > 0.5 ? 1 : -1);
      if (face === 0 || face === 1) { cube[i3] = c3; cube[i3+1] = c1; cube[i3+2] = c2; }
      else if (face === 2 || face === 3) { cube[i3] = c1; cube[i3+1] = c3; cube[i3+2] = c2; }
      else { cube[i3] = c1; cube[i3+1] = c2; cube[i3+2] = c3; }

      // 3. Torus (R=1.5, r=0.6)
      const tu = Math.random() * Math.PI * 2;
      const tv = Math.random() * Math.PI * 2;
      const R = 1.5;
      const tr = 0.6;
      torus[i3] = (R + tr * Math.cos(tv)) * Math.cos(tu);
      torus[i3 + 1] = (R + tr * Math.cos(tv)) * Math.sin(tu);
      torus[i3 + 2] = tr * Math.sin(tv);

      // 4. Logo (Octahedron / Diamond)
      const lFace = Math.floor(Math.random() * 8);
      const sq = Math.sqrt(Math.random());
      const a = 1 - sq;
      const b = sq * Math.random();
      const c = sq - b;
      const signX = (lFace & 1) ? 1 : -1;
      const signY = (lFace & 2) ? 1 : -1;
      const signZ = (lFace & 4) ? 1 : -1;
      const s = 2.5;
      logo[i3] = (a * signX) * s;
      logo[i3 + 1] = (b * signY) * s;
      logo[i3 + 2] = (c * signZ) * s;

      // Randoms for noise/vortex
      rand[i3] = Math.random();
      rand[i3 + 1] = Math.random();
      rand[i3 + 2] = Math.random();
    }

    return { positions: pos, aCube: cube, aTorus: torus, aLogo: logo, aRandom: rand };
  }, []);

  // GSAP Timeline for Morphing
  const progress = useRef({ value: 0 });
  const hoverGlow = useRef({ value: 0 });
  
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    // 0s-3s: Sphere
    tl.to(progress.current, { value: 0, duration: 3 });
    // 3s-5s: Sphere -> Cube
    tl.to(progress.current, { value: 1, duration: 2, ease: "power2.inOut" });
    // 5s-8s: Cube -> Torus
    tl.to(progress.current, { value: 2, duration: 3, ease: "power2.inOut" });
    // 8s-10s: Torus -> Vortex -> Logo
    tl.to(progress.current, { value: 3, duration: 2, ease: "power2.inOut" });
    // 10s-12s: Logo -> Sphere
    tl.to(progress.current, { value: 4, duration: 2, ease: "power2.inOut" });

    // Scroll acceleration
    const handleScroll = () => {
      tl.timeScale(1 + window.scrollY * 0.002);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      tl.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mouse Parallax & Hover
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uProgress.value = progress.current.value;
      
      // Hover glow intensity
      const dist = Math.sqrt(mouse.current.x * mouse.current.x + mouse.current.y * mouse.current.y);
      const targetGlow = dist < 0.5 ? 1.0 : 0.0;
      hoverGlow.current.value = THREE.MathUtils.lerp(hoverGlow.current.value, targetGlow, 0.1);
      materialRef.current.uniforms.uHoverGlow.value = hoverGlow.current.value;
    }
    if (pointsRef.current) {
      // Gentle rotation
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      
      // Mouse Parallax
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mouse.current.x * 0.5, 0.05);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mouse.current.y * 0.5, 0.05);
    }
  });

  const vertexShader = `
    uniform float uTime;
    uniform float uProgress;
    uniform float uHoverGlow;
    attribute vec3 aCube;
    attribute vec3 aTorus;
    attribute vec3 aLogo;
    attribute vec3 aRandom;
    varying vec3 vPos;
    varying float vAlpha;

    void main() {
      vec3 pos = position;
      vec3 targetPos = pos;
      
      float p = mod(uProgress, 4.0);
      
      if (p < 1.0) {
        targetPos = mix(pos, aCube, smoothstep(0.0, 1.0, p));
      } else if (p < 2.0) {
        targetPos = mix(aCube, aTorus, smoothstep(1.0, 2.0, p));
      } else if (p < 3.0) {
        targetPos = mix(aTorus, aLogo, smoothstep(2.0, 3.0, p));
      } else {
        targetPos = mix(aLogo, pos, smoothstep(3.0, 4.0, p));
      }

      // Vortex Effect (between Torus and Logo)
      float vortex = 0.0;
      if (p > 2.0 && p < 3.0) {
        vortex = sin((p - 2.0) * 3.14159);
      }
      
      vec3 finalPos = targetPos;
      
      if (vortex > 0.0) {
        float angle = vortex * aRandom.x * 10.0 + uTime * 2.0;
        float s = sin(angle);
        float c = cos(angle);
        mat2 rot = mat2(c, -s, s, c);
        finalPos.xz *= rot;
        finalPos += (aRandom - 0.5) * vortex * 4.0;
      }

      // Gentle float & pulse
      finalPos.y += sin(uTime * 2.0 + aRandom.y * 6.28) * 0.1;
      
      // Pulse effect on sphere
      if (p < 0.5 || p > 3.5) {
         float pulse = sin(uTime * 3.0 + finalPos.y * 2.0) * 0.05;
         finalPos += normalize(finalPos) * pulse;
      }

      vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Size attenuation + hover glow
      float baseSize = 20.0 * aRandom.z + 5.0;
      float hoverSize = baseSize + (uHoverGlow * 15.0);
      gl_PointSize = hoverSize * (1.0 / -mvPosition.z);
      
      vPos = finalPos;
      vAlpha = p > 2.0 && p < 3.0 ? 1.0 - vortex * 0.5 : 1.0;
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uHoverGlow;
    varying vec3 vPos;
    varying float vAlpha;

    void main() {
      vec2 xy = gl_PointCoord.xy - vec2(0.5);
      float ll = length(xy);
      if (ll > 0.5) discard;
      
      float alpha = (0.5 - ll) * 2.0;
      alpha = pow(alpha, 1.5) * vAlpha;
      
      // Mix colors based on position
      vec3 color = mix(uColor1, uColor2, sin(vPos.y * 0.5 + vPos.x * 0.5) * 0.5 + 0.5);
      
      // Add white highlight on hover
      color = mix(color, vec3(1.0), uHoverGlow * 0.3);
      
      gl_FragColor = vec4(color, alpha * (0.6 + uHoverGlow * 0.4));
    }
  `;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aCube" count={PARTICLE_COUNT} array={aCube} itemSize={3} />
        <bufferAttribute attach="attributes-aTorus" count={PARTICLE_COUNT} array={aTorus} itemSize={3} />
        <bufferAttribute attach="attributes-aLogo" count={PARTICLE_COUNT} array={aLogo} itemSize={3} />
        <bufferAttribute attach="attributes-aRandom" count={PARTICLE_COUNT} array={aRandom} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uHoverGlow: { value: 0 },
          uColor1: { value: new THREE.Color('#7A5FFF') }, // Neon Purple
          uColor2: { value: new THREE.Color('#00E5FF') }  // Electric Cyan
        }}
      />
    </points>
  );
}

export default function Hero3D() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B0F2A]">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <MorphingParticles />
        </Canvas>
        
        {/* Vignette / Gradient Overlay for cinematic feel */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#0B0F2A_100%)] pointer-events-none z-10" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-end h-full w-full max-w-5xl mx-auto px-6 pb-24 pt-[60vh]">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 10 }} // Fades in when Logo appears (10s mark)
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] mb-6 text-white drop-shadow-2xl">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#7A5FFF]">
              Digital Growth
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 font-light">
            Experience seamless automation, data-driven marketing, and cinematic digital experiences that elevate your brand.
          </p>

          <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-medium text-white bg-white/5 border border-white/10 rounded-full overflow-hidden backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(122,95,255,0.3)]">
            <span className="relative z-10 flex items-center gap-2">
              Explore Our Platform
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#7A5FFF]/20 to-[#00E5FF]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>

      </div>

      {/* Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050507] to-transparent z-20 pointer-events-none" />
    </section>
  );
}
