import { createContext, useState, useEffect, useCallback, useMemo } from "react"

export const DashboardContext = createContext()

export function DashboardProvider({ children }) {
  const [message, setMessage] = useState('');
  const [items, setItems] = useState(['Learn React', 'Build Dashboard', 'Optimize Performance']);
  const [count, setCount] = useState(60);
  const [time, setTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (count > 0) {
      const countdown = setInterval(() => {
        setCount(c => c - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [count]);

  const addItem = () => {
    if (message.trim()) {
      setItems(prev => [...prev, message.trim()]);
      setMessage('');
    }
  };

  const value = useMemo(() => {
    return {
      setMessage,
      addItem,
      items,
      count,
      time
    }
  }, [setMessage, addItem, items, count, time])

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}

export default DashboardProvider