import { useContext } from 'react';
import { TimersContext } from '../store/timers-context';

export const useTimer = () => {
    const ctx = useContext(TimersContext);

    if (!ctx) {
        throw new Error('using useTimer hook outside of provider scope');
    }

    const { timers, isRunning, addTimer, startTimers, stopTimers } = ctx;
    return { timers, isRunning, addTimer, startTimers, stopTimers };
};
