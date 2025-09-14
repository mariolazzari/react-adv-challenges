import { useState, useEffect } from 'react';

function CountdownBroken() {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft === 0) return
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer)
  }, [timeLeft]);

  return <h1>Time Left: {timeLeft}</h1>;
}


function App() {
  return <CountdownBroken />
}

export default App;
