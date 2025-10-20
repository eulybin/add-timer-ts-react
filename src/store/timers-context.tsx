/* eslint-disable react-refresh/only-export-components */
import { type ReactNode, createContext, useReducer } from 'react';

export type Timer = {
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

type AddTimerAction = {
    type: 'ADD_TIMER';
    payload: Timer;
};

type StartTimersAction = {
    type: 'START_TIMERS';
};

type StopTimersAction = {
    type: 'STOP_TIMERS';
};

type Action = AddTimerAction | StartTimersAction | StopTimersAction;

const initialState: TimersState = {
    isRunning: false,
    timers: [],
};

const reducer = (state: TimersState, action: Action): TimersState => {
    switch (action.type) {
        case 'ADD_TIMER':
            return {
                ...state,
                timers: [...state.timers, action.payload],
            };
        case 'START_TIMERS':
            return {
                ...state,
                isRunning: true,
            };
        case 'STOP_TIMERS':
            return {
                ...state,
                isRunning: false,
            };
        default:
            return state;
    }
};

export const TimersContext = createContext<TimersContextValue | null>(null);

type TimersProviderProps = {
    children: ReactNode;
};

export const TimersProvider = ({ children }: TimersProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addTimer = (timerData: Timer) => {
        dispatch({ type: 'ADD_TIMER', payload: timerData });
    };

    const startTimers = () => dispatch({ type: 'START_TIMERS' });
    const stopTimers = () => dispatch({ type: 'STOP_TIMERS' });

    const value: TimersContextValue = {
        ...state,
        addTimer,
        startTimers,
        stopTimers,
    };

    return <TimersContext.Provider value={value}>{children}</TimersContext.Provider>;
};
