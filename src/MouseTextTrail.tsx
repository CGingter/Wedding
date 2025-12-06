import { useEffect, useRef } from 'react';

const text = 'Sonny und Chrissy'.split('');

export default function MouseTextTrail() {
  const letters = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const positions = text.map(() => ({ x: 0, y: 0 }));
    const mouse = { x: 0, y: 0 };

    function animate() {
      positions.forEach((pos, i) => {
        const targetX = i === 0 ? mouse.x : positions[i - 1].x;
        const targetY = i === 0 ? mouse.y : positions[i - 1].y;

        pos.x += (targetX - pos.x) * 0.3;
        pos.y += (targetY - pos.y) * 0.3;

        if (letters.current[i]) {
          letters.current[i].style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const mouseMoveHandler = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', mouseMoveHandler);
    return () => window.removeEventListener('mousemove', mouseMoveHandler);
  }, []);

  return (
    <>
      {text.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) letters.current[i] = el!;
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            fontSize: '1.8rem',
            color: 'silver',
            fontWeight: 'bold',
            pointerEvents: 'none',
            zIndex: 9999,
            fontFamily: 'cursive',
            textShadow: `
              0 0 6px rgba(255, 255, 255, 0.6),   /* weicher outer glow */
              0 0 18px rgba(255, 255, 255, 0.5),  /* zweiter leichter Schein */
              0 0 3px rgba(0, 0, 0, 0.9)          /* dunkler Core für Kontrast */
            `,
            userSelect: 'none',
            // Abstand für Buchstaben anfangs:
            marginLeft: `${i * 14}px`,
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
}