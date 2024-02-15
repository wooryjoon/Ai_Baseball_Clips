import { useEffect, useState } from 'react';
import { SSEurl } from '@/api/sse';
import { useDispatch } from 'react-redux';
import './ProgressBar.scss';
import { setRequestId } from '@/store/slice/requestIdSlice';
import { AppDispatch } from '@/store/store';
import Lottie from 'lottie-react';
import AI from '@/assets/Lottie/AI.json';
import { useNavigate } from 'react-router-dom';

export default function Loading() {
    const [progressData, setProgressData] = useState<number>();
    const [progressText, setProgressText] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const updateProgressText = (result: number) => {
        if (result < 11) {
            setProgressText('AI가 영상을 받고 있어요');
        } else if (result < 89) {
            setProgressText('AI가 영상을 분석하고 있어요');
        } else if (result < 99) {
            setProgressText('AI가 하이라이트를 생성중이에요');
        } else {
            setProgressText('AI가 하이라이트를 완성했어요!');
        }
    };

    useEffect(() => {
        const eventSource = new EventSource(SSEurl);

        // progressData 가져오기 위해 선언한 함수
        // 아래의 eventListener에서 호출됨
        const progressListener = (event: MessageEvent) => {
            const result = Number(event.data);
            setProgressData(result);
            updateProgressText(result);
            console.log(result);
        };

        // "message" 라는 이벤트의 응답을 받는 메서드
        // progressData 를 받기 위해 사용
        eventSource.addEventListener('message', progressListener);

        // requestId 받아오기 위한 함수
        // 아래의 eventListener 에서 호출됨
        const requestIdListener = (event: MessageEvent) => {
            const requestId = Number(event.data);
            console.log('requestId: ' + requestId);
            dispatch(setRequestId(17));
            navigate('/result');
        };

        // "getRequestId" 라는 이벤트의 응답을 받는 메서드
        // requestId 를 받아 리덕스에 저장하기 위해 사용
        eventSource.addEventListener('getRequestId', requestIdListener);

        // 에러처리
        eventSource.onerror = function (error) {
            alert('하이라이트 제작 중 에러가 발생했습니다.');
            console.log(error);
            if (this.readyState == EventSource.CONNECTING) {
                console.log('Connection is interrupted, connecting ...');
            } else {
                console.log('Error, state: ' + this.readyState);
            }
        };

        // progressData 받아오는 리스너 함수를 제거(갱신)
        return () => {
            eventSource.removeEventListener('message', progressListener);
            eventSource.close();
        };
    }, []);

    return (
        <div className="progress-component">
            <div className="animation-box">
                <Lottie animationData={AI} />
            </div>
            <p className="progress-data">{progressData}%</p>
            <div className="progressbar" style={{ display: 'block' }}>
                <div className="progressbar-move" style={{ width: `${progressData}%` }}></div>
            </div>
            <p>{progressText}</p>
        </div>
    );
}
