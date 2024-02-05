import Header from '@/components/Header';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MyPage.scss';
import MyContent from './MyContent';
import Button from '@/components/Button';
export default function MyPage() {
    const dummy = Array.from(Array(10).keys());
    const onClickModifyHandler = () => {
        console.log(123);
    };
    return (
        <>
            <Header />
            {/* Profile Container */}
            <div className="myProfile">
                <div className="profile-img-container">
                    <FontAwesomeIcon className="user" icon={faUser} />
                </div>
                <div className="profile-info-container">
                    <span className="profile-name">힘숨찬</span>
                    <div className="profile-email">cypher123@naver.com</div>
                </div>
                <Button styleType="modify" onClick={onClickModifyHandler}>
                    정보 수정
                </Button>
            </div>
            {/* BookmarkList */}
            <div className="bookmarkList">
                <div className="bookmark-title">
                    내가 찜한 영상
                    <img src="/src/assets/ball.png" alt="" />
                </div>
                <ul>
                    {dummy.map(() => (
                        <MyContent />
                    ))}
                </ul>
            </div>
        </>
    );
}
