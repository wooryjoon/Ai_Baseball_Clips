import Header from '@/components/Header';
import { useState, useEffect } from 'react';
// import { eventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

export default function LoadingAI() {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const url = baseURL + '/S3/subscribe';
    // console.log(baseURL + '/S3/subscribe');

    useEffect(() => {
        const jwtToken = sessionStorage.getItem('accessToken');

        // const eventSourceInitDict = {
        //     headers: {
        //         Authorization: `Bearer ${jwtToken}`,
        //     },
        // };

        // {
        //     headers: {
        //         Authorization: `Bearer ${jwtToken}`,
        //         Accept: 'text/event-stream',
        //     },
        // }

        const eventSource = new EventSource(url);

        eventSource.onopen = (event: Event) => {
            console.log('Event 창구가 열렸습니다.');
        };

        eventSource.onmessage = (event: MessageEvent) => {
            const message = event.data;
            console.log(message);
        };

        eventSource.onerror = function (error) {
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
