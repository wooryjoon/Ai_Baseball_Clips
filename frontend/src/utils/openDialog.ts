// useRef Dialog를 인수로 받아 DOM에서 직접 조작하는 함수
const useOnClickDialog = (ref: React.RefObject<HTMLDialogElement>) => {
    if (ref.current) {
        if (ref.current.open) ref.current.close();
        else ref.current.show();
    }
};

export default useOnClickDialog;
