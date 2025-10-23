/* eslint-disable react-refresh/only-export-components */
import { type ReactNode, createContext, useReducer } from 'react';

const ActionTypes = {
    ADD_TIMER: 'ADD_TIMER',
    START_TIMERS: 'START_TIMERS',
    STOP_TIMERS: 'STOP_TIMERS',
} as const;

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

type Action =
    | { type: typeof ActionTypes.ADD_TIMER; payload: Timer }
    | { type: typeof ActionTypes.START_TIMERS }
    | { type: typeof ActionTypes.STOP_TIMERS };

const initialState: TimersState = {
    isRunning: true,
    timers: [],
};

const reducer = (state: TimersState, action: Action): TimersState => {
    switch (action.type) {
        case ActionTypes.ADD_TIMER:
            return {
                ...state,
                timers: [...state.timers, action.payload],
            };
        case ActionTypes.START_TIMERS:
            return {
                ...state,
                isRunning: true,
            };
        case ActionTypes.STOP_TIMERS:
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
        dispatch({ type: ActionTypes.ADD_TIMER, payload: timerData });
    };

    const startTimers = () => dispatch({ type: ActionTypes.START_TIMERS });
    const stopTimers = () => dispatch({ type: ActionTypes.STOP_TIMERS });

    const value: TimersContextValue = {
        ...state,
        addTimer,
        startTimers,
        stopTimers,
    };

    return <TimersContext.Provider value={value}>{children}</TimersContext.Provider>;
};
