/* eslint-disable react-refresh/only-export-components */
import { type ReactNode, createContext, useState } from 'react';

type Timer = {
    name: string;
    duration: number;
};

type TimersState = {
    isRunning: boolean;
    timers: Timer[];
};

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void;
    startTimers: () => void;
    stopTimers: () => void;
};

export const TimersContext = createContext<TimersContextValue | null>(null);

type TimersProviderProps = {
    children: ReactNode;
};

export const TimersProvider = ({ children }: TimersProviderProps) => {
    const [timers, setTimers] = useState<Timer[]>([]);
    const [isRunning, setIsRunning] = useState(false);

    const addTimer = (timerData: Timer) => {
        setTimers((prevState) => [...prevState, timerData]);
    };

    const startTimers = () => setIsRunning(true);
    const stopTimers = () => setIsRunning(false);

    const value: TimersContextValue = {
        timers,
        isRunning,
        addTimer,
        startTimers,
        stopTimers,
    };

    return <TimersContext.Provider value={value}>{children}</TimersContext.Provider>;
};
