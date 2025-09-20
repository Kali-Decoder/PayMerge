"use client";

import Link from "next/link";
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const Particle = function(x, y, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = Math.random() * 1.5 + 1;  // Slightly smaller particles
};

export function Hero() {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particles = useRef([]);
  const animationRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Initialize more particles for better connection density
    particles.current = [];
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      const dx = (Math.random() - 0.5) * 3;  // Slower movement
      const dy = (Math.random() - 0.5) * 3;  // Slower movement
      particles.current.push(new Particle(x, y, dx, dy));
    }

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // First draw all connections
      for (let i = 0; i < particles.current.length; i++) {
        const particle = particles.current[i];
        
        // Check connections with all other particles
        for (let j = i + 1; j < particles.current.length; j++) {
          const otherParticle = particles.current[j];
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) +
            Math.pow(particle.y - otherParticle.y, 2)
          );
          
          // Increased connection distance and adjusted opacity
          if (distance < 150) {
            ctx.beginPath();
            const opacity = 0.5 * (1 - distance / 150);  // Increased base opacity
            ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
            ctx.lineWidth = 0.6;  // Slightly thicker lines
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
      }
      
      // Then draw all particles on top
      particles.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#4f46e5';
        ctx.fill();
        
        // Update position
        particle.x += particle.dx;
        particle.y += particle.dy;
        
        // Wrap around screen
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.y > dimensions.height) particle.y = 0;
        if (particle.y < 0) particle.y = dimensions.height;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  return (
    <div className="relative min-h-screen bg-white">
      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center min-h-screen"
      >
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="absolute inset-0 w-full h-full"
        />
        <div className="relative z-10 w-full flex items-center justify-center">
          <main className="w-full max-w-3xl px-6">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 text-center w-full leading-tight">
                  <span className="block">Reward Contributors</span>
                  <span className="block text-indigo-600">Fairly and Transparently</span>
                </h1>
                <Image
                  src="/pullperksl.png"
                  alt="Reward Contributors"
                  width={220}
                  height={220}
                  className="rounded-xl shadow-lg"
                />
              </div>
              <p className="mt-6 text-lg text-gray-600 max-w-xl text-center">
                Distribute hackathon prizes and bounties based on actual GitHub contributions.<br />
                Automate reward distribution with smart contracts and blockchain technology.
              </p>
              <div className="mt-8 flex gap-4 justify-center w-full">
                <Link
                  href="/dashboard"
                  className="px-8 py-3 rounded-lg bg-indigo-600 text-white text-lg font-semibold shadow hover:bg-indigo-700 transition"
                >
                  Get started
                </Link>
                <Link
                  href="/learn-more"
                  className="px-8 py-3 rounded-lg bg-gray-200 text-indigo-700 text-lg font-semibold shadow hover:bg-gray-300 transition"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}