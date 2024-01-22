// useRef Dialog를 인수로 받아 DOM에서 직접 조작하는 함수

/**
 * @file Dialog 태그를 감싼 Ref 객체를 인수로 받아서, close, open을 반복하는 함수
 *
 * @param ref HTML의 dialog 태그를 감싼 Ref 객체
 *
 * @return void
 *
 * @author 박희준
 */
const openDialog = (ref: React.RefObject<HTMLDialogElement>) => {
    if (ref.current) {
        if (ref.current.open) ref.current.close();
        else ref.current.show();
    }
};

export default openDialog;
