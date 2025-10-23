import Container from './UI/Container.tsx';
import type { Timer as TimerProps } from '../context/TimersContext.tsx';
import { useEffect, useState } from 'react';
import { useTimers } from '../hooks/useTimer.tsx';

export default function Timer({ name, duration }: TimerProps) {
    const durationInMilliseconds = duration * 1000;
    const [remainingTime, setRemainingTime] = useState(durationInMilliseconds);

    const { isRunning } = useTimers();

    useEffect(() => {
        let timer: number;
        if (isRunning) {
            timer = setInterval(() => {
                setRemainingTime((prevState) => {
                    if (prevState <= 50) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevState - 50;
                });
            }, 50);
        }

        return () => clearInterval(timer);
    }, [isRunning]);

    const displayRemainingTime = (remainingTime / 1000).toFixed(2);

    return (
        <Container as='article'>
            <h2>{name}</h2>
            <p>
                <progress max={durationInMilliseconds} value={remainingTime} />
            </p>
            <p>{displayRemainingTime}</p>
        </Container>
    );
}
