import Header from '@/components/Header';
import { useState, useEffect } from 'react';
import { eventSource } from '@/api/sse';

export default function LoadingAI() {
    useEffect(() => {
        // function connectEventSource() {
        //     const es = eventSource;

        //     es.onmessage = (message: MessageEvent) => {
        //         const data = message.data;
        //         console.log(data);
        //     };

        //     es.onerror = function (error) {
        //         alert('EventSource failed');
        //         console.log(error);
        //     };

        //     return es;
        // }

        const es = eventSource;

        es.onmessage = (message: MessageEvent) => {
            const data = message.data;
            console.log(data);
        };

        es.onerror = function (error) {
            alert('EventSource failed');
            console.log(error);
        };

        // const es = connectEventSource();

        // 컴포넌트가 언마운트될 때 EventSource 연결을 닫습니다.
        // return () => {
        //     es.close();
        // };
    }, []);

    return (
        <div>
            <Header />
            <div></div>
        </div>
    );
}
