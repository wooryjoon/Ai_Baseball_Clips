const openModal = (ref: React.RefObject<HTMLDialogElement>) => {
    if (ref.current) {
        ref.current.showModal();
    }
};

export default openModal;
