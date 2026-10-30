import React, { useEffect, useRef } from 'react';

/**
 * HeroWaveCanvas
 * Recreates the signature 3D purple/magenta multi-strand ribbon wave
 * from the reference screenshot with smooth mathematical interpolation,
 * gentle organic undulation, and subtle mouse interaction.
 */
export default function HeroWaveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let time = 0;
    let mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };

    // Handle high DPI crispness
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = (e.clientX - rect.left) / rect.width;
      mouse.targetY = (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Number of parallel strand lines in the ribbon
    const LINE_COUNT = 52;
    // Samples per line for smooth Bezier-like curve
    const SAMPLES = 120;

    const render = () => {
      time += 0.007;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Create flowing gradient across the canvas
      const grad = ctx.createLinearGradient(0, height, width, 0);
      grad.addColorStop(0, '#E000FF');   // Bright Magenta at bottom-left
      grad.addColorStop(0.35, '#C026D3');
      grad.addColorStop(0.65, '#9333EA'); // Vibrant Violet in middle
      grad.addColorStop(1, '#7C3AED');   // Royal Purple at top-right

      ctx.lineWidth = 1.25;

      // Draw each strand of the 3D ribbon
      for (let i = 0; i < LINE_COUNT; i++) {
        const lineFraction = i / (LINE_COUNT - 1); // 0 to 1
        const offset = (lineFraction - 0.5) * 110; // Ribbon thickness spread

        ctx.beginPath();
        // Dynamic opacity: outer lines slightly softer, core glowing
        const alpha = 0.28 + Math.sin(lineFraction * Math.PI) * 0.45;
        ctx.strokeStyle = grad;
        ctx.globalAlpha = alpha;

        for (let j = 0; j <= SAMPLES; j++) {
          const t = j / SAMPLES; // 0 (left) to 1 (right)

          // Base S-curve path from bottom-left to top-right
          // Sigmoid / S-curve interpolation
          const sCurve = Math.sin((t - 0.5) * Math.PI);
          
          // Primary wave equation
          const baseX = t * width;
          const baseY = height * 0.72 - (t * height * 0.62) + (sCurve * height * 0.22);

          // Organic harmonic undulation
          const wave1 = Math.sin(t * 4.5 + time + lineFraction * 1.5) * 32;
          const wave2 = Math.cos(t * 3.2 - time * 0.8 + lineFraction * 2.2) * 24;
          const wave3 = Math.sin(t * 7.0 + time * 1.2) * 12;

          // Mouse parallax response
          const mouseEffect = (mouse.y - 0.5) * 60 * Math.sin(t * Math.PI);

          // Strand twist & separation
          const ribbonTwist = Math.cos(t * Math.PI * 2.2 + time * 0.5) * offset;
          const ribbonPerpendicular = Math.sin(t * Math.PI * 1.8 + time * 0.3) * (offset * 0.45);

          const finalX = baseX + ribbonPerpendicular + (mouse.x - 0.5) * 20;
          const finalY = baseY + wave1 + wave2 + wave3 + ribbonTwist + mouseEffect;

          if (j === 0) {
            ctx.moveTo(finalX, finalY);
          } else {
            ctx.lineTo(finalX, finalY);
          }
        }

        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
}
