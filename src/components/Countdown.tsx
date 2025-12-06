import { useEffect, useState } from 'react';

const weddingDate = new Date('2026-09-18T16:30:00');

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const diff = +weddingDate - +new Date();
      if (diff <= 0) {
        setTimeLeft('🎉 Es ist so weit!');
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      setTimeLeft(`${days} Tage, ${hours} Std, ${minutes} Min`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return <p>Nur noch<br /> {timeLeft}</p>;
}