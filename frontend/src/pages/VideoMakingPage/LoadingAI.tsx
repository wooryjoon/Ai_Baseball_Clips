import Header from '@/components/Header';
import { useState, useEffect } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { eventSource } from '@/api/sse';

export default function LoadingAI() {
    useEffect(() => {
        // const EventSource = EventSourcePolyfill || NativeEventSource;
        // const jwtToken = sessionStorage.getItem('accessToken');

        // const SSE = new EventSource(url, {
        //     headers: {
        //         Authorization: `Bearer ${jwtToken}`,
        //         Accept: 'text/event-stream',
        //     },
        // });

        // eventSource.addEventListener('connect', (event) => {
        //     const { data: message } = event;
        //     console.log('connect event data: ', message);
        // });

        eventSource.onmessage = (message: MessageEvent) => {
            const data = message.data;
            console.log(data);
        };

        eventSource.onerror = function (error) {
            alert('EventSource failed');
            console.log(error);
        };

        // 컴포넌트가 언마운트될 때 EventSource 연결을 닫습니다.
        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
            <Header />
            <div></div>
        </div>
    );
}
