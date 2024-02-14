import { useEffect, useState } from 'react';
import { SSEurl } from '@/api/sse';
import { connect, useDispatch } from 'react-redux';
import './ProgressBar.scss';
import { setRequestId } from '@/store/slice/requestIdSlice';
import { AppDispatch } from '@/store/store';

export default function Loading() {
    const [progressData, setProgressData] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const eventSource = new EventSource(SSEurl);

        // progressData 가져오기 위해 선언한 함수
        // 아래의 eventListener에서 호출됨
        const progressListner = (event: MessageEvent) => {
            const result = Number(event.data);
            setProgressData(result);
            console.log(progressData);
        };

        // "message" 라는 이벤트의 응답을 받는 메서드
        // progressData 를 받기 위해 사용
        eventSource.addEventListener('message', progressListner);

        // requestId 받아오기 위한 함수
        // 아래의 eventListener 에서 호출됨
        const requestIdListenr = (event: MessageEvent) => {
            const requestId = Number(event.data);
            console.log('requestId: ' + requestId);
            dispatch(setRequestId(requestId));
        };

        // "getRequestId" 라는 이벤트의 응답을 받는 메서드
        // requestId 를 받아 리덕스에 저장하기 위해 사용
        eventSource.addEventListener('getRequestId', requestIdListenr);

        // 에러처리
        eventSource.onerror = function (error) {
            alert('EventSource failed');
            console.log(error);
            if (eventSource.readyState == EventSource.CLOSED) {
                console.log('Connection was closed. Reconnecting...');
                setTimeout(connect, 1000);
            }
        };

        // progressData 받아오는 리스너 함수를 제거(갱신)
        return () => {
            eventSource.removeEventListener('message', progressListner);
        };
    }, [dispatch]);

    return (
        <div>
            <div className="progressbar" style={{ display: 'block' }}>
                <div className="progress-move" style={{ width: `${progressData}%` }}></div>
            </div>
            <div className="progress-status">
                <span>{progressData}%</span>
            </div>
        </div>
    );
}
