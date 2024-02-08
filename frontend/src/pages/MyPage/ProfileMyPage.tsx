import Button from '@/components/Button';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {};

export default function ProfileMyPage({}: Props) {
    return (
        <div className="myProfile">
            <div className="profile-img-container">
                <FontAwesomeIcon className="user" icon={faUser} />
            </div>
            <div className="profile-info-container">
                <span className="profile-name">힘숨찬</span>
                <div className="profile-email">cypher123@naver.com</div>
            </div>
            <Button styleType="modify">정보 수정</Button>
        </div>
    );
}
