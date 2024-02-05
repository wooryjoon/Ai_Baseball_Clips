const closeModal = (ref: React.RefObject<HTMLDialogElement>) => {
    if (ref.current) {
        ref.current.close();
    }
};

export default closeModal;
