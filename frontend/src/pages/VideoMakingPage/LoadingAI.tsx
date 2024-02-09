import Header from '@/components/Header';
import { useState } from 'react';

export default function LoadingAI() {
    const [processStatus, setProcessStatus] = useState<number>(0);
    const [isSSE, setIsSSE] = useState<boolean>(false);

    const eventSource = new EventSource('url');

    eventSource.onopen = (event: Event) => {
        setIsSSE(true);
        console.log('Event 창구가 열렸습니다.');
    };

    eventSource.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        setProcessStatus(data.status);

        const userLocation = window.location.pathname.split('baseUrl/')[0];
        if (data.status === 100 && userLocation !== 'loadingAi') {
            alert('AI가 하이라이트 제작을 완료했어요!');
        }
    };

    return (
        <div>
            <Header />
            <div></div>
        </div>
    );
}
