import React, { forwardRef, memo } from 'react';
import './Dialog.scss';
type Dialog = {
    onClick?: () => void;
    children: React.ReactNode;
};

const Dialog = forwardRef<HTMLDialogElement, Dialog>(function Dialog({ children }: Dialog, ref) {
    return <dialog ref={ref}>{children}</dialog>;
});

export default memo(Dialog);
