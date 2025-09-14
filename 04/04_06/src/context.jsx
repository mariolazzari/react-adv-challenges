import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";

export const DashboardContext = createContext();
export const ToolBarContext = createContext();

export function DashboardProvider({ children }) {
    const [message, setMessage] = useState('');
    const [items, setItems] = useState(['Learn React', 'Build Dashboard', 'Optimize Performance']);
    const [count, setCount] = useState(60);
    const [time, setTime] = useState('');

    const addItem = useCallback(() => {
        if (message.trim()) {
            setItems(prev => [...prev, message.trim()]);
            setMessage('');
        }
    }, [message, setItems, setMessage]);

    const startTimer = useCallback(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, [setTime])

    const startCountDown = useCallback(() => {
        if (count > 0) {
            const countdown = setInterval(() => {
                setCount(c => c - 1);
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [setCount, count])

    useEffect(() => {
        startTimer()
    }, []);

    useEffect(() => {
        startCountDown()
    }, []);


    const value = useMemo(() => {
        return { items, addItem, message, setMessage }
    }, [items, addItem, message, setMessage])
    return (
        <ToolBarContext.Provider value={{ count, time }}>
            <DashboardContext.Provider value={value}>
                {children}
            </DashboardContext.Provider>
        </ToolBarContext.Provider >

    );
}
export const useDashboardContext = () => useContext(DashboardContext)
export const useToolbarContext = () => useContext(ToolBarContext)
export default DashboardProvider;

