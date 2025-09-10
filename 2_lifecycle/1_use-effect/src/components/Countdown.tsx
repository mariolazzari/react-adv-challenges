import { useEffect, useState } from "react";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft === 0) {
      return;
    }

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);

    return () => {
      clearInterval(timer);
    };
  }, [timeLeft]);

  return (
    <>
      <h2>Time left: {timeLeft}</h2>
    </>
  );
}
