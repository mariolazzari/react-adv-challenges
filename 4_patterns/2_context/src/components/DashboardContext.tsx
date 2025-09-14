import {
  createContext,
  useState,
  useEffect,
  useMemo,
  type PropsWithChildren,
  useContext,
} from "react";

type DashboardContextProps = {
  setMessage: (msg: string) => void;
  addItem: () => void;
  items: string[];
  count: number;
  time: string;
  message: string;
};

export const DashboardContext = createContext<DashboardContextProps>({
  setMessage: () => {},
  addItem: () => {},
  items: [],
  count: 0,
  time: "",
  message: "",
});

export function DashboardProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([
    "Learn React",
    "Build Dashboard",
    "Optimize Performance",
  ]);
  const [count, setCount] = useState(60);
  const [time, setTime] = useState("");

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
      setMessage("");
    }
  };

  const value = useMemo(() => {
    return {
      setMessage,
      addItem,
      items,
      count,
      time,
      message,
    };
  }, [setMessage, addItem, items, count, time]);

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("Component must be wrapped into DashboardProvider");
  }

  return ctx;
};

export default DashboardProvider;
