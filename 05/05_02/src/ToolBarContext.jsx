import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";

export const ToolBarContext = createContext();

function ToolBarProvider({ children }) {
    const [count, setCount] = useState(60);
    const [time, setTime] = useState('');


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
        return { count, time }
    }, [count, time])
    return (
        <ToolBarContext.Provider value={value}>
            {children}
        </ToolBarContext.Provider >

    );
}
export const useToolBarContext = () => useContext(ToolBarContext);
export default ToolBarProvider

