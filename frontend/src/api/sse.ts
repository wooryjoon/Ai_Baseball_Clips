// import { useState } from 'react';

// SSE 와 통신하기 위해 EventSource 인스턴스 사용
// 해당 url 에서 SSE 를 연결 / 데이터를 받아올 것임. -> url === API 주소
// 세션, 쿠키를 실어 보내려고 할 때 withCredential 사용 (선택사항)
const SSEurl = import.meta.env.VITE_API_BASE_URL + '/S3/subscribe';
export const eventSource = new EventSource(SSEurl);
// const [isSSESet, setIsSSESet] = useState<boolean>(false);

export function openSSE() {
    // 이벤트 창구가 열렸을 때 동작 정의
    return (eventSource.onopen = () =>
        // event: Event
        {
            // setIsSSESet(true);
            console.log('Event 창구가 열렸습니다.');
        });
}
