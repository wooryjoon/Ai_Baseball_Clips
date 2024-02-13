import Header from '@/components/Header';
import { useEffect } from 'react';
import { eventSource } from '@/api/sse';
import ProgressBar from './ProgressBar';

export default function LoadingAI() {
    return (
        <div>
            <Header />
            <div>
                <ProgressBar />
            </div>
        </div>
    );
}
