import { useState } from 'react';

// SSE 와 통신하기 위해 EventSource 인스턴스 사용
// 해당 url 에서 SSE 를 연결 / 데이터를 받아올 것임. -> url === API 주소
// 세션, 쿠키를 실어 보내려고 할 때 withCredential 사용 (선택사항)
const eventSource = new EventSource('url' /* {withCredentials: true} */);

const [isSSESet, setIsSSESet] = useState<boolean>(false);

// 이벤트 창구가 열렸을 때 동작 정의
eventSource.onopen = (event: Event) => {
    setIsSSESet(true);
    console.log('Event 창구가 열렸습니다.');
};

//SSE 데이터 처리
eventSource.onmessage = (event: MessageEvent) => {
    const data = event.data;
    console.log(data);

    const userLocation = window.location.pathname.split('baseUrl/')[0];
    if (data === '100' && userLocation != 'loadingAi') {
        alert('AI가 하이라이트 제작을 완료했어요!');
    }
};

// 에러 처리
eventSource.onerror = function (error) {
    console.log(error);
};

// SSE 닫고 싶을 때
eventSource.close();
