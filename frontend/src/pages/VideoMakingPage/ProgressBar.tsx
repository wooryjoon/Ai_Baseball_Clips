import React, { useEffect, useState } from 'react';
import { eventSource } from '@/api/sse';
import { connect } from 'react-redux';

// interface ProgressData {
//     status: number;
//     // target: number;
//     // totalUpload: number;
//     // errorCount: number;
// }

export default function Loading() {
    const [progressData, setProgressData] = useState<number>(0);

    useEffect(() => {
        const es = eventSource;

        const progressListner = (event: MessageEvent) => {
            const result = Number(event.data);
            setProgressData(result);
            console.log(progressData);
        };

        es.addEventListener('Progress', progressListner);

        es.onerror = function (error) {
            alert('EventSource failed');
            console.log(error);
            if (eventSource.readyState == EventSource.CLOSED) {
                console.log('Connection was closed. Reconnecting...');
                // Reconnect after a delay
                setTimeout(connect, 1000);
            }
        };
        return () => {
            es.removeEventListener('Progress', progressListner);
        };
    }, []);

    return (
        <div>
            {progressData && (
                <div>
                    <div className="progressbar" style={{ display: 'block' }}>
                        <div className="progress-move" style={{ width: `${progressData}%` }}></div>
                    </div>
                    <div className="progress-status">
                        <span>{progressData}%</span>
                        {/* <span>
                            {progressData.target}/{progressData.totalUpload}
                        </span> */}
                    </div>
                    {/* <span className="errorCount">{progressData.errorCount}</span> */}
                </div>
            )}
        </div>
    );
}
