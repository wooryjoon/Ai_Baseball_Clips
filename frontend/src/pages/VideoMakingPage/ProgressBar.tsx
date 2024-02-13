import { useEffect, useState } from 'react';
import { eventSource } from '@/api/sse';
import { connect, useDispatch } from 'react-redux';
import './MakingVideo.scss';
import { setRequestId } from '@/store/slice/requestIdSlice';
import { AppDispatch } from '@/store/store';

export default function Loading() {
    const [progressData, setProgressData] = useState<number>(0);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const es = eventSource;

        const progressListner = (event: MessageEvent) => {
            if (!isComplete) {
                const result = Number(event.data);
                setProgressData(result);
                console.log(progressData);

                if (result === 100) {
                    setIsComplete(true);
                }
            }
            return;
        };

        es.addEventListener('Progress', progressListner);

        es.addEventListener('getRequestId', (event) => {
            if (isComplete) {
                const requestId = Number(event.data);
                console.log('requestId: ' + requestId);
                dispatch(setRequestId(requestId));
            }
        });

        es.onerror = function (error) {
            alert('EventSource failed');
            console.log(error);
            if (eventSource.readyState == EventSource.CLOSED) {
                console.log('Connection was closed. Reconnecting...');
                setTimeout(connect, 1000);
            }
        };
        return () => {
            es.removeEventListener('Progress', progressListner);
        };
    }, [isComplete, dispatch]);

    return (
        <div>
            {progressData && (
                <div>
                    <div className="progressbar" style={{ display: 'block' }}>
                        <div className="progress-move" style={{ width: `${progressData}%` }}></div>
                    </div>
                    <div className="progress-status">
                        <span>{progressData}%</span>
                    </div>
                </div>
            )}
        </div>
    );
}
