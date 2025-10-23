import { useContext } from 'react';
import { TimersContext } from '../context/TimersContext';

export const useTimers = () => {
    const ctx = useContext(TimersContext);

    if (!ctx) {
        throw new Error('using useTimer hook outside of provider scope');
    }

    return ctx;
};
