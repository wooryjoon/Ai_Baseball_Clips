import Header from '@/components/Header';
import { useEffect } from 'react';
import { eventSource } from '@/api/sse';

export default function LoadingAI() {
    useEffect(() => {
        const connect = () => {
            const es = eventSource;

            es.onmessage = (message: MessageEvent) => {
                const data = message.data;
                console.log(data);
            };

            es.onerror = function (error) {
                alert('EventSource failed');
                console.log(error);
                if (eventSource.readyState == EventSource.CLOSED) {
                    console.log('Connection was closed. Reconnecting...');
                    // Reconnect after a delay
                    setTimeout(connect, 1000);
                }
            };
        };
        return connect();
    }, []);

    return (
        <div>
            <Header />
            <div></div>
        </div>
    );
}
