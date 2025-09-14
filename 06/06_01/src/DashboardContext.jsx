import { createContext, useContext, useState, useCallback, useEffect, useMemo } from "react";

export const DashboardContext = createContext();

export function DashboardProvider({ children }) {
    const [message, setMessage] = useState('');
    const [items, setItems] = useState(['Learn React', 'Build Dashboard', 'Optimize Performance']);

    const addItem = useCallback(() => {
        if (message.trim()) {
            setItems(prev => [...prev, message.trim()]);
            setMessage('');
        }
    }, [message, setItems, setMessage]);

    const value = useMemo(() => {
        return { items, addItem, message, setMessage }
    }, [items, addItem, message, setMessage])
    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardProvider;

