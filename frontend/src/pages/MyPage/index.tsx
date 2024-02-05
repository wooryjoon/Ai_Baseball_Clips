import Header from '@/components/Header';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MyPage.scss';
export default function MyPage() {
    const dummy = Array.from(Array(10).keys());
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
            </div>
            {/* BookmarkList */}
            <div className="bookmarkList">
                <div className="bookmark-title">내가 찜한 영상</div>
                <ul>
                    {dummy.map((i) => (
                        <li>{i}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}
