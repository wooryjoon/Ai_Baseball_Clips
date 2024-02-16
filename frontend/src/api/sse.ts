// SSE 와 통신하기 위해 EventSource 인스턴스 사용
// 해당 url 에서 SSE 를 연결 / 데이터를 받아올 것임. -> url === API 주소
// 세션, 쿠키를 실어 보내려고 할 때 withCredential 사용 (선택사항)
export const SSEurl = import.meta.env.VITE_API_BASE_URL + `/S3/subscribe`;

export const uploadResponse = (navigate: any) => {
    const eventSource = new EventSource(SSEurl);
    return eventSource.addEventListener('uploadResponse', (event: MessageEvent) => {
        navigate('/loadingAI');
    });
};
