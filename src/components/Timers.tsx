import { useTimers } from '../hooks/useTimer';
import Timer from './Timer';

export default function Timers() {
    const { timers } = useTimers();

    return (
        <ul>
            {timers.map((timer) => {
                return (
                    <li key={timer.name}>
                        <Timer {...timer} />
                    </li>
                );
            })}
        </ul>
    );
}
