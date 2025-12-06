import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const numStars = 400;
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5,
      speed: Math.random() * 0.05 + 0.02,
      opacity: Math.random(),
      twinkle: Math.random() * 0.05
    }));

    const shootingStars: any[] = [];

    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 4 + 6,
        angle: Math.random() * Math.PI / 4 + Math.PI / 8,
        opacity: 1
      });
    };

    setInterval(spawnShootingStar, 4000); // Alle 4s neue Sternschnuppe

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Hintergrundverlauf
      const gradient = ctx.createRadialGradient(width / 2, height, 0, width / 2, height, width);
      gradient.addColorStop(0, '#1b2735');
      gradient.addColorStop(1, '#090a0f');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Sterne
      for (let star of stars) {
        star.opacity += (Math.random() - 0.5) * star.twinkle;
        star.opacity = Math.max(0.3, Math.min(1, star.opacity));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      }

      // Sternschnuppen
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length * Math.cos(s.angle), s.y - s.length * Math.sin(s.angle));
        ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        s.x += s.speed * Math.cos(s.angle);
        s.y += s.speed * Math.sin(s.angle);
        s.opacity -= 0.02;

        if (s.opacity <= 0) shootingStars.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%'
      }}
    />
  );
}