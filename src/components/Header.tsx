import Button from './UI/Button.tsx';
import { useTimer } from '../hooks/useTimer.tsx';

export default function Header() {
    const { isRunning } = useTimer();

    return (
        <header>
            <h1>ReactTimer</h1>
            <Button>{isRunning ? 'Stop' : 'Start'} Timers</Button>
        </header>
    );
}
