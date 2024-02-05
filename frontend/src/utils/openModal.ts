const openModal = (ref: React.RefObject<HTMLDialogElement>) => {
    if (ref.current) {
        console.log(123);

        ref.current.showModal();
    }
};

export default openModal;
