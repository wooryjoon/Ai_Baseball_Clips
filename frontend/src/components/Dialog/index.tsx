import React, { forwardRef } from 'react';
import './Dialog.scss';
type Dialog = {
    onClick?: () => void;
    children: React.ReactNode;
};

const Dialog = forwardRef<HTMLDialogElement, Dialog>(function Dialog(
    { onClick, children }: Dialog,
    ref
) {
    return (
        <dialog ref={ref}>
            <form method="dialog">
                <button onClick={onClick}>닫기</button>
            </form>
            {children}
        </dialog>
    );
});

export default Dialog;
