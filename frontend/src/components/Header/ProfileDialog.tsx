type Props = {
    dialogRef: React.RefObject<HTMLDialogElement>;
};
import '../Header/Header.scss';

export default function ProfileDialog({ dialogRef }: Props) {
    return (
        <dialog ref={dialogRef}>
            <div className="dialog-topbar">
                <p>내 정보</p>
            </div>
        </dialog>
    );
}
