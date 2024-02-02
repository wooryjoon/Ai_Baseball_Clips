type Props = {
    dialogRef: React.RefObject<HTMLDialogElement>;
};
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Header.scss';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import openDialog from '@/utils/openDialog';

export default function ProfileDialog({ dialogRef }: Props) {
    return (
        <dialog className="profile-dialog" ref={dialogRef}>
            <div className="dialog-topbar">
                <p>내 정보</p>
                <FontAwesomeIcon
                    icon={faXmark}
                    className="profile-xmark"
                    onClick={() => {
                        openDialog(dialogRef);
                    }}
                />
            </div>
            <div className="user-profile-container">
                <img src="" alt="" />
                <p className="name-container">민돌멩</p>
            </div>
            <div className="user-option-container">
                <button>정보수정</button>
                <button>로그아웃</button>
                <button>회원탈퇴</button>
            </div>
        </dialog>
    );
}
